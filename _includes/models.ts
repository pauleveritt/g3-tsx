import { TipCollection } from "./resources/tip/TipModels";
import { AuthorCollection } from "./references/author/AuthorModels";
import { TechnologyCollection } from "./references/technology/TechnologyModels";
import { TopicCollection } from "./references/topic/TopicModels";
import { Static, Type } from "@sinclair/typebox";
import { ProductCollection } from "./references/product/ProductModels";

// export type EleventyPage = {
//   inputPath?: string;
//   fileSlug: string;
//   filePathStem?: string;
//   outputFileExtension?: string;
//   url?: string;
// };

export const EleventyPage = Type.Object({
  // The common, page-oriented data 11ty passes in when it reads a Markdown file
  // https://www.11ty.dev/docs/data-eleventy-supplied/#page-variable
  fileSlug: Type.String(),
  url: Type.String(),
});
export type EleventyPage = Static<typeof EleventyPage>;

// export type EleventyData = {
//   title: string;
//   subtitle?: string;
//   date: Date;
//   resourceType?: string;
//   thumbnail?: string;
//   author?: string;
//   label?: string;
// };

export const EleventyData = Type.Object({
  // Some stuff from resource, but not all, and you can't really
  // count on it. Just a pile of stuff.
  title: Type.String(),
  subtitle: Type.Optional(Type.String()),
  date: Type.Date(),
  resourceType: Type.Optional(Type.String()),
  thumbnail: Type.Optional(Type.String()),
  author: Type.Optional(Type.String()),
  label: Type.Optional(Type.String()),
  logo: Type.Optional(Type.String()),
});
export type EleventyData = Static<typeof EleventyData>;

// export type EleventyCollectionItem = {
//   page: EleventyPage;
//   data: EleventyData;
//   content: string;
// };

export const EleventyCollectionItem = Type.Object({
  // The combination of page, data, and content for
  // each item in a collection, when 11ty's API provides them
  page: EleventyPage,
  data: EleventyData,
  content: Type.String(),
});
export type EleventyCollectionItem = Static<typeof EleventyCollectionItem>;

export type Collections = {
  all: EleventyCollectionItem[];
  tipResources: TipCollection;
  authorReferences: AuthorCollection;
  technologyReferences: TechnologyCollection;
  topicReferences: TopicCollection;
  productReferences: ProductCollection;
};
