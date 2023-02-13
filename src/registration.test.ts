import { beforeEach, describe, expect, test } from "vitest";
import fixtures from "../_includes/fixtures";
import {
  CollectionApi,
  getAllCollections,
  resolveReference,
} from "./registration";
import { referenceCollections, resourceCollections } from "../_includes/config";
import { Tip } from "../_includes/resources/tip/TipModels";
import { AuthorFrontmatter } from "../_includes/references/author/AuthorModels";

const mockCollectionApi: CollectionApi = {
  getAll: () => fixtures.all,
  getFilteredByTag: () => fixtures.all,
};

test("should start with unresolved references on tips", () => {
  const tip0 = fixtures.collections.allResources.get("/tips/some-tip/");
  expect(tip0).to.exist;
  expect(tip0 && tip0.references).to.be.undefined;
});

test("a resource and a reference exist in fixture data", () => {
  const tip0 = fixtures.collections.allResources.get("/tips/some-tip/");
  const author0 = fixtures.collections.allReferences.get("sa");
  expect(tip0).to.exist;
  expect(author0).to.exist;
});

test("should construct collections", async () => {
  const { allReferences, allResources } = await getAllCollections({
    collectionApi: mockCollectionApi,
    resourceCollections,
    referenceCollections,
  });
  expect(allResources).to.exist;
  const tipItem0 = fixtures.tipItems[0];
  const thisTip0 = allResources.get(tipItem0.page.url) as Tip;
  expect(thisTip0).to.exist;

  // Authors
  const authorItem0 = fixtures.authorItems[0];
  const thisAuthor0 = allReferences.get(
    authorItem0.data.label as string
  ) as AuthorFrontmatter;
  expect(thisAuthor0).to.exist;
  expect(thisAuthor0.title).to.equal(authorItem0.data.title);

  // Topics
  const topic0Item = fixtures.topicItems[0];
  const thisTopic0 = allReferences.get(topic0Item.data.label as string);
  expect(thisTopic0 && thisTopic0.title).to.equal(topic0Item.data.title);

  // Technologies
  // const technology1Item = fixtures.technologyItems[0];
  // const technology1 = allReferences.get(technology1Item.data.label as string);
  // // TODO Label This illustrates the problem with "st" as key
  //   expect(technology1 && technology1.title).to.equal(technology1Item.data.title);

  // Let's look at references
  const refs = thisTip0.references;
  expect(refs).to.exist;
  expect(refs && refs.author.title).to.equal(authorItem0.data.title);
});

describe("Resolve References", () => {
  const allReferences = fixtures.collections.allReferences;
  const authorItem0 = fixtures.authorItems[0];
  const authorItem1 = fixtures.authorItems[1];
  let resource: Tip;
  const tip0 = fixtures.collections.allResources.get("/tips/some-tip/") as Tip;
  expect(tip0).to.exist;

  beforeEach(() => {
    resource = structuredClone(tip0);
  });

  test("allReferences should exist", () => {
    expect(allReferences.get("sa")).to.exist;
  });

  test("should throw error for undefined field", () => {
    const fieldName = "xxx";
    const resolver = () =>
      resolveReference({ fieldName, resource, allReferences });
    expect(resolver).toThrowError(`No reference field "xxx" on resource`);
  });

  test("should throw error for undefined label in array", () => {
    expect(resource.products && resource.products.length).to.be.gt(0);
    const fieldName = "products";
    resource.products = ["xxx", "yyy"];
    const resolver = () =>
      resolveReference({ fieldName, resource, allReferences });
    expect(resolver).toThrowError(`has unresolved reference "xxx"`);
  });

  test("should throw error for undefined label in value", () => {
    expect(resource.author).to.exist;
    const fieldName = "author";
    resource.author = "xxx";
    const resolver = () =>
      resolveReference({ fieldName, resource, allReferences });
    expect(resolver).toThrowError(`has unresolved reference "xxx"`);
  });

  test("should resolve a single label", () => {
    expect(resource.author).to.exist;
    const fieldName = "author";
    const resolved = resolveReference({
      fieldName,
      resource,
      allReferences,
    }) as AuthorFrontmatter;
    expect(resolved.title).to.equal(authorItem0.data.title);
  });

  test("resolve a set of references", () => {
    const tip0 = fixtures.collections.allResources.get(
      "/tips/some-tip/"
    ) as Tip;
    expect(tip0).to.exist;
    expect(tip0.references).not.to.exist;
    // const referenceMap: References = resolveReferences({
    //   fieldNames,
    //   resource: tip0,
    //   allReferences,
    // });
    tip0.resolve(allReferences);
    expect(tip0.references).to.exist;
    if (tip0.references) {
      const refAuthor = tip0.references.author;
      expect(refAuthor.title).to.equal(authorItem0.data.title);
      const refProducts = tip0.references.products;
      const productItem0 = fixtures.productItems[0];
      expect(refProducts[0].title).to.equal(productItem0.data.title);
    }
  });

  test("resolve a missing products", () => {
    // Get a tip with no products in frontmatter
    const tip1 = fixtures.collections.allResources.get(
      "/tips/another-tip/"
    ) as Tip;
    expect(tip1).to.exist;
    expect(tip1.references).not.to.exist;
    tip1.resolve(allReferences);
    expect(tip1.references).to.exist;
    if (tip1.references) {
      const refAuthor = tip1.references.author;
      expect(refAuthor.title).to.equal(authorItem1.data.title);
      expect(tip1.references.products).to.exist;
    }
  });
});
