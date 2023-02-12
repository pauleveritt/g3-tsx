import { expect, test } from "vitest";
import { EleventyPage } from "../../../src/models";
import { rootPath } from "../../config";
import {
  getTechnology,
  Technology,
  TechnologyData,
  TechnologyFrontmatter,
} from "./TechnologyModels";

const technologyFrontmatter: TechnologyFrontmatter = {
  date: new Date("2023-02-02"),
  label: "sa",
  logo: "some-logo.png",
  resourceType: "technology",
  title: "Some Technology",
};
const data: TechnologyData = {
  ...technologyFrontmatter,
  content: "<p>Some content</p>",
};
const page: EleventyPage = {
  fileSlug: "sa",
  url: "/technologies/st/",
  inputPath: `${rootPath}/technologies/st/index.md`,
};

test("construct a technology", async () => {
  const technology = new Technology({ data, page });
  expect(technology.title).to.equal("Some Technology");
});

test("construct a technology from factory", async () => {
  const technology = await getTechnology(data, page);
  expect(technology.title).to.equal("Some Technology");
});
