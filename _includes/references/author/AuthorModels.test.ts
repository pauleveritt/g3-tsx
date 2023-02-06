import { expect, test } from "vitest";
import { getAuthor } from "./AuthorModels";
import fixtures from "../../fixtures";
import { rootPath } from "../../config";

test("construct an author", async () => {
  const { data, page } = fixtures.authorItems[0];
  const author = await getAuthor(data, page);
  expect(author.label).to.equal("sa");
  expect(author.thumbnail).to.equal(`${rootPath}/authors/sa/sa.png`);
});
