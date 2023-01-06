import { Reference } from "../models";
import { Static, Type } from "@sinclair/typebox";

export const AuthorReference = Type.Intersect([Reference]);
export type AuthorReference = Static<typeof AuthorReference>;

export function getAuthor(data: any): AuthorReference {
  const author: AuthorReference = {};
}
