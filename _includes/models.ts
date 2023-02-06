import { TipCollection } from "./resources/tip/TipModels";
import { AuthorCollection } from "./references/author/AuthorModels";
import { TechnologyCollection } from "./references/technology/TechnologyModels";
import { TopicCollection } from "./references/topic/TopicModels";
import { ProductCollection } from "./references/product/ProductModels";
import { Collections } from "../src/models";
import { ResourceCollection } from "../src/ResourceModels";

export type SiteCollections = {
  allResources: ResourceCollection;
  tipResources: TipCollection;
  authorReferences: AuthorCollection;
  technologyReferences: TechnologyCollection;
  topicReferences: TopicCollection;
  productReferences: ProductCollection;
} & Collections;
