import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyCollectionItem, EleventyPage } from "../../models";

export const ProductReference = Type.Intersect([
  Reference,
  Type.Object({
    logo: Type.Optional(Type.String()),
  }),
]);
export type ProductReference = Static<typeof ProductReference>;
export type ProductCollection = { [name: string]: ProductReference };

export function getProduct(data: any, page: EleventyPage): ProductReference {
  const product: ProductReference = {
    ...getReference(data, page, "product"),
    logo: data.logo,
  };
  validateResource(ProductReference, product, page.url);
  return product;
}

export async function getProductReferences(
  collectionItems: EleventyCollectionItem[]
) {
  /* Called from eleventy.config.js to add product collection's items */
  const results: { [index: string]: ProductReference } = {};
  collectionItems.forEach((item) => {
    const thisProduct = getProduct(item.data, item.page);
    results[thisProduct.label] = thisProduct;
  });
  return results;
}
