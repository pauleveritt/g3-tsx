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
  const author1 = allReferences.get(authorItems[0].page.url);
  expect(author1 && author1.title).to.equal(authorItems[0].data.title);
});
