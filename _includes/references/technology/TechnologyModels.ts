import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";

export const TechnologyReference = Type.Intersect([Reference]);
export type TechnologyReference = Static<typeof TechnologyReference>;

export function getTechnology(data: any): TechnologyReference {
  const author: TechnologyReference = {
    ...getReference(data),
  };
  validateResource(TechnologyReference, author);
  return author;
}
