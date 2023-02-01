import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyPage } from "../../models";

export const AuthorReference = Type.Intersect([Reference]);
export type AuthorReference = Static<typeof AuthorReference>;
export type AuthorCollection = { [name: string]: AuthorReference };

export async function getAuthor(
  data: any,
  page: EleventyPage
): Promise<AuthorReference> {
  const author: AuthorReference = {
    ...getReference(data, page, "author"),
    thumbnail: data.thumbnail,
  };
  validateResource(AuthorReference, author, page.url);
  return author;
}
