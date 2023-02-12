import { expect, test } from "vitest";
import fixtures from "./fixtures";

test("should load 11ty page/data items", () => {
  const all = fixtures.all;
  expect(all.length).to.be.gt(9);
});

test("should process into allResources and allReferences", () => {
  const { tipItems, authorItems } = fixtures;
  const { allResources, allReferences } = fixtures.collections;
  const tip1 = allResources.get(tipItems[0].page.url);
  expect(tip1 && tip1.title).to.equal(tipItems[0].data.title);
  const author0Label = authorItems[0].data.label as string;
  const author0 = allReferences.get(author0Label);
  expect(author0 && author0.title).to.equal(authorItems[0].data.title);
});

test("each of the kinds of items", () => {
  const { authorItems } = fixtures;
  const author0 = authorItems[0];
  expect(author0.data.label).to.equal("sa");
});

test("should NOT have resolved references", () => {
  const { tipItems } = fixtures;
  const { allResources } = fixtures.collections;
  const tip0 = allResources.get(tipItems[0].page.url);
  expect(tip0 && tip0.references).not.to.exist;
});
test("should have resolved references", () => {
  const { tipItems, authorItems, topicItems } = fixtures;
  const { resolvedCollections } = fixtures;
  const tip0 = resolvedCollections.allResources.get(tipItems[0].page.url);
  if (tip0 && tip0.references) {
    expect(tip0).to.exist;
    expect(tip0.references).to.exist;
    expect(tip0.references.author.title).to.equal(authorItems[0].data.title);
    expect(tip0.references.topics[0].title).to.equal(topicItems[0].data.title);
    // TODO Move from label to type:label
    // expect(tip0.references.technologies[0].title).to.equal(
    //   technologyItems[0].data.title
    // );
  }
});
