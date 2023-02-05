import { expect, test } from "vitest";
import { getResource, Resource } from "./ResourceModels";
import { validateResource } from "../../src/validators";
import fixtures from "../fixtures";
import { getTip } from "./tip/TipModels";

test("construct a resource", async () => {
  const { data, page } = fixtures.collections.tip[0];
  const tip = await getTip(data, page);
  expect(tip.title).to.equal("Some Tip");
  const result = getResource(data, page, "resource");
  expect(result.title).to.equal(data.title);
  expect(result.resourceType).to.equal("resource");
  const validation = () => validateResource(Resource, result, "my-tip");
  expect(validation).not.to.throw();
});

// TODO Sunday
// test("gets all resources", async () => {
//   const allTips = fixtures.collections.allResources;
//   const allResources = await getAllResources(allTips);
//   const key = allResources[0].page.url;
//   expect(allResources[key].title).to.equal("Some Tip");
// });
