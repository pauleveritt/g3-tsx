import { expect, test } from "vitest";
import { getTip, TipData, TipFrontmatter } from "./TipModels";
import { EleventyPage } from "../../../src/models";
import { rootPath } from "../../config";

test("construct a tip", async () => {
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
  const tip = await getTip(data, page);
  expect(tip.title).to.equal("Some Tip");
});
