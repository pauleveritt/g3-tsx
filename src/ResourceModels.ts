import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "./models";
import path from "path";
import { Reference } from "./ReferenceModels";

export const BaseEntity = Type.Object({
  title: Type.String(),
  slug: Type.String(),
  url: Type.String(),
  date: Type.Optional(Type.Date()),
  subtitle: Type.Optional(Type.String()),
  body: Type.Optional(Type.String()),
  excerpt: Type.Optional(Type.String()),
  resourceType: Type.String(),
});
export type BaseEntity = Static<typeof BaseEntity>;

export const References = Type.Object({
  author: BaseEntity,
  products: Type.Array(BaseEntity),
  technologies: Type.Array(BaseEntity),
  topics: Type.Array(BaseEntity),
});
export const Resource = Type.Intersect([
  BaseEntity,
  Type.Object({
    thumbnail: Type.String(),
    author: Type.String(),
    technologies: Type.Optional(Type.Array(Type.String())),
    topics: Type.Optional(Type.Array(Type.String())),
    products: Type.Optional(Type.Array(Type.String())),
    references: Type.Optional(References),
  }),
]);

export type Resource = Static<typeof Resource>;
export type ResourceCollection = Map<string, Resource>;
export type ReferenceCollection = Map<string, Reference>;
export type References = Static<typeof References>;

export function getBaseResource(
  data: any,
  page: EleventyPage,
  resourceType: string
): BaseEntity {
  return {
    title: data.title,
    slug: page.fileSlug,
    url: page.url,
    date: data.date,
    subtitle: data.subtitle,
    body: data.content,
    excerpt: data.excerpt,
    resourceType,
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
    title: data.title,
    slug: page.fileSlug,
    url: page.url,
    date: data.date,
    subtitle: data.subtitle,
    body: data.content,
    excerpt: data.excerpt,
    author: data.author,
    products: data.products,
    technologies: data.technologies,
    topics: data.topics,
    thumbnail,
    resourceType,
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
