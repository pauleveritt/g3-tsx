import { expect, test } from "vitest";
import { getTechnology } from "./TechnologyModels";
import { readMarkdown } from "../../../src/validators";

test("Construct a valid technology", () => {
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/technologies/angular/index.md"
  );

  const technologyData = {
    ...frontmatter,
    url: "/technologies/angular/",
    content: body,
    resourceType: "technology",
  };
  const technologyPage = {
    fileSlug: "angular",
    url: "/technologies/angular/",
    inputPath: "./sites/technologies/angular/index.md",
  };

  const result = getTechnology(technologyData, technologyPage);
  expect(result.label).to.equal("angular");
});
