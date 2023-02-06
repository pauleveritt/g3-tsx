import { getReference, Reference } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyPage } from "../../../src/models";

export const TechnologyReference = Type.Intersect([Reference]);
export type TechnologyReference = Static<typeof TechnologyReference>;
export type TechnologyCollection = Map<string, TechnologyReference>;

export async function getTechnology(
  data: any,
  page: EleventyPage
): Promise<TechnologyReference> {
  const author: TechnologyReference = {
    ...getReference(data, page, "technology"),
  };
  validateResource(TechnologyReference, author, page.url);
  return author;
}
