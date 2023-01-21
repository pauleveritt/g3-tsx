import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyPage } from "../../models";

export const ProductReference = Type.Intersect([Reference]);
export type ProductReference = Static<typeof ProductReference>;

export function getProduct(data: any, page: EleventyPage): ProductReference {
  const product: ProductReference = {
    ...getReference(data, page, "product"),
  };
  validateResource(ProductReference, product, page.fileSlug);
  return product;
}
