import { TipCollection } from "./resources/tip/TipModels";
import { AuthorCollection } from "./references/author/AuthorModels";
import { TechnologyCollection } from "./references/technology/TechnologyModels";
import { TopicCollection } from "./references/topic/TopicModels";
import { Static, Type } from "@sinclair/typebox";
import { ProductCollection } from "./references/product/ProductModels";

export const EleventyPage = Type.Object({
  // The common, page-oriented data 11ty passes in when it reads a Markdown file
  // https://www.11ty.dev/docs/data-eleventy-supplied/#page-variable
  fileSlug: Type.String(),
  url: Type.String(),
  inputPath: Type.String(),
});
export type EleventyPage = Static<typeof EleventyPage>;

export const EleventyData = Type.Object({
  // Some stuff from resource, but not all, and you can't really
  // count on it. Just a pile of stuff.
  title: Type.String(),
  subtitle: Type.Optional(Type.String()),
  date: Type.Date(),
  resourceType: Type.Optional(Type.String()),
  thumbnail: Type.Optional(Type.String()),
  label: Type.Optional(Type.String()),
  logo: Type.Optional(Type.String()),
  author: Type.Optional(Type.String()),
  technologies: Type.Optional(Type.Array(Type.String())),
  topics: Type.Optional(Type.Array(Type.String())),
  products: Type.Optional(Type.Array(Type.String())),
});
export type EleventyData = Static<typeof EleventyData>;

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
  tip: EleventyCollectionItem[];
  author: EleventyCollectionItem[];
  technology: EleventyCollectionItem[];
  topic: EleventyCollectionItem[];
  product: EleventyCollectionItem[];
  tipResources: TipCollection;
  authorReferences: AuthorCollection;
  technologyReferences: TechnologyCollection;
  topicReferences: TopicCollection;
  productReferences: ProductCollection;
};
