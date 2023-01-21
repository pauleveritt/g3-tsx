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
    slug: "some-author",
    resourceType: "author",
    label: "sa",
    resources: [],
    referenceResources: [],
  },
  {
    title: "Another Author",
    slug: "another-author",
    resourceType: "author",
    label: "aa",
    resources: [],
    referenceResources: [],
  },
];
const technologies: TechnologyReference[] = [
  {
    title: "Some Technology",
    slug: "some-technology",
    resourceType: "technology",
    label: "st",
    resources: [],
    referenceResources: [],
  },
  {
    title: "Another Technology",
    slug: "another-technology",
    resourceType: "technology",
    label: "at",
    resources: [],
    referenceResources: [],
  },
];
const topics: TopicReference[] = [
  {
    title: "Some Topic",
    slug: "some-topic",
    resourceType: "topic",
    label: "st",
    resources: [],
    referenceResources: [],
  },
  {
    title: "Another Topic",
    slug: "another-topic",
    resourceType: "topic",
    label: "at",
    resources: [],
    referenceResources: [],
  },
];
const collections: Collections = {
  tipResources: { "some-tip": tips[0], "another-tip": tips[1] },
  authorReferences: { sa: authors[0], aa: authors[1] },
  technologyReferences: { st: technologies[0], at: technologies[1] },
  topicReferences: { st: topics[0], at: topics[1] },
};

// Now assemble for export
const fixtures = { authors, children, collections, content, tips };
export default fixtures;
