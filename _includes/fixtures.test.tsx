import { expect, it } from "vitest";
import fixtures from "./fixtures";
import { validateResource } from "../src/validators";
import { TipResource } from "./resources/tip/TipModels";
import { AuthorReference } from "./references/author/AuthorModels";
import { TechnologyReference } from "./references/technology/TechnologyModels";
import { TopicReference } from "./references/topic/TopicModels";
import { EleventyCollectionItem } from "./models";

it("should have valid fixture data", () => {
  const { children, tips, authors, collections, technologies, topics } =
    fixtures;
  const { authorReferences } = collections;
  expect(children[0]).to.contain("Hello");

  // Tips
  tips.forEach((tip) => {
    expect(() =>
      validateResource(TipResource, tip, "my-tip")
    ).not.toThrowError();
  });
  // Make sure our join works
  expect(Object.keys(authorReferences)).to.contain(tips[0].author);

  // Authors
  authors.forEach((author) => {
    expect(() =>
      validateResource(AuthorReference, author, "my-tip")
    ).not.toThrowError();
  });

  // Technologies
  technologies.forEach((technology) => {
    expect(() =>
      validateResource(TechnologyReference, technology, "my-tip")
    ).not.toThrowError();
  });

  // Topics
  topics.forEach((topic) => {
    expect(() =>
      validateResource(TopicReference, topic, "my-tip")
    ).not.toThrowError();
  });

  // The all collection
  collections.all.forEach((ci) => {
    expect(() =>
      validateResource(EleventyCollectionItem, ci, "my-tip")
    ).not.toThrowError();
  });

  // Ensure references
});
