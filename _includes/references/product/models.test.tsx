import { expect, test } from "vitest";
import { getProduct } from "./models";
import { readMarkdown } from "../../../src/validators";

test("Construct a valid model", () => {
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/products/rider/index.md"
  );

  const productData = {
    ...frontmatter,
    url: "/products/rider/",
    fileSlug: "rider",
    content: body,
    resourceType: "product",
  };
  const result = getProduct(productData);
  expect(result.label).to.equal("rider");
});
