import { expect, test } from "vitest";
import { getAuthor } from "./AuthorModels";
import { readMarkdown } from "../../../src/validators";
import fixtures from "../../fixtures";

const rootPath = "sites/webstorm-guide";
test("Construct a valid author", async () => {
  // TODO Remove readMarkdown and all tests that use it
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/authors/pwe/index.md"
  );

  const authorData = {
    ...frontmatter,
    content: body,
    resourceType: "author",
    inputPath: `${rootPath}/authors/pwe/`,
  };
  const authorPage = {
    fileSlug: "pwe",
    url: "/authors/pwe",
    inputPath: `${rootPath}/authors/pwe/index.md`,
    thumbnail: "pwe.png",
  };
  const result = await getAuthor(authorData, authorPage);
  expect(result.label).to.equal("pwe");
  expect(result.thumbnail).to.equal(`${rootPath}/authors/pwe/pwe.jpg`);
});

test("construct an author", async () => {
  const allAuthors = fixtures.collections.all.filter(
    (item) => item.data.resourceType === "author"
  );
  const { data, page } = allAuthors[0];
  const author = await getAuthor(data, page);
  expect(author).to.exist;
});
