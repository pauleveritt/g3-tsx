import {
  BaseEntity,
  BaseFrontmatter,
  getBaseResource,
  Resource,
} from "./ResourceModels";
import { EleventyPage } from "./models";
import { Static, Type } from "@sinclair/typebox";

export const ReferenceFrontmatter = Type.Intersect([
  BaseFrontmatter,
  Type.Object({
    label: Type.String(),
    subtitle: Type.Optional(Type.String()),
  }),
]);
export type ReferenceFrontmatter = Static<typeof ReferenceFrontmatter>;

export type Reference = {
  linkedResources: Resource[];
} & ReferenceFrontmatter &
  BaseEntity;

export function getReference(
  data: any,
  page: EleventyPage,
  resourceType: string
): Reference {
  // Use frontmatter label, or infer from the filename
  const label = data.label ? data.label : page.fileSlug;
  const linkedResources: Resource[] = [];
  return {
    ...getBaseResource(data, page, resourceType),
    label,
    linkedResources,
  };
}
