import { ReferenceTypeConfig } from "../../../src/registration";
import { getTopic } from "./TopicModels";

export const topicConfig: ReferenceTypeConfig = {
  collectionName: "topic",
  attributeKey: "label",
  suffix: "References",
  factory: getTopic,
};
