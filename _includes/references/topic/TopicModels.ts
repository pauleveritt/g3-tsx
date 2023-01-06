import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";

export const TopicReference = Type.Intersect([Reference]);
export type TopicReference = Static<typeof TopicReference>;

export function getTopic(data: any): TopicReference {
  const topic: TopicReference = {
    ...getReference(data),
  };
  validateResource(TopicReference, topic);
  return topic;
}
