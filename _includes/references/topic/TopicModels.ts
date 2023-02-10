import { getReference, Reference } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { EleventyPage } from "../../../src/models";

export const Topic = Type.Intersect([
  Reference,
  Type.Object({
    accent: Type.String(),
    icon: Type.String(),
  }),
]);
export type Topic = Static<typeof Topic>;

export async function getTopic(data: any, page: EleventyPage): Promise<Topic> {
  const topic: Topic = {
    ...getReference(data, page, "topic"),
    accent: data.accent,
    icon: data.icon,
  };
  validateResource(Topic, topic, page.url);
  return topic;
}
