import { expect, test } from "vitest";
import { getProduct } from "./ProductModels";
import fixtures from "../../fixtures";

test("construct a product", async () => {
  const { data, page } = fixtures.collections.product[0];
  const tip = await getProduct(data, page);
  expect(tip.label).to.equal("sp");
});
