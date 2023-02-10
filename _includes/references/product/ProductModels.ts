import { getReference, Reference } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyPage } from "../../../src/models";

export const Product = Type.Intersect([
  Reference,
  Type.Object({
    logo: Type.Optional(Type.String()),
  }),
]);
export type Product = Static<typeof Product>;

export async function getProduct(
  data: any,
  page: EleventyPage
): Promise<Product> {
  const product: Product = {
    ...getReference(data, page, "product"),
    logo: data.logo,
  };
  validateResource(Product, product, page.url);
  return product;
}
