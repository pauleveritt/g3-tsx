import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyCollectionItem, EleventyPage } from "../../../src/models";

export const TechnologyReference = Type.Intersect([Reference]);
export type TechnologyReference = Static<typeof TechnologyReference>;
export type TechnologyCollection = { [name: string]: TechnologyReference };

export function getTechnology(
  data: any,
  page: EleventyPage
): TechnologyReference {
  const author: TechnologyReference = {
    ...getReference(data, page, "technology"),
  };
  validateResource(TechnologyReference, author, page.url);
  return author;
}

export async function getTechnologyReferences(
  collectionItems: EleventyCollectionItem[]
) {
  /* Called from eleventy.config.js to add technology collection's items */
  const results: { [index: string]: TechnologyReference } = {};
  collectionItems.forEach((item) => {
    const thisTechnology = getTechnology(item.data, item.page);
    results[thisTechnology.label] = thisTechnology;
  });
  return results;
}
