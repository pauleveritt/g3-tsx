import { expect, test } from "vitest";
import { getResourceFrontmatter, ResourceFrontmatter } from "./ResourceModels";
import { validateFrontmatter } from "./validators";
import fixtures from "../_includes/fixtures";
import { getTip } from "../_includes/resources/tip/TipModels";

test("construct a resource", async () => {
  const { data, page } = fixtures.tipItems[0];
  const tip = await getTip(data, page);
  expect(tip.title).to.equal("Some Tip");
  const result = getResourceFrontmatter(data, page, "resource");
  expect(result.title).to.equal(data.title);
  expect(result.resourceType).to.equal("resource");
  const validation = () =>
    validateFrontmatter(ResourceFrontmatter, result, "my-tip");
  expect(validation).not.to.throw();
});
