import { ReferenceTypeConfig } from "../../../src/registration";
import { getTechnology } from "./TechnologyModels";

export const technologyConfig: ReferenceTypeConfig = {
  collectionName: "technology",
  attributeKey: "label",
  suffix: "References",
  factory: getTechnology,
};
