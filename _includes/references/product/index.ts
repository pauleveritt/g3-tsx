import { ReferenceTypeConfig } from "../../../src/registration";
import { getProduct } from "./ProductModels";

export const productConfig: ReferenceTypeConfig = {
  collectionName: "product",
  attributeKey: "label",
  suffix: "References",
  factory: getProduct,
};
