import h from "vhtml";
import { Tip, TipData, TipFrontmatter } from "./resources/tip/TipModels";
import {
  Author,
  AuthorData,
  AuthorFrontmatter,
} from "./references/author/AuthorModels";
import { SiteCollections } from "./models";
import {
  Technology,
  TechnologyData,
  TechnologyFrontmatter,
} from "./references/technology/TechnologyModels";
import {
  Topic,
  TopicData,
  TopicFrontmatter,
} from "./references/topic/TopicModels";
import {
  Product,
  ProductData,
  ProductFrontmatter,
} from "./references/product/ProductModels";
import { referenceCollections, resourceCollections, rootPath } from "./config";
import { vi } from "vitest";
import { EleventyPage, RenderContext } from "../src/models";
import {
  BaseItem,
  ReferenceCollection,
  ResourceCollection,
} from "../src/ResourceModels";
import { resolveAllCollections } from "../src/registration";
import {
  Tutorial,
  TutorialData,
  TutorialFrontmatter,
} from "./resources/tutorial/TutorialModels";
import {
  TutorialStep,
  TutorialStepData,
  TutorialStepFrontmatter,
} from "./resources/tutorialstep/TutorialStepModels";

/**
 * Reusable test data``
 */
const content = `<p>Hello <em id="world">world</em>.</p>`;
const children: string[] = [
  h("", {
    dangerouslySetInnerHTML: { __html: content },
  }),
];

const tipFrontmatters: TipFrontmatter[] = [
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
    thumbnail: "aa.png",
  },
];
// This is data shaped like the collection API sends it: data/page/content.
const tipItems: {
  content: string;
  data: TipFrontmatter;
  page: EleventyPage;
}[] = [
  {
    content,
    data: { ...tipFrontmatters[0] },
    page: {
      fileSlug: "some-tip",
      url: "/tips/some-tip/",
      inputPath: `${rootPath}/tips/some-tip/index.md`,
    },
  },
  {
    content,
    data: { ...tipFrontmatters[1] },
    page: {
      fileSlug: "another-tip",
      url: "/tips/another-tip/",
      inputPath: `${rootPath}/tips/another-tip/index.md`,
    },
  },
];
// This is data shaped like on our side.
const tipDatas: { data: TipData; page: EleventyPage }[] = [
  {
    data: { ...tipItems[0].data, content: tipItems[0].content },
    page: tipItems[0].page,
  },
  {
    data: { ...tipItems[1].data, content: tipItems[1].content },
    page: tipItems[1].page,
  },
];

const authorsFrontmatters: AuthorFrontmatter[] = [
  {
    title: "Some Author",
    resourceType: "author",
    label: "sa",
    thumbnail: "sa.png",
  },
  {
    title: "Another Author",
    resourceType: "author",
    label: "aa",
    thumbnail: "aa.png",
  },
];
// This is data shaped like the collection API sends it: data/page/content.
const authorItems: {
  content: string;
  data: AuthorFrontmatter;
  page: EleventyPage;
}[] = [
  {
    content,
    data: { ...authorsFrontmatters[0] },
    page: {
      fileSlug: "sa",
      url: "/authors/sa/",
      inputPath: `${rootPath}/authors/sa/index.md`,
    },
  },
  {
    content,
    data: { ...authorsFrontmatters[1] },
    page: {
      fileSlug: "aa",
      url: "/authors/aa/",
      inputPath: "./sites/webstorm-guide/authors/aa/index.md",
    },
  },
];
// This is data shaped like on our side.
const authorDatas: { data: AuthorData; page: EleventyPage }[] = [
  {
    data: { ...authorItems[0].data, content: authorItems[0].content },
    page: authorItems[0].page,
  },
  {
    data: { ...authorItems[1].data, content: authorItems[1].content },
    page: authorItems[1].page,
  },
];

const technologyFrontmatters: TechnologyFrontmatter[] = [
  {
    title: "Some Technology",
    resourceType: "technology",
    label: "st",
    logo: "stlogo.svg",
  },
  {
    title: "Another Technology",
    resourceType: "technology",
    label: "at",
    logo: "atlogo.svg",
  },
];
// This is data shaped like the collection API sends it: data/page/content.
const technologyItems: {
  content: string;
  data: TechnologyFrontmatter;
  page: EleventyPage;
}[] = [
  {
    content,
    data: { ...technologyFrontmatters[0] },
    page: {
      fileSlug: "st",
      url: "/technologies/st/",
      inputPath: `${rootPath}/technologies/st/index.md`,
    },
  },
  {
    content,
    data: { ...technologyFrontmatters[1] },
    page: {
      fileSlug: "at",
      url: "/technologies/at/",
      inputPath: `${rootPath}/technologies/at/index.md`,
    },
  },
];
// This is data shaped like on our side.
const technologyDatas: { data: TechnologyData; page: EleventyPage }[] = [
  {
    data: { ...technologyItems[0].data, content: technologyItems[0].content },
    page: technologyItems[0].page,
  },
  {
    data: { ...technologyItems[1].data, content: technologyItems[1].content },
    page: technologyItems[1].page,
  },
];

const topicFrontmatters: TopicFrontmatter[] = [
  {
    title: "Some Topic",
    resourceType: "topic",
    label: "st",
    accent: "st-accent",
    icon: "st-icon.png",
  },
  {
    title: "Another Topic",
    resourceType: "topic",
    label: "at",
    accent: "at-accent",
    icon: "at-icon.png",
  },
];
// This is data shaped like the collection API sends it: data/page/content.
const topicItems: {
  content: string;
  data: TopicFrontmatter;
  page: EleventyPage;
}[] = [
  {
    content,
    data: { ...topicFrontmatters[0] },
    page: {
      fileSlug: "at",
      url: "/topics/at/",
      inputPath: `${rootPath}/topics/at/index.md`,
    },
  },
  {
    content,
    data: { ...topicFrontmatters[1] },
    page: {
      fileSlug: "sp",
      url: "/products/sp/",
      inputPath: `${rootPath}/products/sp/index.md`,
    },
  },
];
// This is data shaped like on our side.
const topicDatas: { data: TopicData; page: EleventyPage }[] = [
  {
    data: { ...topicItems[0].data, content: topicItems[0].content },
    page: topicItems[0].page,
  },
  {
    data: { ...topicItems[1].data, content: topicItems[1].content },
    page: topicItems[1].page,
  },
];

const productFrontmatters: ProductFrontmatter[] = [
  {
    title: "Some Product",
    resourceType: "product",
    label: "sp",
    logo: "some.png",
  },
  {
    title: "Another Product",
    resourceType: "product",
    label: "ap",
    logo: "another.png",
  },
];

// This is data shaped like the collection API sends it: data/page/content.
const productItems: {
  content: string;
  data: ProductFrontmatter;
  page: EleventyPage;
}[] = [
  {
    content,
    data: { ...productFrontmatters[0] },
    page: {
      fileSlug: "sp",
      url: "/products/sp/",
      inputPath: `${rootPath}/products/sp/index.md`,
    },
  },
  {
    content,
    data: { ...productFrontmatters[1] },
    page: {
      fileSlug: "ap",
      url: "/topics/ap/",
      inputPath: `${rootPath}/topics/ap/index.md`,
    },
  },
];
// This is data shaped like on our side.
const productDatas: { data: ProductData; page: EleventyPage }[] = [
  {
    data: { ...productItems[0].data, content: productItems[0].content },
    page: productItems[0].page,
  },
  {
    data: { ...productItems[1].data, content: productItems[1].content },
    page: productItems[1].page,
  },
];

export const tutorialFrontmatters: TutorialFrontmatter[] = [
  {
    title: "Some Tutorial",
    resourceType: "tutorial",
    author: "sa",
    date: new Date("2023-02-02"),
    thumbnail: "thumbnail.png",
    tutorialItems: ["./some-tutorialstep", "./another-tutorialstep"],
  },
  {
    title: "Another Tutorial",
    resourceType: "tutorial",
    author: "sa",
    date: new Date("2023-02-02"),
    thumbnail: "thumbnail.png",
    tutorialItems: [],
  },
];

export const tutorialItems: {
  content: string;
  data: TutorialFrontmatter;
  page: EleventyPage;
}[] = [
  {
    content,
    data: { ...tutorialFrontmatters[0] },
    page: {
      fileSlug: "some-tutorial",
      url: "/tutorials/some-tutorial/",
      inputPath: `${rootPath}/tutorials/some-tutorial/index.md`,
    },
  },
  {
    content,
    data: { ...tutorialFrontmatters[1] },
    page: {
      fileSlug: "another-tutorial",
      url: "/tutorials/another-tutorial/",
      inputPath: `${rootPath}/tutorials/another-tutorial/index.md`,
    },
  },
];

export const tutorialDatas: { data: TutorialData; page: EleventyPage }[] = [
  {
    data: { ...tutorialItems[0].data, content: tutorialItems[0].content },
    page: tutorialItems[0].page,
  },
  {
    data: { ...tutorialItems[1].data, content: tutorialItems[1].content },
    page: tutorialItems[1].page,
  },
];

export const tutorialStepFrontmatters: TutorialStepFrontmatter[] = [
  {
    title: "Some Tutorial Step",
    resourceType: "tutorialstep",
    author: "sa",
    date: new Date("2023-02-02"),
    thumbnail: "thumbnail.png",
  },
  {
    title: "Another Tutorial Step",
    resourceType: "tutorialstep",
    author: "sa",
    date: new Date("2023-02-02"),
    thumbnail: "thumbnail.png",
  },
];

export const tutorialStepItems: {
  content: string;
  data: TutorialStepFrontmatter;
  page: EleventyPage;
}[] = [
  {
    content,
    data: { ...tutorialStepFrontmatters[0] },
    page: {
      fileSlug: "some-tutorialstep",
      url: "/tutorials/some-tutorial/some-tutorialstep/",
      inputPath: `${rootPath}/tutorials/some-tutorial/some-tutorialstep/index.md`,
    },
  },
  {
    content,
    data: { ...tutorialStepFrontmatters[1] },
    page: {
      fileSlug: "another-tutorialstep",
      url: "/tutorials/some-tutorial/another-tutorialstep/",
      inputPath: `${rootPath}/tutorials/some-tutorial/another-tutorialstep/index.md`,
    },
  },
];
export const tutorialStepDatas: {
  data: TutorialStepData;
  page: EleventyPage;
}[] = [
  {
    data: {
      ...tutorialStepItems[0].data,
      content: tutorialStepItems[0].content,
    },
    page: tutorialStepItems[0].page,
  },
  {
    data: {
      ...tutorialStepItems[1].data,
      content: tutorialStepItems[1].content,
    },
    page: tutorialStepItems[1].page,
  },
];

// This data structure matches collections.all
// https://www.11ty.dev/docs/collections/#collection-item-data-structure
const all: BaseItem[] = [
  ...tipItems,
  ...tutorialItems,
  ...tutorialStepItems,
  ...authorItems,
  ...productItems,
  ...technologyItems,
  ...topicItems,
];

const authors = await Promise.all(
  authorDatas.map(
    async (ref) => await new Author({ data: ref.data, page: ref.page }).init()
  )
);

const technologies = await Promise.all(
  technologyDatas.map(
    async (ref) =>
      await new Technology({ data: ref.data, page: ref.page }).init()
  )
);

const topics = await Promise.all(
  topicDatas.map(
    async (ref) => await new Topic({ data: ref.data, page: ref.page }).init()
  )
);

const products = await Promise.all(
  productDatas.map(
    async (ref) => await new Product({ data: ref.data, page: ref.page }).init()
  )
);

const tips = await Promise.all(
  tipDatas.map(
    async (ref) => await new Tip({ data: ref.data, page: ref.page }).init()
  )
);

const tutorials = await Promise.all(
  tutorialDatas.map(
    async (ref) => await new Tutorial({ data: ref.data, page: ref.page }).init()
  )
);

const tutorialSteps = await Promise.all(
  tutorialStepDatas.map(
    async (ref) =>
      await new TutorialStep({ data: ref.data, page: ref.page }).init()
  )
);

const allResources: ResourceCollection = new Map();
[...tips, ...tutorials, ...tutorialSteps].forEach((resource) =>
  allResources.set(resource.url, resource)
);

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
  tutorials,
  tutorialItems,
  tutorialSteps,
  tutorialStepItems,
  all,
  context,
  resolvedCollections: resolvedCollections,
};
export default fixtures;
