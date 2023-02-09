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
