import { expect, test } from "vitest";
import { Product, ProductData, ProductFrontmatter } from "./ProductModels";
import { EleventyPage } from "../../../src/models";
import { rootPath } from "../../config";

const productFrontmatter: ProductFrontmatter = {
  label: "sa",
  logo: "some-logo.png",
  resourceType: "author",
  title: "Some Product",
};
const data: ProductData = {
  ...productFrontmatter,
  content: "<p>Some content</p>",
};
const page: EleventyPage = {
  fileSlug: "sp",
  url: "/products/sp/",
  inputPath: `${rootPath}/products/sp/index.md`,
};

test("construct a product", async () => {
  const product = new Product({ data, page });
  expect(product.title).to.equal("Some Product");
});

test("construct a product from factory", async () => {
  const product = await new Product({ data, page }).init();
  expect(product.title).to.equal("Some Product");
});
