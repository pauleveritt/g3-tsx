import { beforeAll } from "vitest";
import { readMarkdown } from "./src/validators";

function getTestResource() {
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/tips/amend-commit/index.md"
  );

  return {
    ...frontmatter,
    url: "/tips/amend-commit/",
    fileSlug: "amend-commit",
    content: body,
  };
}

beforeAll(() => {
  globalThis.tipData = getTestResource();
});
