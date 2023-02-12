import { expect, test } from "vitest";
import {
  getProduct,
  Product,
  ProductData,
  ProductFrontmatter,
} from "./ProductModels";
import { EleventyPage } from "../../../src/models";
import { rootPath } from "../../config";

const productFrontmatter: ProductFrontmatter = {
  date: new Date("2023-02-02"),
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
  const product = await getProduct(data, page);
  expect(product.title).to.equal("Some Product");
});
