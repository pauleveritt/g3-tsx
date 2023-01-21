import { expect, test } from "vitest";
import { getResource, Resource } from "./ResourceModels";
import { readMarkdown, validateResource } from "../../src/validators";
import { EleventyPage } from "../models";

test("Construct a valid resource", () => {
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/tips/amend-commit/index.md"
  );
  const tipData = {
    ...frontmatter,
    url: "/tips/amend-commit/",
    fileSlug: "amend-commit",
    content: body,
    collections: {},
  };
  const resourceData: Resource = { ...tipData };
  const resourcePage: EleventyPage = { fileSlug: "some-slug" };
  const result = getResource(resourceData, resourcePage, "resource");
  expect(result.title).to.equal(resourceData.title);
  expect(result.resourceType).to.equal("resource");
  const validation = () => validateResource(Resource, result);
  expect(validation).not.to.throw();
});
