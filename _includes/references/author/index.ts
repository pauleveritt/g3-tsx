import { ResourceTypeConfig } from "../../../src/registration";
import { getAuthorReferences } from "./AuthorModels";

export const authorConfig: ResourceTypeConfig = {
  collectionName: "author",
  suffix: "References",
  factory: getAuthorReferences,
};
