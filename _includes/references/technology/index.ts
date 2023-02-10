import { ReferenceTypeConfig } from "../../../src/registration";
import { getTechnology } from "./TechnologyModels";

export const technologyConfig: ReferenceTypeConfig = {
  collectionName: "technology",
  factory: getTechnology,
};
