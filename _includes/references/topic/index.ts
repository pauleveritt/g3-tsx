import { ResourceTypeConfig } from "../../../src/registration";
import { getTopic } from "./TopicModels";

export const topicConfig: ResourceTypeConfig = {
  collectionName: "topic",
  attributeKey: "label",
  suffix: "References",
  factory: getTopic,
};
