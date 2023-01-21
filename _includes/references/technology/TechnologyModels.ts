import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyPage } from "../../models";

export const TechnologyReference = Type.Intersect([Reference]);
export type TechnologyReference = Static<typeof TechnologyReference>;

export function getTechnology(
  data: any,
  page: EleventyPage
): TechnologyReference {
  const author: TechnologyReference = {
    ...getReference(data, page, "technology"),
  };
  validateResource(TechnologyReference, author, page.fileSlug);
  return author;
}
