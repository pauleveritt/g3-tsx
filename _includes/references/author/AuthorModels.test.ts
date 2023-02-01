import { expect, test } from "vitest";
import { getAuthor } from "./AuthorModels";
import { readMarkdown } from "../../../src/validators";
import fixtures from "../../fixtures";

test("Construct a valid author", async () => {
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
  const result = await getAuthor(authorData, authorPage);
  expect(result.label).to.equal("pwe");
});

test("construct an author", async () => {
  const { all } = fixtures.collections;
  const { data, page } = all[0];
  const author = await getAuthor(data, page);
  expect(author).to.exist;
});
