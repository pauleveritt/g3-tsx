import { Static, Type } from "@sinclair/typebox";
import { BaseEntity, getBaseResource, Resource } from "./ResourceModels";
import { EleventyPage } from "./models";

export const Reference = Type.Intersect([
  BaseEntity,
  Type.Object({
    label: Type.String(),
    resources: Type.Array(Resource),
    linkedResources: Type.Array(Resource),
  }),
]);
export type Reference = Static<typeof Reference>;

export function getReference(
  data: any,
  page: EleventyPage,
  resourceType: string
): Reference {
  // Use frontmatter label, or infer from the parent directory
  const label = data.label ? data.label : page.fileSlug;
  const resources: Resource[] = [];
  const linkedResources: Resource[] = [];
  return {
    ...getBaseResource(data, page, resourceType),
    label,
    resources,
    linkedResources,
  };
}
