import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "./models";
import path from "path";
import { Reference } from "./ReferenceModels";

export const BaseFrontmatter = Type.Object({
  title: Type.String(),
  resourceType: Type.String(),
});
export type BaseFrontmatter = Static<typeof BaseFrontmatter>;
export const BaseEntity = Type.Intersect([
  BaseFrontmatter,
  Type.Object({
    slug: Type.String(),
    url: Type.String(),
    body: Type.Optional(Type.String()),
  }),
]);
export type BaseEntity = Static<typeof BaseEntity>;
export const References = Type.Object({
  author: BaseEntity,
  products: Type.Array(BaseEntity),
  technologies: Type.Array(BaseEntity),
  topics: Type.Array(BaseEntity),
});
export type References = Static<typeof References>;

export const ResourceFrontmatter = Type.Intersect([
  BaseFrontmatter,
  Type.Object({
    author: Type.String(),
    date: Type.Date(),
    products: Type.Optional(Type.Array(Type.String())),
    subtitle: Type.Optional(Type.String()),
    technologies: Type.Optional(Type.Array(Type.String())),
    thumbnail: Type.String(),
    topics: Type.Optional(Type.Array(Type.String())),
  }),
]);
export type ResourceFrontmatter = Static<typeof ResourceFrontmatter>;
export const Resource = Type.Intersect([
  ResourceFrontmatter,
  BaseEntity,
  Type.Object({
    references: Type.Optional(References),
  }),
]);
export type Resource = Static<typeof Resource>;
export type ResourceCollection = Map<string, Resource>;
export type ReferenceCollection = Map<string, Reference>;

export function getBaseResource(
  data: any,
  page: EleventyPage,
  resourceType: string
): BaseEntity {
  return {
    body: data.content,
    resourceType,
    slug: page.fileSlug,
    title: data.title,
    url: page.url,
  };
}

export function getResource(
  data: any,
  page: EleventyPage,
  resourceType: string
): Resource {
  // we know we have a thumbnail, fix it to the correct path
  const dirname = path.dirname(page.inputPath);
  const thumbnail = path.join(dirname, data.thumbnail);

  return {
    author: data.author,
    body: data.content,
    date: data.date,
    products: data.products,
    resourceType,
    slug: page.fileSlug,
    subtitle: data.subtitle,
    technologies: data.technologies,
    thumbnail,
    title: data.title,
    topics: data.topics,
    url: page.url,
  };
}

export function getResourceType(data: any, page: EleventyPage): string {
  /* Determine the resource type based on some policies */
  if (data.resourceType) {
    return data.resourceType;
  }

  // The data cascade should return a resourceType
  try {
    return data.resourceType;
  } catch (e) {
    const msg = `Page at "${page.url} does not have a resourceType`;
    throw new Error(msg);
  }
}
