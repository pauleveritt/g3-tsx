import { ResourceTypeConfig } from "../../../src/registration";
import { getTutorial } from "./TutorialModels";

export const tutorialConfig: ResourceTypeConfig = {
  collectionName: "tutorial",
  factory: getTutorial,
};
