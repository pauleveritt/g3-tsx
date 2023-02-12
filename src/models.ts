import { Static, Type } from "@sinclair/typebox";
import { Assertions } from "./TestCases";
import { BaseFrontmatter, Resource } from "./ResourceModels";
import { ReferenceFrontmatter } from "./ReferenceModels";

export const EleventyPage = Type.Object({
  // The common, page-oriented data 11ty passes in when it reads a Markdown file
  // https://www.11ty.dev/docs/data-eleventy-supplied/#page-variable
  fileSlug: Type.String(),
  url: Type.String(),
  inputPath: Type.String(),
});
export type EleventyPage = Static<typeof EleventyPage>;

export const EleventyData = Type.Object({
  // TODO Can this go away, with frontmatter in its own schema?
  title: Type.String(),
  subtitle: Type.Optional(Type.String()),
  date: Type.Date(),
  resourceType: Type.String(),
  thumbnail: Type.Optional(Type.String()),
  label: Type.Optional(Type.String()),
  logo: Type.Optional(Type.String()),
  accent: Type.Optional(Type.String()),
  icon: Type.Optional(Type.String()),
  author: Type.Optional(Type.String()),
  technologies: Type.Optional(Type.Array(Type.String())),
  topics: Type.Optional(Type.Array(Type.String())),
  products: Type.Optional(Type.Array(Type.String())),
  tutorialItems: Type.Optional(Type.Array(Type.String())),
});
export type EleventyData = Static<typeof EleventyData>;

export const EleventyCollectionItem = Type.Object({
  // The combination of page, data, and content for
  // each item in a collection, when 11ty's API provides them
  page: EleventyPage,
  data: BaseFrontmatter,
  content: Type.String(),
});
export type EleventyCollectionItem = Static<typeof EleventyCollectionItem>;

export type Collections = {
  all: EleventyCollectionItem[];
};

export interface RenderContext {
  /**
   * Used by view renders to grab the `this` object
   */
  addTestCase(url: string, assertions: Assertions): void;
  getResources(resourceType?: string): Resource[];
  getReferences(resourceType?: string): ReferenceFrontmatter[];
}
