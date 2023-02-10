import { ReferenceTypeConfig } from "../../../src/registration";
import { getAuthor } from "./AuthorModels";

export const authorConfig: ReferenceTypeConfig = {
  collectionName: "author",
  factory: getAuthor,
};
