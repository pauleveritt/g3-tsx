import { ResourceTypeConfig } from "../../../src/registration";
import { getTechnologyReferences } from "./TechnologyModels";

export const technologyConfig: ResourceTypeConfig = {
  collectionName: "technology",
  suffix: "References",
  factory: getTechnologyReferences,
};
