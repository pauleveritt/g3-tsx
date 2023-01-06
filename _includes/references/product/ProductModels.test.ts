import { expect, test } from "vitest";
import { getProduct } from "./ProductModels";
import { readMarkdown } from "../../../src/validators";

test("Construct a valid product", () => {
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/products/rider/index.md"
  );

  const productData = {
    ...frontmatter,
    url: "/products/rider/",
    content: body,
    resourceType: "product",
  };
  const productPage = {
    fileSlug: "rider",
  };
  const result = getProduct(productData, productPage);
  expect(result.label).to.equal("rider");
});
