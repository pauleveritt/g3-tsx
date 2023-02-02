import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyPage } from "../../models";
import path from "path";

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
