import { expect, test } from "vitest";
import path from "path";
import {
  getAuthorReferences,
  readMarkdown,
  sitesDir,
  validateResource,
} from "./validators";
import { TipResource } from "../_includes/resources/tip/TipModels";
import fixtures from "../_includes/fixtures";

test("defines the sitesDir", () => {
  expect(path.basename(sitesDir)).to.equal("sites");
});

test("reads the Markdown", () => {
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/tips/amend-commit/index.md"
  );
  expect(frontmatter.title).to.equal("Fix Your Work with Amend Commit");
  expect(body.startsWith("<p>You")).to.be.true;
});

test("validates good frontmatter", () => {
  const frontmatter = {
    title: "A Good Tip",
    body: "Some *content*",
    id: "some-id",
    author: "some-author",
    slug: "some-slug",
    url: "/tips/some-slug",
    date: new Date(),
    resourceType: "some-resourcetype",
    thumbnail: "thumbnail.png",
    inputFolder: "sites/webstorm-guide/tips/some-slug/",
  };
  const validation = () =>
    validateResource(TipResource, frontmatter, "tip1.md");
  expect(validation).not.toThrow();
});

test("validates bad frontmatter", () => {
  const frontmatter = { age: 49 };
  const validation = () =>
    validateResource(TipResource, frontmatter, "tip1.md");
  expect(validation).toThrow("Expected required");
  expect(validation).toThrow("tip1.md");
});

test("gets author references", async () => {
  const allAuthors = fixtures.collections.all.filter(
    (item) => item.data.resourceType === "author"
  );
  const authorReferences = await getAuthorReferences(allAuthors);
  expect(authorReferences["sa"].title).to.equal("Some Author");
});
