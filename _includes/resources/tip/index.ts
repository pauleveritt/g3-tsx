import { ResourceTypeConfig } from "../../../src/registration";
import { getTip } from "./TipModels";

export const tipConfig: ResourceTypeConfig = {
  collectionName: "tip",
  factory: getTip,
};
