import { getReference, Reference } from "../ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyPage } from "../../models";

export const TopicReference = Type.Intersect([Reference]);
export type TopicReference = Static<typeof TopicReference>;

export function getTopic(data: any, page: EleventyPage): TopicReference {
  const topic: TopicReference = {
    ...getReference(data, page),
  };
  validateResource(TopicReference, topic);
  return topic;
}
