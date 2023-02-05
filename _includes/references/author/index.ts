import { ResourceTypeConfig } from "../../../src/registration";
import { getAuthor } from "./AuthorModels";

export const authorConfig: ResourceTypeConfig = {
  collectionName: "author",
  attributeKey: "label",
  suffix: "References",
  factory: getAuthor,
};
