import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyPage } from "../../models";
import path from "path";

export const AuthorReference = Type.Intersect([
  Reference,
  Type.Object({
    thumbnail: Type.Optional(Type.String()),
  }),
]);
export type AuthorReference = Static<typeof AuthorReference>;
export type AuthorCollection = { [name: string]: AuthorReference };

export function getAuthor(data: any, page: EleventyPage): AuthorReference {
  // Get the relative on-disk path to the thumbnail and
  // re-assign it to thumbnail
  let thumbnail: string;
  if (data.thumbnail) {
    thumbnail = path.join(data.inputFolder, data.thumbnail);
  } else {
    thumbnail = "placeholder.fixme.jpg"; // TODO Get the actual Guide placeholder
  }

  const author: AuthorReference = {
    ...getReference(data, page, "author"),
    thumbnail,
  };
  validateResource(AuthorReference, author, page.url);
  return author;
}
