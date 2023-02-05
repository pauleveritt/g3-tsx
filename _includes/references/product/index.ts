import { ResourceTypeConfig } from "../../../src/registration";
import { getProductReferences } from "./ProductModels";

export const productConfig: ResourceTypeConfig = {
  collectionName: "product",
  suffix: "References",
  factory: getProductReferences,
};
