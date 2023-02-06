import { expect, test } from "vitest";
import { getTopic } from "./TopicModels";
import fixtures from "../../fixtures";

test("construct a topic", async () => {
  const { data, page } = fixtures.topicItems[0];
  const tip = await getTopic(data, page);
  expect(tip.label).to.equal("st");
});
