import { Resource } from "./resources/ResourceModels";
import { TipResource } from "./resources/tip/TipModels";
import { AuthorReference } from "./references/author/AuthorModels";
import { TechnologyReference } from "./references/technology/TechnologyModels";

export type EleventyPage = {
  // The common, page-oriented data 11ty passes in when it reads a Markdown file
  // https://www.11ty.dev/docs/data-eleventy-supplied/#page-variable
  inputPath?: string;
  fileSlug: string;
  filePathStem?: string;
  outputFileExtension?: string;
  url?: string;
};

export type EleventyCollectionItem = {
  // The combination of page, data, and content for
  // each item in a collection, when 11ty's API provides them
  page: EleventyPage;
  data: Resource;
  content: string;
};

export type Collections = {
  tipResources: { [key: string]: TipResource };
  authorReferences: { [key: string]: AuthorReference };
  technologyReferences: { [key: string]: TechnologyReference };
};
