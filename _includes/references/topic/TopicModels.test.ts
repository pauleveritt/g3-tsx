import { expect, test } from "vitest";
import { getTopic } from "./TopicModels";
import { readMarkdown } from "../../../src/validators";
import { EleventyPage } from "../../models";

test("Construct a valid topic", () => {
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/topics/customizing/index.md"
  );

  const topicData = {
    ...frontmatter,
    content: body,
    resourceType: "topic",
  };
  const topicPage: EleventyPage = {
    fileSlug: "customizing",
    url: "/topics/customizing/",
  };
  const result = getTopic(topicData, topicPage);
  expect(result.label).to.equal("customizing");
});
