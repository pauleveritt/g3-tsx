import { Static, Type } from "@sinclair/typebox";
import { getResource, Resource } from "../resources/models";
import { basename, dirname, resolve } from "node:path";
import { sitesDir } from "../../src/validators";

export const Reference = Type.Intersect([
  Resource,
  Type.Object({
    label: Type.String(),
    resources: Type.Array(Resource),
    referenceResources: Type.Array(Resource),
  }),
]);
export type Reference = Static<typeof Reference>;

export function getReference(data: any): Reference {
  // Use frontmatter label, or infer from the parent directory
  const label = data.label ? data.label : data.fileSlug;
  const resources = [];
  const referenceResources = [];
  return {
    ...getResource(data),
    label,
    resources,
    referenceResources,
  };
}
