import { beforeAll } from "vitest";
import { readMarkdown } from "./src/validators";

beforeAll(() => {
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/tips/amend-commit/index.md"
  );

  globalThis.tipData = {
    ...frontmatter,
    url: "some-url",
    fileSlug: "some-file",
    content: body,
  };
});
