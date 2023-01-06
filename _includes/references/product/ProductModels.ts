import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";

export const ProductReference = Type.Intersect([Reference]);
export type ProductReference = Static<typeof ProductReference>;

export function getProduct(data: any): ProductReference {
  const product: ProductReference = {
    ...getReference(data),
  };
  validateResource(ProductReference, product);
  return product;
}
