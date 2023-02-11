import {
  getReference,
  Reference,
  ReferenceFrontmatter,
} from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateFrontmatter } from "../../../src/validators";
import { EleventyPage } from "../../../src/models";

export const ProductFrontmatter = Type.Intersect([
  ReferenceFrontmatter,
  Type.Object({
    logo: Type.Optional(Type.String()),
  }),
]);
export type ProductFrontmatter = Static<typeof ProductFrontmatter>;

export type Product = {} & ProductFrontmatter & Reference;
export async function getProduct(
  data: any,
  page: EleventyPage
): Promise<Product> {
  const product: Product = {
    ...getReference(data, page, "product"),
    logo: data.logo,
  };
  validateFrontmatter(ProductFrontmatter, product, page.url);
  return product;
}
