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
    inputFolder: "sites/webstorm-guide/authors/",
  };
  const authorPage = {
    fileSlug: "pwe",
    url: "/authors/pwe",
    inputPath: "./sites/authors/pwe/index.md",
    thumbnail: "pwe.png",
  };
  const result = getAuthor(authorData, authorPage);
  expect(result.label).to.equal("pwe");
  expect(result.thumbnail).to.equal("sites/webstorm-guide/authors/pwe.jpg");
});
