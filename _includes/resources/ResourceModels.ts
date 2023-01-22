import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "../models";

export const BaseResource = Type.Object({
  title: Type.String(),
  slug: Type.String(),
  url: Type.String(),
  date: Type.Optional(Type.Date()),
  subtitle: Type.Optional(Type.String()),
  body: Type.Optional(Type.String()),
  excerpt: Type.Optional(Type.String()),
  resourceType: Type.String(),
  thumbnail: Type.Optional(Type.String()),
});
export type BaseResource = Static<typeof BaseResource>;

export const Resource = Type.Intersect([
  BaseResource,
  Type.Object({
    author: Type.String(),
  }),
]);

export type Resource = Static<typeof Resource>;

export function getBaseResource(
  data: any,
  page: EleventyPage,
  resourceType: string
): BaseResource {
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
  return {
    title: data.title,
    slug: page.fileSlug,
    url: page.url,
    date: data.date,
    subtitle: data.subtitle,
    body: data.content,
    excerpt: data.excerpt,
    author: data.author,
    resourceType,
  };
}
