import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyCollectionItem, EleventyPage } from "../../models";

export const TopicReference = Type.Intersect([Reference]);
export type TopicReference = Static<typeof TopicReference>;
export type TopicCollection = { [name: string]: TopicReference };

export function getTopic(data: any, page: EleventyPage): TopicReference {
  const topic: TopicReference = {
    ...getReference(data, page, "topic`"),
  };
  validateResource(TopicReference, topic, page.url);
  return topic;
}

export async function getTopicReferences(
  collectionItems: EleventyCollectionItem[]
) {
  /* Called from eleventy.config.js to add topic collection's items */
  const results: { [index: string]: TopicReference } = {};
  collectionItems.forEach((item) => {
    const thisTopic = getTopic(item.data, item.page);
    results[thisTopic.label] = thisTopic;
  });
  return results;
}
