import { Reference } from "../models";
import { Type } from "@sinclair/typebox";

export const AuthorReference = Type.Intersect([Reference]);
