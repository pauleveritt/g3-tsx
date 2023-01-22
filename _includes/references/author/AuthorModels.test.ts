import { expect, test } from "vitest";
import { getAuthor } from "./AuthorModels";
import { readMarkdown } from "../../../src/validators";

test("Construct a valid author", () => {
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/authors/pwe/index.md"
  );

  const authorData = {
    ...frontmatter,
    content: body,
    resourceType: "author",
  };
  const authorPage = {
    fileSlug: "pwe",
    url: "/authors/pwe",
  };
  const result = getAuthor(authorData, authorPage);
  expect(result.label).to.equal("pwe");
});
