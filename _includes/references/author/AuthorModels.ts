import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyCollectionItem, EleventyPage } from "../../models";
import path from "path";
// @ts-ignore
import Image from "@11ty/eleventy-img";
import { imageOptions } from "../../config";

export const AuthorReference = Type.Intersect([
  Reference,
  Type.Object({
    thumbnail: Type.String(),
  }),
]);
export type AuthorReference = Static<typeof AuthorReference>;
export type AuthorCollection = { [name: string]: AuthorReference };

export async function getAuthor(
  data: any,
  page: EleventyPage
): Promise<AuthorReference> {
  const reference: AuthorReference = getReference(
    data,
    page,
    "author"
  ) as AuthorReference;

  // we know we have a thumbnail
  // now fix it to the correct path
  const dirname = path.dirname(page.inputPath);
  reference.thumbnail = path.join(dirname, data.thumbnail);

  validateResource(AuthorReference, reference, page.url);

  // generate thumbnail images to output directory
  await Image(reference.thumbnail, imageOptions);

  return reference;
}

export async function getAuthorReferences(
  collectionItems: EleventyCollectionItem[]
) {
  /* Called from eleventy.config.js to add author collection's items */
  const results: { [index: string]: AuthorReference } = {};
  for (const item of collectionItems) {
    const thisAuthor = await getAuthor(item.data, item.page);
    results[thisAuthor.label] = thisAuthor;
  }
  return results;
}
