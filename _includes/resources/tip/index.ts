import { ResourceTypeConfig } from "../../../src/registration";
import { getTipResources } from "./TipModels";

export const tipConfig: ResourceTypeConfig = {
  collectionName: "tip",
  suffix: "Resources",
  factory: getTipResources,
};
