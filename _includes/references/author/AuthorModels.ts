import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";

export const AuthorReference = Type.Intersect([Reference]);
export type AuthorReference = Static<typeof AuthorReference>;

export function getAuthor(data: any): AuthorReference {
  const author: AuthorReference = {
    ...getReference(data),
  };
  validateResource(AuthorReference, author);
  return author;
}
