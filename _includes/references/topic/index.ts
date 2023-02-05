import { ResourceTypeConfig } from "../../../src/registration";
import { getTopicReferences } from "./TopicModels";

export const topicConfig: ResourceTypeConfig = {
  collectionName: "topic",
  suffix: "References",
  factory: getTopicReferences,
};
