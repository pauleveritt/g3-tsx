import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyPage } from "../../models";

export const AuthorReference = Type.Intersect([
  Type.Omit(Reference, ["author"]),
]);
export type AuthorReference = Static<typeof AuthorReference>;

export function getAuthor(data: any, page: EleventyPage): AuthorReference {
  const author: AuthorReference = {
    ...getReference(data, page, "author"),
    thumbnail: data.thumbnail,
  };
  validateResource(AuthorReference, author);
  return author;
}
