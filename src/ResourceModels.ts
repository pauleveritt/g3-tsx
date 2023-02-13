import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "./models";
import path from "path";
import { ReferenceFrontmatter } from "./ReferenceModels";
import { imageOptions } from "./registration";
// @ts-ignore
import Image from "@11ty/eleventy-img";
import { validateFrontmatter } from "./validators";

export const BaseFrontmatter = Type.Object({
  resourceType: Type.String(),
  title: Type.String(),
});
export type BaseFrontmatter = Static<typeof BaseFrontmatter>;

// On our side, content is stored on the data. But in the collection
// API, content comes in with data/page/content.
export type BaseData = {
  content: string;
} & BaseFrontmatter;
export type BaseItem = {
  content: string;
  data: BaseFrontmatter;
  page: EleventyPage;
};

export class BaseEntity implements BaseFrontmatter {
  content: string;
  resourceType: string;
  slug: string;
  title: string;
  url: string;
  static frontmatterSchema = BaseFrontmatter;

  constructor({ data, page }: { data: BaseData; page: EleventyPage }) {
    this.content = data.content;
    this.resourceType = data.resourceType;
    this.slug = page.fileSlug;
    this.title = data.title;
    this.url = page.url;

    // @ts-ignore
    const frontmatter = this.constructor.frontmatterSchema;
    validateFrontmatter(frontmatter, data, page.url);
  }

  async init(): Promise<this> {
    if ("thumbnail" in this) {
      await Image(this.thumbnail, imageOptions);
    }
    return this;
  }
}

// TODO Get rid of slug in models if it isn't used

export type References = {
  // TODO Move this to ReferenceModels
  author: BaseEntity; // TODO Have BaseRefs over here, Refs over there
  products: BaseEntity[];
  technologies: BaseEntity[];
  topics: BaseEntity[];
};

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

export type ResourceData = ResourceFrontmatter & BaseData;

export class Resource extends BaseEntity implements ResourceFrontmatter {
  author: string;
  date: Date;
  products?: string[];
  subtitle?: string;
  technologies?: string[];
  thumbnail: string;
  topics?: string[];
  references?: References;
  static frontmatterSchema = ResourceFrontmatter;

  // TODO Add in references
  constructor({ data, page }: { data: ResourceData; page: EleventyPage }) {
    super({ data, page });
    this.author = data.author;
    this.date = new Date(data.date);
    this.products = data.products;
    this.subtitle = data.subtitle;
    this.technologies = data.technologies;
    this.thumbnail = path.join(path.dirname(page.inputPath), data.thumbnail);
    this.topics = data.topics;
  }

  async init(): Promise<this> {
    await Image(this.thumbnail, imageOptions);
    return this;
  }
}

export type ResourceCollection = Map<string, Resource>;
export type ReferenceCollection = Map<string, ReferenceFrontmatter>;

export function getBaseResource(data: any, page: EleventyPage): BaseEntity {
  // we know we have a thumbnail, fix it to the correct path
  // TODO Clean all this up
  return new Resource({ data, page });
  //   return {
  //     body: data.content,
  //     date,
  //     resourceType,
  //     slug: page.fileSlug,
  //     title: data.title,
  //     url: page.url,
  //   };
}

// export function getResourceFrontmatter(
//   data: any,
//   page: EleventyPage
// ): Resource {
//   return new Resource({ data, page });
//   // return {
//   //   author: data.author,
//   //   body: data.content,
//   //   date: data.date,
//   //   products: data.products,
//   //   resourceType,
//   //   slug: page.fileSlug,
//   //   subtitle: data.subtitle,
//   //   technologies: data.technologies,
//   //   thumbnail,
//   //   title: data.title,
//   //   topics: data.topics,
//   //   url: page.url,
//   // };
// }

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
