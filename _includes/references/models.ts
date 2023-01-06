import { Type } from "@sinclair/typebox";
import { Resource } from "../resources/models";

export const Reference = Type.Intersect([
  Resource,
  Type.Object({
    label: Type.String(),
    resources: Type.Array(Resource),
    referenceResources: Type.Array(Resource),
  }),
]);
