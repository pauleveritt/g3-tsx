import { Reference } from "../models";
import { Static, Type } from "@sinclair/typebox";
import { getResource } from "../../resources/models";
import { validateResource } from "../../../src/validators";

export const AuthorReference = Type.Intersect([Reference]);
export type AuthorReference = Static<typeof AuthorReference>;

export function getAuthor(data: any): AuthorReference {
  const author: AuthorReference = {
    ...getResource(data),
    label: data.label ? data.label : "labelss",
    resources: [],
    referenceResources: [],
  };
  validateResource(AuthorReference, author);
  return author;
}
