import { expect, test } from "vitest";
import { getResource, Resource } from "./ResourceModels";
import { validateResource } from "./validators";
import fixtures from "../_includes/fixtures";
import { getTip } from "../_includes/resources/tip/TipModels";

test("construct a resource", async () => {
  const { data, page } = fixtures.tipItems[0];
  const tip = await getTip(data, page);
  expect(tip.title).to.equal("Some Tip");
  const result = getResource(data, page, "resource");
  expect(result.title).to.equal(data.title);
  expect(result.resourceType).to.equal("resource");
  const validation = () => validateResource(Resource, result, "my-tip");
  expect(validation).not.to.throw();
});
