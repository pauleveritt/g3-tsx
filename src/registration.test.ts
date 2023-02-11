import { beforeEach, describe, expect, test } from "vitest";
import fixtures from "../_includes/fixtures";
import {
  CollectionApi,
  getAllCollections,
  resolveReference,
  resolveReferences,
} from "./registration";
import { referenceCollections, resourceCollections } from "../_includes/config";
import { Tip } from "../_includes/resources/tip/TipModels";
import { AuthorFrontmatter } from "../_includes/references/author/AuthorModels";
import {
  ReferenceCollection,
  References,
  ResourceCollection,
} from "./ResourceModels";
import { EleventyCollectionItem } from "./models";

const mockCollectionApi: CollectionApi = {
  getAll: () => fixtures.all,
  getFilteredByTag: () => fixtures.all,
};

const fieldNames = ["author", "products", "technologies", "topics"];
let allResources: ResourceCollection;
let allReferences: ReferenceCollection;
let tipItems: EleventyCollectionItem[];
let authorItems: EleventyCollectionItem[];
let productItems: EleventyCollectionItem[];
let tipItem0: EleventyCollectionItem;
let authorItem0: EleventyCollectionItem;
let productItem0: EleventyCollectionItem;
let tip0: Tip;
let author0: AuthorFrontmatter;

beforeEach(() => {
  allResources = fixtures.collections.allResources;
  allReferences = fixtures.collections.allReferences;
  tipItems = fixtures.tipItems;
  authorItems = fixtures.authorItems;
  productItems = fixtures.productItems;
  tipItem0 = tipItems[0];
  authorItem0 = authorItems[0];
  productItem0 = productItems[0];
  tip0 = allResources.get(tipItem0.page.url) as Tip;
  if (authorItem0.data.label) {
    author0 = allReferences.get(authorItem0.data.label) as AuthorFrontmatter;
  }
});

test("should start with unresolved references on tips", () => {
  expect(tip0.references).to.be.undefined;
});

test("a resource and a reference exist in fixture data", () => {
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
  const thisTip0 = allResources.get(tipItem0.page.url) as Tip;
  expect(thisTip0).to.exist;

  // Authors
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
  let resource: Tip;

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
    expect(tip0.references).not.to.exist;
    const referenceMap: References = resolveReferences({
      fieldNames,
      resource: tip0,
      allReferences,
    });
    const refAuthor = referenceMap.author;
    expect(refAuthor.title).to.equal(authorItem0.data.title);
    const refProducts = referenceMap.products;
    expect(refProducts[0].title).to.equal(productItem0.data.title);
  });

  test("resolve a missing products", () => {
    // Get rid of products
    delete resource.products;
    expect(resource.references).not.to.exist;
    const referenceMap: References = resolveReferences({
      fieldNames,
      resource,
      allReferences,
    });
    const refAuthor = referenceMap.author;
    expect(refAuthor.title).to.equal(authorItem0.data.title);
    expect(referenceMap.products).to.exist;
  });
});
