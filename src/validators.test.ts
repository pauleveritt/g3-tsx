import { expect, test } from "vitest";
import path from "path";
import {
  makeCollectionTree,
  readMarkdown,
  readMarkdownTree,
  sitesDir,
  validateResource,
} from "./validators";
import { getTip, TipResource } from "../_includes/resources/tip/TipModels";

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
    slug: "some-slug",
    date: new Date(),
    resourceType: "some-resourcetype",
  };
  const validation = () => validateResource(TipResource, frontmatter);
  expect(validation).not.toThrow();
});

test("validates bad frontmatter", () => {
  const frontmatter = { age: 49 };
  const validation = () => validateResource(TipResource, frontmatter);
  expect(validation).toThrow("Expected required");
});

test("reads a directory of markdown resources", () => {
  const contentItems = readMarkdownTree("tips", getTip);
  // @ts-ignore
  const firstTip = contentItems["access-run-configurations"];
  expect(firstTip.title).to.equal("Access Run Configurations Quickly");
});
test("initializes a resource tree", () => {
  const collections = {};
  makeCollectionTree(collections);
  // @ts-ignore
  const tips = collections.tip;
  const firstTip: TipResource = tips["access-run-configurations"];
  expect(firstTip.title).to.equal("Access Run Configurations Quickly");
});
