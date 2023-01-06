import { expect, test } from "vitest";
import { getTopic } from "./TopicModels";
import { readMarkdown } from "../../../src/validators";

test("Construct a valid model", () => {
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/topics/customizing/index.md"
  );

  const topicData = {
    ...frontmatter,
    url: "/topics/customizing/",
    fileSlug: "customizing",
    content: body,
    resourceType: "topic",
  };
  const result = getTopic(topicData);
  expect(result.label).to.equal("customizing");
});
