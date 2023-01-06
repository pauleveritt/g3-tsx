import { expect, test } from "vitest";
import { getResource, Resource } from "./ResourceModels";
import { validateResource } from "../../src/validators";

test("Construct a valid resource", () => {
  // @ts-ignore
  const tipData = globalThis.tipData;
  const resourceData: Resource = { ...tipData, resourceType: "resource" };
  const result = getResource(resourceData);
  expect(result.title).to.equal(resourceData.title);
  expect(result.resourceType).to.equal(resourceData.resourceType);
  const validation = () => validateResource(Resource, result);
  expect(validation).not.to.throw();
});
