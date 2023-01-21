import h from "vhtml";
import { TipResource } from "./resources/tip/TipModels";
import { AuthorReference } from "./references/author/AuthorModels";

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
    slug: "some-slug",
    resourceType: "tip",
    author: "some-author",
  },
];
const authors: AuthorReference[] = [
  {
    title: "Some Author",
    slug: "some-slug",
    resourceType: "author",
    label: "sa",
    resources: [],
    referenceResources: [],
  },
];
// Now assemble for export
const fixtures = { authors, children, content, tips };
export default fixtures;
