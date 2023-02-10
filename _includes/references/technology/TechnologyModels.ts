import { getReference, Reference } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyPage } from "../../../src/models";
import path from "path";

export const Technology = Type.Intersect([
  Reference,
  Type.Object({
    logo: Type.String(),
  }),
]);
export type Technology = Static<typeof Technology>;

export async function getTechnology(
  data: any,
  page: EleventyPage
): Promise<Technology> {
  const technology: Technology = {
    ...getReference(data, page, "technology"),
    logo: path.join(page.url, data.logo),
  };
  validateResource(Technology, technology, page.url);
  return technology;
}
