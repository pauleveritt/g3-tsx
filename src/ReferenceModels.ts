import { BaseData, BaseEntity, BaseFrontmatter } from "./ResourceModels";
import { EleventyPage } from "./models";
import { Static, Type } from "@sinclair/typebox";

export const ReferenceFrontmatter = Type.Intersect([
  BaseFrontmatter,
  Type.Object({
    label: Type.Optional(Type.String()), // Can be inferred from parentDir
    subtitle: Type.Optional(Type.String()),
  }),
]);
export type ReferenceFrontmatter = Static<typeof ReferenceFrontmatter>;

export type ReferenceData = ReferenceFrontmatter & BaseData;

export class Reference extends BaseEntity implements ReferenceFrontmatter {
  label: string;
  subtitle?: string;

  constructor({ data, page }: { data: ReferenceData; page: EleventyPage }) {
    super({ data, page });
    this.label = data.label ? data.label : page.fileSlug;
    this.subtitle = data.subtitle;
  }
}

// export type Reference = {
//   linkedResources: Resource[];
// } & ReferenceFrontmatter &
//   BaseEntity;

export async function getReference(
  data: any,
  page: EleventyPage
): Promise<Reference> {
  // const linkedResources: Resource[] = [];
  return new Reference({ data, page });
}

export type References = {
  // TODO Move this to ReferenceModels
  author: BaseEntity; // TODO Have BaseRefs over here, Refs over there
  products: BaseEntity[];
  technologies: BaseEntity[];
  topics: BaseEntity[];
};
