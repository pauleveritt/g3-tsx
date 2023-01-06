import { beforeAll } from "vitest";
import { readMarkdown } from "./src/validators";

function getTip() {
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

function getAuthor() {
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/authors/pwe/index.md"
  );

  return {
    ...frontmatter,
    url: "/authors/pwe/",
    fileSlug: "pwe",
    content: body,
  };
}

beforeAll(() => {
  globalThis.tipData = getTip();
  globalThis.authorData = getAuthor();
});
