import { expect, test } from "vitest";
import { getTip, Tip, TipData, TipFrontmatter } from "./TipModels";
import { EleventyPage } from "../../../src/models";
import { rootPath } from "../../config";

const tipFrontmatter: TipFrontmatter = {
  title: "Some Tip",
  date: new Date("2023-02-02"),
  resourceType: "tip",
  author: "sa",
  products: ["sp", "ap"],
  technologies: ["st", "at"],
  topics: ["st", "at"],
  thumbnail: "thumbnail.png",
};
const data: TipData = {
  ...tipFrontmatter,
  content: "<p>Some content</p>",
};
const page: EleventyPage = {
  fileSlug: "some-tip",
  url: "/tips/some-tip/",
  inputPath: `${rootPath}/tips/some-tip/index.md`,
};

test("construct a tip", async () => {
  const tip = new Tip({ data, page });
  expect(tip.title).to.equal("Some Tip");
});

test("construct a tip from the factory", async () => {
  const tip = await getTip(data, page);
  expect(tip.title).to.equal("Some Tip");
});
