import { ReferenceTypeConfig } from "../../../src/registration";
import { getAuthor } from "./AuthorModels";

export const authorConfig: ReferenceTypeConfig = {
  collectionName: "author",
  attributeKey: "label",
  suffix: "References",
  factory: getAuthor,
};
