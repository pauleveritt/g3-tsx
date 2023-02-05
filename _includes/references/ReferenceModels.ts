import { Static, Type } from "@sinclair/typebox";
import {
  BaseResource,
  getBaseResource,
  Resource,
} from "../resources/ResourceModels";
import { EleventyPage } from "../../src/models";

export const Reference = Type.Intersect([
  BaseResource,
  Type.Object({
    label: Type.String(),
    resources: Type.Array(Resource),
    referenceResources: Type.Array(Resource),
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
  const referenceResources: Resource[] = [];
  return {
    ...getBaseResource(data, page, resourceType),
    label,
    resources,
    referenceResources,
  };
}
