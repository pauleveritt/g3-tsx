import { Reference, ReferenceFrontmatter } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateFrontmatter } from "../../../src/validators";
import { EleventyPage } from "../../../src/models";
import { BaseData } from "../../../src/ResourceModels";

export const TopicFrontmatter = Type.Intersect([
  ReferenceFrontmatter,
  Type.Object({
    accent: Type.String(),
    icon: Type.String(),
  }),
]);
export type TopicFrontmatter = Static<typeof TopicFrontmatter>;
export type TopicData = TopicFrontmatter & BaseData;

export class Topic extends Reference implements TopicFrontmatter {
  accent: string;
  icon: string;

  constructor({ data, page }: { data: TopicData; page: EleventyPage }) {
    super({ data, page });
    this.accent = data.accent;
    this.icon = data.icon;
  }
}

export async function getTopic(
  data: TopicData,
  page: EleventyPage
): Promise<Topic> {
  validateFrontmatter(TopicFrontmatter, data, page.url);
  return new Topic({ data, page });
}
