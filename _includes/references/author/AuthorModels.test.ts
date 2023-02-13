import { expect, test } from "vitest";
import { EleventyPage } from "../../../src/models";
import { rootPath } from "../../config";
import { Author, AuthorData, AuthorFrontmatter } from "./AuthorModels";

const authorFrontmatter: AuthorFrontmatter = {
  resourceType: "author",
  thumbnail: "thumbnail.png",
  title: "Some Author",
};
const data: AuthorData = {
  ...authorFrontmatter,
  content: "<p>Some content</p>",
};
const page: EleventyPage = {
  fileSlug: "sa",
  url: "/authors/sa/",
  inputPath: `${rootPath}/authors/sa/index.md`,
};

test("construct an author", async () => {
  const author = new Author({ data, page });
  expect(author.label).to.equal("sa");
  expect(author.title).to.equal("Some Author");
});

test("construct an author from factory", async () => {
  const author = await new Author({ data, page }).init();
  expect(author.label).to.equal("sa");
  expect(author.title).to.equal("Some Author");
});
