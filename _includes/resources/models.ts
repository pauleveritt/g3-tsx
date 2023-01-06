import { Type } from "@sinclair/typebox";

export const Resource = Type.Object({
  id: Type.String(),
  title: Type.String(),
  slug: Type.String(),
  date: Type.String(),
  subtitle: Type.Optional(Type.String()),
  body: Type.Optional(Type.String()),
  excerpt: Type.Optional(Type.String()),
  resourceType: Type.Optional(Type.String()),
});

// import { AuthorReference } from "../references/author/models";
// import { ProductReference } from "../references/product/models";
// import { TechnologyReference } from "../references/technology/models";
// import { TopicReference } from "../references/topic/models";

// export interface Resource {
//   //   title: string;
//   //   // author: AuthorReference;
//   //   // body: string;
//   //   // id: string;
//   //   // parent: Resource;
//   //   // slug: string;
//   //   // date: string;
//   //   // subtitle?: string;
//   //   // excerpt?: string;
//   //   // resourceType?: string;
//   //   // thumbnail: string;
//   //   // products: ProductReference[];
//   //   // technologies: TechnologyReference[];
//   //   // topics: TopicReference[];
// }

// export interface ListedResource {
//   // Data needed for listing in a resource card
//   slug: string;
//   type: string;
//   title: string;
//   subtitle?: string;
//   date: string;
//   // author: ResourceCardAuthorProps;
//   // products: ResourceCardProducts;
//   // technologies: ResourceCardTechnologies;
//   // topics: ResourceCardTopics;
//   // thumbnail: Thumbnail;
//   // resourceType?: string;
// }

// export type ListedResources = ListedResource[];
