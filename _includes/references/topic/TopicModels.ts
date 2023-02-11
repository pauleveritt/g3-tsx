import {
  getReference,
  Reference,
  ReferenceFrontmatter,
} from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateFrontmatter } from "../../../src/validators";
import { EleventyPage } from "../../../src/models";

export const TopicFrontmatter = Type.Intersect([
  ReferenceFrontmatter,
  Type.Object({
    accent: Type.String(),
    icon: Type.String(),
  }),
]);
export type TopicFrontmatter = Static<typeof TopicFrontmatter>;

export type Topic = {} & TopicFrontmatter & Reference;

export async function getTopic(data: any, page: EleventyPage): Promise<Topic> {
  const topic: Topic = {
    ...getReference(data, page, "topic"),
    accent: data.accent,
    icon: data.icon,
  };
  validateFrontmatter(TopicFrontmatter, topic, page.url);
  return topic;
}
