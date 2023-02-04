/* */
import { Document, Window } from "happy-dom";
import { getByRole, getByText } from "@testing-library/dom";

export function makeDocument(content: string): Document {
  /* Set up the global document using the full doc in build results */
  const newWindow = new Window({
    settings: {
      disableJavaScriptFileLoading: true,
      disableJavaScriptEvaluation: true,
      disableCSSFileLoading: true,
      enableFileSystemHttpRequests: true,
    },
  });
  const domParser = new newWindow.DOMParser();
  return domParser.parseFromString(content, "text/html");
}

export class ByText {
  value: string;
  role?: string;

  constructor({ value, role }: { value: string; role?: string }) {
    this.role = role;
    this.value = value;
  }

  assert(document: Document): boolean {
    // @ts-ignore
    const container = document.body as HTMLElement;
    if (this.role) {
      try {
        getByRole(container, this.role, { name: this.value });
        return true;
      } catch (err) {
        return false;
      }
    } else {
      try {
        getByText(container, this.value);
        return true;
      } catch (e) {
        return false;
      }
    }
  }
}

export type Assertion = ByText;
export type Assertions = Assertion[];

export type Result = {
  url: string;
  content: string;
};

export class TestCases {
  testCases: Map<string, Assertions>;

  constructor() {
    this.testCases = new Map();
  }

  add(url: string, assertions: Assertions) {
    this.testCases.set(url, assertions);
  }

  validate(results: Result[]): string[] {
    const messages: string[] = [];
    for (const result of results) {
      const { url, content } = result;
      const newDocument = makeDocument(content);
      const assertions = this.testCases.get(url);
      if (assertions) {
        for (const assertion of assertions) {
          if (!assertion.assert(newDocument)) {
            messages.push(
              `Page "${url}" failed assertion "${assertion.value}"`
            );
          }
        }
      }
    }
    return messages;
  }
}
