import { expect, test } from "vitest";
import { getResource, Resource } from "./ResourceModels";
import { validateResource } from "../../src/validators";
import { EleventyPage } from "../models";

test("Construct a valid resource", () => {
  // @ts-ignore
  const tipData = globalThis.tipData;
  const resourceData: Resource = { ...tipData, resourceType: "resource" };
  const resourcePage: EleventyPage = { fileSlug: "some-slug" };
  const result = getResource(resourceData, resourcePage);
  expect(result.title).to.equal(resourceData.title);
  expect(result.resourceType).to.equal(resourceData.resourceType);
  const validation = () => validateResource(Resource, result);
  expect(validation).not.to.throw();
});
