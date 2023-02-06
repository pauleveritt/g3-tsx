import { TipCollection } from "./resources/tip/TipModels";
import {
  AuthorCollection,
  AuthorReference,
} from "./references/author/AuthorModels";
import {
  TechnologyCollection,
  TechnologyReference,
} from "./references/technology/TechnologyModels";
import {
  TopicCollection,
  TopicReference,
} from "./references/topic/TopicModels";
import {
  ProductCollection,
  ProductReference,
} from "./references/product/ProductModels";
import { Collections } from "../src/models";
import { Resource, ResourceCollection } from "../src/ResourceModels";

export type SiteCollections = {
  allResources: ResourceCollection;
  tipResources: TipCollection;
  authorReferences: AuthorCollection;
  technologyReferences: TechnologyCollection;
  topicReferences: TopicCollection;
  productReferences: ProductCollection;
} & Collections;

export type ResourceMapEntry = {
  /* A URL with resolved reference fields */
  author: AuthorReference;
  products: Set<ProductReference>;
  technologies: Set<TechnologyReference>;
  topics: Set<TopicReference>;
};

export class ReferenceMap {
  map: Map<string, ResourceMapEntry>;
  collections: SiteCollections;

  constructor(collections: SiteCollections) {
    this.map = new Map();
    this.collections = collections;
  }

  resolveResource(resource: Resource) {
    const tc = this.collections;
    const url = resource.url;
    const author = tc.authorReferences.get(resource.author);
    if (!author) {
      const msg = `Cannot resolve author "${resource.author}" for url "${url}"`;
      throw new Error(msg);
    }

    // Products
    const products: Set<ProductReference> = new Set();
    if (resource.products) {
      resource.products.forEach((label) => {
        const linkedReference = tc.productReferences.get(label);
        if (linkedReference) {
          products.add(linkedReference);
        }
      });
    }

    // Technologies
    const technologies: Set<TechnologyReference> = new Set();
    if (resource.technologies) {
      resource.technologies.forEach((label) => {
        const linkedReference = tc.technologyReferences.get(label);
        linkedReference && technologies.add(linkedReference);
      });
    }

    // Topics
    const topics: Set<TopicReference> = new Set();
    if (resource.topics) {
      resource.topics.forEach((label) => {
        const linkedReference = tc.topicReferences.get(label);
        linkedReference && topics.add(linkedReference);
      });
    }

    const entry: ResourceMapEntry = {
      author,
      products,
      technologies,
      topics,
    };
    this.map.set(url, entry);
  }
}
