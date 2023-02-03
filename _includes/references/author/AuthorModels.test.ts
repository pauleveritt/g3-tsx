import { expect, test } from "vitest";
import { getAuthor, getAuthorReferences } from "./AuthorModels";
import fixtures from "../../fixtures";
import { rootPath } from "../../config";

test("construct an author", async () => {
  const { data, page } = fixtures.collections.author[0];
  const author = await getAuthor(data, page);
  expect(author.label).to.equal("sa");
  expect(author.thumbnail).to.equal(`${rootPath}/authors/sa/sa.png`);
});

test("gets author references", async () => {
  const allAuthors = fixtures.collections.author;
  const authorReferences = await getAuthorReferences(allAuthors);
  expect(authorReferences["sa"].title).to.equal("Some Author");
});
