import { expect, test } from "vitest";
import fixtures from "./fixtures";
import { ReferenceMap } from "./models";

test("construct a valid reference map", () => {
  const rm = new ReferenceMap(fixtures.collections);
  const url = "/tips/some-tip/";
  const firstResource = fixtures.collections.allResources.get(url);
  expect(firstResource).to.exist;
  if (firstResource) {
    rm.resolveResource(firstResource);
    const resolvedResource = rm.map.get(url);
    expect(resolvedResource).to.exist;
    if (resolvedResource) {
      expect(resolvedResource.author.title).to.equal("Some Author");
      const firstProduct = [...resolvedResource.products][0];
      expect(firstProduct.title).to.equal("Some Product");
    }
  }
});
