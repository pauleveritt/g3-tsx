import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyPage } from "../../models";

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
