import { TipCollection } from "./resources/tip/TipModels";
import { AuthorCollection } from "./references/author/AuthorModels";
import { TechnologyCollection } from "./references/technology/TechnologyModels";
import { TopicCollection } from "./references/topic/TopicModels";
import { ProductCollection } from "./references/product/ProductModels";
import { Collections, EleventyCollectionItem } from "../src/models";

export type SiteCollections = {
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
} & Collections;
