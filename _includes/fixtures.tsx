import h from "vhtml";
import { getTip, TipFrontmatter } from "./resources/tip/TipModels";
import { Author, AuthorFrontmatter } from "./references/author/AuthorModels";
import { SiteCollections } from "./models";
import {
  getTechnology,
  TechnologyFrontmatter,
} from "./references/technology/TechnologyModels";
import { getTopic, TopicFrontmatter } from "./references/topic/TopicModels";
import {
  getProduct,
  ProductFrontmatter,
} from "./references/product/ProductModels";
import { referenceCollections, resourceCollections, rootPath } from "./config";
import { vi } from "vitest";
import { EleventyCollectionItem, RenderContext } from "../src/models";
import { ReferenceCollection, ResourceCollection } from "../src/ResourceModels";
import { resolveAllCollections } from "../src/registration";

/**
 * Reusable test data
 */
const content = `<p>Hello <em id="world">world</em>.</p>`;
const children: string[] = [
  h("", {
    dangerouslySetInnerHTML: { __html: content },
  }),
];

const tipsData: TipFrontmatter[] = [
  {
    title: "Some Tip",
    date: new Date("2023-02-02"),
    resourceType: "tip",
    author: "sa",
    products: ["sp", "ap"],
    technologies: ["st", "at"],
    topics: ["st", "at"],
    thumbnail: "thumbnail.png",
  },
  {
    title: "Another Tip",
    date: new Date("2023-01-10"),
    resourceType: "tip",
    author: "aa",
    technologies: ["st", "at"],
    topics: ["st", "at"],
    products: ["sp", "ap"],
    thumbnail: "aa.png",
  },
];

const authorsData: AuthorFrontmatter[] = [
  {
    title: "Some Author",
    date: new Date("2023-01-08"),
    resourceType: "author",
    label: "sa",
    thumbnail: "sa.png",
  },
  {
    title: "Another Author",
    date: new Date("2023-01-20"),
    resourceType: "author",
    label: "aa",
    thumbnail: "aa.png",
  },
];

const technologiesData: TechnologyFrontmatter[] = [
  {
    title: "Some Technology",
    date: new Date("2023-01-22"),
    resourceType: "technology",
    label: "st",
    logo: "stlogo.svg",
  },
  {
    title: "Another Technology",
    date: new Date("2023-01-14"),
    resourceType: "technology",
    label: "at",
    logo: "atlogo.svg",
  },
];

const topicsData: TopicFrontmatter[] = [
  {
    title: "Some Topic",
    date: new Date("2023-01-28"),
    resourceType: "topic",
    label: "st",
    accent: "st-accent",
    icon: "st-icon.png",
  },
  {
    title: "Another Topic",
    date: new Date("2023-01-12"),
    resourceType: "topic",
    label: "at",
    accent: "at-accent",
    icon: "at-icon.png",
  },
];
const productsData: ProductFrontmatter[] = [
  {
    title: "Some Product",
    date: new Date("2023-01-22"),
    resourceType: "product",
    label: "sp",
    logo: "some.png",
  },
  {
    title: "Another Product",
    date: new Date("2023-01-13"),
    resourceType: "product",
    label: "ap",
    logo: "another.png",
  },
];
const all: EleventyCollectionItem[] = [
  {
    data: tipsData[0],
    page: {
      fileSlug: "some-tip",
      url: "/tips/some-tip/",
      inputPath: `${rootPath}/tips/some-tip/index.md`,
    },
    content: "<p>Some Tip</p>",
  },
  {
    data: tipsData[1],
    page: {
      fileSlug: "another-tip",
      url: "/tips/another-tip/",
      inputPath: `${rootPath}/tips/another-tip/index.md`,
    },
    content: "<p>Another Tip</p>",
  },
  {
    data: authorsData[0],
    page: {
      fileSlug: "sa",
      url: "/authors/sa/",
      inputPath: `${rootPath}/authors/sa/index.md`,
    },
    content: "<p>Some Author</p>",
  },
  {
    data: authorsData[1],
    page: {
      fileSlug: "aa",
      url: "/authors/aa/",
      inputPath: "./sites/webstorm-guide/authors/aa/index.md",
    },
    content: "<p>Another Author</p>",
  },
  {
    data: technologiesData[0],
    page: {
      fileSlug: "st",
      url: "/technologies/st/",
      inputPath: `${rootPath}/technologies/st/index.md`,
    },
    content: "<p>Some Technology</p>",
  },
  {
    data: technologiesData[1],
    page: {
      fileSlug: "at",
      url: "/technologies/at/",
      inputPath: `${rootPath}/technologies/at/index.md`,
    },
    content: "<p>Another Technology</p>",
  },
  {
    data: topicsData[0],
    page: {
      fileSlug: "st",
      url: "/topics/st/",
      inputPath: `${rootPath}/topics/st/index.md`,
    },
    content: "<p>Some Topic</p>",
  },
  {
    data: topicsData[1],
    page: {
      fileSlug: "at",
      url: "/topics/at/",
      inputPath: `${rootPath}/topics/at/index.md`,
    },
    content: "<p>Another Topic</p>",
  },
  {
    data: productsData[0],
    page: {
      fileSlug: "sp",
      url: "/products/sp/",
      inputPath: `${rootPath}/products/sp/index.md`,
    },
    content: "<p>Some Product</p>",
  },
  {
    data: productsData[1],
    page: {
      fileSlug: "ap",
      url: "/topics/ap/",
      inputPath: `${rootPath}/topics/ap/index.md`,
    },
    content: "<p>Another Product</p>",
  },
];

const authorItems = [all[2], all[3]];
const authors: Author[] = [
  {
    date: all[2].data.date,
    title: all[2].data.title,
    slug: all[2].page.fileSlug,
    url: all[2].page.url,
    resourceType: all[2].data.resourceType as string,
    label: all[2].data.label as string,
    linkedResources: [],
    thumbnail: all[2].data.thumbnail as string,
  },
  {
    date: all[3].data.date,
    title: all[3].data.title,
    slug: all[3].page.fileSlug,
    url: all[3].page.url,
    resourceType: all[3].data.resourceType as string,
    label: all[3].data.label as string,
    linkedResources: [],
    thumbnail: all[3].data.thumbnail as string,
  },
];

const technologyItems = [all[4], all[5]];
const technologies = await Promise.all(
  technologyItems.map((ref) => getTechnology(ref.data, ref.page))
);

const topicItems = [all[6], all[7]];
const topics = await Promise.all(
  topicItems.map(async (ref) => await getTopic(ref.data, ref.page))
);

const productItems = [all[8], all[9]];
const products = await Promise.all(
  productItems.map(async (ref) => await getProduct(ref.data, ref.page))
);

const tipItems = [all[0], all[1]];
const tips = await Promise.all(
  tipItems.map(async (ref) => await getTip(ref.data, ref.page))
);

const allResources: ResourceCollection = new Map();
[...tips].forEach((resource) => allResources.set(resource.url, resource));

const allReferences: ReferenceCollection = new Map();
[...authors, ...products, ...technologies, ...topics].forEach((reference) =>
  allReferences.set(reference.label, reference)
);

// Make duplicates as resolved collections
const clonedCollectionItems = structuredClone(all);
const resolvedCollections = await resolveAllCollections({
  allCollectionItems: clonedCollectionItems,
  resourceCollections,
  referenceCollections,
});
const collections: SiteCollections = {
  all,
  allResources,
  allReferences,
};

const addTestCase = vi.fn();
const getResources = vi.fn();
const getReferences = vi.fn();
const context: RenderContext = {
  addTestCase,
  getResources,
  getReferences,
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
  resolvedCollections: resolvedCollections,
};
export default fixtures;
