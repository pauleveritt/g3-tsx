import { expect, test } from "vitest";
import { getTechnology } from "./models";
import { readMarkdown } from "../../../src/validators";

test("Construct a valid model", () => {
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/technologies/angular/index.md"
  );

  const technologyData = {
    ...frontmatter,
    url: "/technologies/angular/",
    fileSlug: "angular",
    content: body,
    resourceType: "technology",
  };

  const result = getTechnology(technologyData);
  expect(result.label).to.equal("angular");
});
