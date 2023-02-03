import { expect, test } from "vitest";
import { getProduct, getProductReferences } from "./ProductModels";
import fixtures from "../../fixtures";

test("construct a product", async () => {
  const { data, page } = fixtures.collections.product[0];
  const tip = await getProduct(data, page);
  expect(tip.label).to.equal("sp");
});

test("gets product references", async () => {
  const allProducts = fixtures.collections.product;
  const productReferences = await getProductReferences(allProducts);
  expect(productReferences["sp"].title).to.equal("Some Product");
});
