import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "../models";

export const Resource = Type.Object({
  id: Type.String(),
  title: Type.String(),
  slug: Type.String(),
  date: Type.Optional(Type.Date()),
  subtitle: Type.Optional(Type.String()),
  body: Type.Optional(Type.String()),
  excerpt: Type.Optional(Type.String()),
  resourceType: Type.String(),
});

export type Resource = Static<typeof Resource>;

export function getResource(data: any, page: EleventyPage): Resource {
  return {
    id: data.url,
    title: data.title,
    slug: page.fileSlug,
    date: data.date,
    subtitle: data.subtitle,
    body: data.content,
    excerpt: data.excerpt,
    resourceType: data.resourceType,
  };
}
