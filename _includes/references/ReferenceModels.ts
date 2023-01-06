import { Static, Type } from "@sinclair/typebox";
import { getResource, Resource } from "../resources/ResourceModels";
import { EleventyPage } from "../models";

export const Reference = Type.Intersect([
  Resource,
  Type.Object({
    label: Type.String(),
    resources: Type.Array(Resource),
    referenceResources: Type.Array(Resource),
  }),
]);
export type Reference = Static<typeof Reference>;

export function getReference(data: any, page: EleventyPage): Reference {
  // Use frontmatter label, or infer from the parent directory
  const label = data.label ? data.label : page.fileSlug;
  const resources: Resource[] = [];
  const referenceResources: Resource[] = [];
  return {
    ...getResource(data, page),
    label,
    resources,
    referenceResources,
  };
}
