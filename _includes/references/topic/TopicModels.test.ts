import { expect, test } from "vitest";
import { getTopic, getTopicReferences } from "./TopicModels";
import fixtures from "../../fixtures";

test("construct a topic", async () => {
  const { data, page } = fixtures.collections.topic[0];
  const tip = await getTopic(data, page);
  expect(tip.label).to.equal("st");
});

test("gets topic references", async () => {
  const allTopics = fixtures.collections.topic;
  const topicReferences = await getTopicReferences(allTopics);
  expect(topicReferences["st"].title).to.equal("Some Topic");
});
