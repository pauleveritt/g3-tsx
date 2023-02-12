import { expect, test } from "vitest";
import {
  BaseData,
  BaseEntity,
  getBaseResource,
  Resource,
  ResourceData,
} from "./ResourceModels";
// import fixtures from "../_includes/fixtures";
import { rootPath } from "../_includes/config";
import { EleventyPage } from "./models";

const baseData: BaseData = {
  content: "<p>Some content</p>",
  resourceType: "tip",
  title: "Some Tip",
};
const data: ResourceData = {
  ...baseData,
  author: "sa",
  date: new Date("2023-02-02"),
  products: ["sp", "ap"],
  technologies: ["st", "at"],
  thumbnail: "thumbnail.png",
  topics: ["st", "at"],
};
const page: EleventyPage = {
  fileSlug: "some-tip",
  url: "/tips/some-tip/",
  inputPath: `${rootPath}/tips/some-tip/index.md`,
};

test("construct a BaseEntity", () => {
  const baseEntity = new BaseEntity({ data: baseData, page });
  expect(baseEntity).to.exist;
});
test("construct a Resource", () => {
  const resource = new Resource({ data, page });
  expect(resource).to.exist;
});
test("construct a Resource from the factory", () => {
  const resource = getBaseResource(data, page);
  expect(resource).to.exist;
});
