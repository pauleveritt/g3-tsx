import { getReference, Reference } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyPage } from "../../../src/models";

export const TopicReference = Type.Intersect([Reference]);
export type TopicReference = Static<typeof TopicReference>;

export async function getTopic(
  data: any,
  page: EleventyPage
): Promise<TopicReference> {
  const topic: TopicReference = {
    ...getReference(data, page, "topic`"),
  };
  validateResource(TopicReference, topic, page.url);
  return topic;
}
