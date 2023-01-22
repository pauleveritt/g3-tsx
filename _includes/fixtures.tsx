import h from "vhtml";
import { TipResource } from "./resources/tip/TipModels";
import { AuthorReference } from "./references/author/AuthorModels";
import { Collections } from "./models";
import { TechnologyReference } from "./references/technology/TechnologyModels";
import { TopicReference } from "./references/topic/TopicModels";

/**
 * Reusable test data
 */
const content = `<p>Hello <em id="world">world</em>.</p>`;
const children: string[] = [
  h("", {
    dangerouslySetInnerHTML: { __html: content },
  }),
];

const tips: TipResource[] = [
  {
    title: "Some Tip",
    slug: "some-tip",
    resourceType: "tip",
    author: "sa",
  },
  {
    title: "Another Title",
    slug: "another-tip",
    resourceType: "tip",
    author: "aa",
  },
];
const authors: AuthorReference[] = [
  {
    title: "Some Author",
    slug: "sa",
    resourceType: "author",
    label: "sa",
    resources: [],
    referenceResources: [],
  },
  {
    title: "Another Author",
    slug: "aa",
    resourceType: "author",
    label: "aa",
    resources: [],
    referenceResources: [],
  },
];
const technologies: TechnologyReference[] = [
  {
    title: "Some Technology",
    slug: "st",
    resourceType: "technology",
    label: "st",
    resources: [],
    referenceResources: [],
  },
  {
    title: "Another Technology",
    slug: "at",
    resourceType: "technology",
    label: "at",
    resources: [],
    referenceResources: [],
  },
];
const topics: TopicReference[] = [
  {
    title: "Some Topic",
    slug: "st",
    resourceType: "topic",
    label: "st",
    resources: [],
    referenceResources: [],
  },
  {
    title: "Another Topic",
    slug: "at",
    resourceType: "topic",
    label: "at",
    resources: [],
    referenceResources: [],
  },
];
const collections: Collections = {
  all: [...tips, ...authors, ...technologies, ...topics],
  tipResources: { "some-tip": tips[0], "another-tip": tips[1] },
  authorReferences: { sa: authors[0], aa: authors[1] },
  technologyReferences: { st: technologies[0], at: technologies[1] },
  topicReferences: { st: topics[0], at: topics[1] },
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
};
export default fixtures;
