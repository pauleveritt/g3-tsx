import { ResourceTypeConfig } from "../../../src/registration";
import { getProduct } from "./ProductModels";

export const productConfig: ResourceTypeConfig = {
  collectionName: "product",
  attributeKey: "label",
  suffix: "References",
  factory: getProduct,
};
