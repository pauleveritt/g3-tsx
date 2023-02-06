import h from "vhtml";
import { TipResource } from "./resources/tip/TipModels";
import { AuthorReference } from "./references/author/AuthorModels";
import { SiteCollections } from "./models";
import { TechnologyReference } from "./references/technology/TechnologyModels";
import { TopicReference } from "./references/topic/TopicModels";
import { ProductReference } from "./references/product/ProductModels";
import { rootPath } from "./config";
import { vi } from "vitest";
import { EleventyCollectionItem, RenderContext } from "../src/models";
import { Resource } from "../src/ResourceModels";

/**
 * Reusable test data
 */
const content = `<p>Hello <em id="world">world</em>.</p>`;
const children: string[] = [
  h("", {
    dangerouslySetInnerHTML: { __html: content },
  }),
];

const all: EleventyCollectionItem[] = [
  {
    data: {
      title: "Some Tip",
      date: new Date("2023-02-02"),
      resourceType: "tip",
      author: "sa",
      thumbnail: "thumbnail.png",
    },
    page: {
      fileSlug: "some-tip",
      url: "/tips/some-tip/",
      inputPath: `${rootPath}/tips/some-tip/index.md`,
    },
    content: "<p>Some Tip</p>",
  },
  {
    data: {
      title: "Another Tip",
      date: new Date("2023-01-10"),
      resourceType: "tip",
      author: "aa",
      technologies: ["st", "at"],
      topics: ["st", "at"],
      products: ["sp", "ap"],
      thumbnail: "aa.png",
    },
    page: {
      fileSlug: "another-tip",
      url: "/tips/another-tip/",
      inputPath: `${rootPath}/tips/another-tip/index.md`,
    },
    content: "<p>Another Tip</p>",
  },
  {
    data: {
      title: "Some Author",
      date: new Date("2023-01-08"),
      resourceType: "author",
      label: "sa",
      thumbnail: "sa.png",
    },
    page: {
      fileSlug: "sa",
      url: "/authors/sa/",
      inputPath: `${rootPath}/authors/sa/index.md`,
    },
    content: "<p>Some Author</p>",
  },
  {
    data: {
      title: "Another Author",
      date: new Date("2023-01-20"),
      resourceType: "author",
      label: "aa",
      thumbnail: "aa.png",
    },
    page: {
      fileSlug: "aa",
      url: "/authors/aa/",
      inputPath: "./sites/webstorm-guide/authors/aa/index.md",
    },
    content: "<p>Another Author</p>",
  },
  {
    data: {
      title: "Some Technology",
      date: new Date("2023-01-22"),
      resourceType: "technology",
      label: "st",
    },
    page: {
      fileSlug: "st",
      url: "/technologies/st/",
      inputPath: `${rootPath}/technologies/st/index.md`,
    },
    content: "<p>Some Technology</p>",
  },
  {
    data: {
      title: "Another Technology",
      date: new Date("2023-01-14"),
      resourceType: "technology",
      label: "at",
    },
    page: {
      fileSlug: "at",
      url: "/technologies/at/",
      inputPath: `${rootPath}/technologies/at/index.md`,
    },
    content: "<p>Another Technology</p>",
  },
  {
    data: {
      title: "Some Topic",
      date: new Date("2023-01-28"),
      resourceType: "topic",
      label: "st",
    },
    page: {
      fileSlug: "st",
      url: "/topics/st/",
      inputPath: `${rootPath}/topics/st/index.md`,
    },
    content: "<p>Some Topic</p>",
  },
  {
    data: {
      title: "Another Topic",
      date: new Date("2023-01-12"),
      resourceType: "topic",
      label: "at",
    },
    page: {
      fileSlug: "at",
      url: "/topics/at/",
      inputPath: `${rootPath}/topics/at/index.md`,
    },
    content: "<p>Another Topic</p>",
  },
  {
    data: {
      title: "Some Product",
      date: new Date("2023-01-22"),
      resourceType: "product",
      label: "sp",
      logo: "some.png",
    },
    page: {
      fileSlug: "sp",
      url: "/products/sp/",
      inputPath: `${rootPath}/products/sp/index.md`,
    },
    content: "<p>Some Product</p>",
  },
  {
    data: {
      title: "Another Product",
      date: new Date("2023-01-13"),
      resourceType: "product",
      label: "ap",
      logo: "another.png",
    },
    page: {
      fileSlug: "ap",
      url: "/topics/ap/",
      inputPath: `${rootPath}/topics/ap/index.md`,
    },
    content: "<p>Another Product</p>",
  },
];

const tipItems = [all[0], all[1]];
const tips: TipResource[] = [
  {
    title: all[0].data.title,
    slug: all[0].page.fileSlug,
    url: all[0].page.url,
    resourceType: all[0].data.resourceType as string,
    author: all[0].data.author as string,
  },
  {
    title: all[1].data.title,
    slug: all[1].page.fileSlug,
    url: all[1].page.url,
    resourceType: all[1].data.resourceType as string,
    author: all[1].data.author as string,
  },
];

const authorItems = [all[2], all[3]];
const authors: AuthorReference[] = [
  {
    title: all[2].data.title,
    slug: all[2].page.fileSlug,
    url: all[2].page.url,
    resourceType: all[2].data.resourceType as string,
    label: all[2].data.label as string,
    resources: [],
    referenceResources: [],
    thumbnail: all[2].data.thumbnail as string,
  },
  {
    title: all[3].data.title,
    slug: all[3].page.fileSlug,
    url: all[3].page.url,
    resourceType: all[3].data.resourceType as string,
    label: all[3].data.label as string,
    resources: [],
    referenceResources: [],
    thumbnail: all[3].data.thumbnail as string,
  },
];

const technologyItems = [all[4], all[5]];
const technologies: TechnologyReference[] = [
  {
    title: all[4].data.title,
    slug: all[4].page.fileSlug,
    url: all[4].page.url,
    resourceType: all[4].data.resourceType as string,
    label: all[4].data.label as string,
    resources: [],
    referenceResources: [],
  },
  {
    title: all[5].data.title,
    slug: all[5].page.fileSlug,
    url: all[5].page.url,
    resourceType: all[5].data.resourceType as string,
    label: all[5].data.label as string,
    resources: [],
    referenceResources: [],
  },
];

const topicItems = [all[6], all[7]];
const topics: TopicReference[] = [
  {
    title: all[6].data.title,
    slug: all[6].page.fileSlug,
    url: all[6].page.url,
    resourceType: all[6].data.resourceType as string,
    label: all[6].data.label as string,
    resources: [],
    referenceResources: [],
  },
  {
    title: all[7].data.title,
    slug: all[7].page.fileSlug,
    url: all[7].page.url,
    resourceType: all[7].data.resourceType as string,
    label: all[7].data.label as string,
    resources: [],
    referenceResources: [],
  },
];

const productItems = [all[8], all[9]];
const products: ProductReference[] = [
  {
    title: all[8].data.title,
    slug: all[8].page.fileSlug,
    url: all[8].page.url,
    resourceType: all[8].data.resourceType as string,
    label: all[8].data.label as string,
    logo: all[8].data.logo as string,
    resources: [],
    referenceResources: [],
  },
  {
    title: all[9].data.title,
    slug: all[9].page.fileSlug,
    url: all[9].page.url,
    resourceType: all[9].data.resourceType as string,
    label: all[9].data.label as string,
    logo: all[9].data.logo as string,
    resources: [],
    referenceResources: [],
  },
];
const tipResources: Map<string, TipResource> = new Map();
tips.forEach((tip) => tipResources.set(tip.url, tip));
const authorReferences: Map<string, AuthorReference> = new Map();

authors.forEach((author) => authorReferences.set(author.label, author));
const technologyReferences: Map<string, TechnologyReference> = new Map();
technologies.forEach((technology) =>
  technologyReferences.set(technology.label, technology)
);
const topicReferences: Map<string, TopicReference> = new Map();
topics.forEach((topic) => topicReferences.set(topic.label, topic));
const productReferences: Map<string, ProductReference> = new Map();
products.forEach((product) => productReferences.set(product.label, product));
const allResources: Map<string, Resource> = new Map();
[...tips].forEach((resource) => allResources.set(resource.url, resource));

const collections: SiteCollections = {
  all,
  tipResources,
  authorReferences,
  technologyReferences,
  topicReferences,
  productReferences,
  allResources,
};

const addTestCase = vi.fn();
const context: RenderContext = {
  addTestCase,
};

// Now assemble for export
const fixtures = {
  authors,
  authorItems,
  children,
  collections,
  content,
  technologies,
  technologyItems,
  tips,
  tipItems,
  topics,
  topicItems,
  products,
  productItems,
  all,
  context,
};
export default fixtures;
