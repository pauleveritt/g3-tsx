import { ResourceTypeConfig } from "../../../src/registration";
import { getTechnology } from "./TechnologyModels";

export const technologyConfig: ResourceTypeConfig = {
  collectionName: "technology",
  attributeKey: "label",
  suffix: "References",
  factory: getTechnology,
};
