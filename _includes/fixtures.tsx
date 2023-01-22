import h from "vhtml";
import { TipResource } from "./resources/tip/TipModels";
import { AuthorReference } from "./references/author/AuthorModels";
import { Collections, EleventyCollectionItem } from "./models";
import { TechnologyReference } from "./references/technology/TechnologyModels";
import { TopicReference } from "./references/topic/TopicModels";
import { ProductReference } from "./references/product/ProductModels";

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
    },
    page: {
      fileSlug: "some-tip",
      url: "/tips/some-tip/",
    },
    content: "<p>Some Tip</p>",
  },
  {
    data: {
      title: "Another Tip",
      date: new Date("2023-01-10"),
      resourceType: "tip",
      author: "aa",
    },
    page: {
      fileSlug: "another-tip",
      url: "/tips/another-tip/",
    },
    content: "<p>Another Tip</p>",
  },
  {
    data: {
      title: "Some Author",
      date: new Date("2023-01-08"),
      resourceType: "author",
      label: "sa",
    },
    page: {
      fileSlug: "sa",
      url: "/authors/sa/",
    },
    content: "<p>Some Author</p>",
  },
  {
    data: {
      title: "Another Author",
      date: new Date("2023-01-20"),
      resourceType: "author",
      label: "aa",
    },
    page: {
      fileSlug: "aa",
      url: "/authors/aa/",
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
    },
    content: "<p>Another Product</p>",
  },
];

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
const authors: AuthorReference[] = [
  {
    title: all[2].data.title,
    slug: all[2].page.fileSlug,
    url: all[2].page.url,
    resourceType: all[2].data.resourceType as string,
    label: all[2].data.label as string,
    resources: [],
    referenceResources: [],
  },
  {
    title: all[3].data.title,
    slug: all[3].page.fileSlug,
    url: all[3].page.url,
    resourceType: all[3].data.resourceType as string,
    label: all[3].data.label as string,
    resources: [],
    referenceResources: [],
  },
];
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
const tipResources: { [key: string]: TipResource } = {};
tips.forEach((tip) => (tipResources[tip.url] = tip));
const authorReferences: { [key: string]: AuthorReference } = {};

authors.forEach((author) => (authorReferences[author.label] = author));
const technologyReferences: { [key: string]: TechnologyReference } = {};
technologies.forEach(
  (technology) => (technologyReferences[technology.label] = technology)
);
const topicReferences: { [key: string]: TopicReference } = {};
topics.forEach((topic) => (topicReferences[topic.label] = topic));
const productReferences: { [key: string]: ProductReference } = {};
products.forEach((product) => (productReferences[product.label] = product));

const collections: Collections = {
  all,
  tipResources,
  authorReferences,
  technologyReferences,
  topicReferences,
  productReferences,
};

// Now assemble for export
const fixtures = {
  authors,
  children,
  collections,
  content,
  technologies,
  tips,
  topics,
  products,
};
export default fixtures;
