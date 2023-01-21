import h from "vhtml";
import { TipResource } from "./resources/tip/TipModels";
import { AuthorReference } from "./references/author/AuthorModels";
import { Collections } from "./models";

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
    title: "Some Title",
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
const collections: Collections = {
  tipResources: { "some-tip": tips[0], "another-tip": tips[1] },
  authorReferences: { sa: authors[0], aa: authors[1] },
};

// Now assemble for export
const fixtures = { authors, children, collections, content, tips };
export default fixtures;
