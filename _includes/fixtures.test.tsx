import { expect, it } from "vitest";
import fixtures from "./fixtures";
import { validateResource } from "../src/validators";
import { TipResource } from "./resources/tip/TipModels";
import { AuthorReference } from "./references/author/AuthorModels";
import { TechnologyReference } from "./references/technology/TechnologyModels";
import { TopicReference } from "./references/topic/TopicModels";
import { ProductReference } from "./references/product/ProductModels";
import { EleventyCollectionItem } from "../src/models";

it("should have valid fixture data", () => {
  const {
    children,
    tips,
    authors,
    authorItems,
    collections,
    technologies,
    topics,
    products,
  } = fixtures;
  const { authorReferences } = collections;
  expect(children[0]).to.contain("Hello");

  // Tips
  tips.forEach((tip) => {
    expect(() =>
      validateResource(TipResource, tip, "my-tip")
    ).not.toThrowError();
  });
  // Make sure our join works
  expect(authorReferences.get(tips[0].author)).to.exist;
  // expect(Object.keys(authorReferences)).to.contain(tips[0].author);

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

  // Products
  products.forEach((product) => {
    expect(() =>
      validateResource(ProductReference, product, "my-tip")
    ).not.toThrowError();
  });

  // The all collection
  authorItems.forEach((ci) => {
    expect(() =>
      validateResource(EleventyCollectionItem, ci, "my-tip")
    ).not.toThrowError();
  });
});
