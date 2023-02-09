import { getReference, Reference } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyPage } from "../../../src/models";
import path from "path";

export const TechnologyReference = Type.Intersect([
  Reference,
  Type.Object({
    logo: Type.String(),
  }),
]);
export type TechnologyReference = Static<typeof TechnologyReference>;
export type TechnologyCollection = Map<string, TechnologyReference>;

export async function getTechnology(
  data: any,
  page: EleventyPage
): Promise<TechnologyReference> {
  const technology: TechnologyReference = {
    ...getReference(data, page, "technology"),
    logo: path.join(page.url, data.logo)
  };
  validateResource(TechnologyReference, technology, page.url);
  return technology;
}
