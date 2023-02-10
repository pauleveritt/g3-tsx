/**
 * Content registration in a site
 */
import { EleventyCollectionItem, EleventyPage } from "./models";
import { UserConfig } from "@11ty/eleventy";
import { getResourceType, Resource } from "./ResourceModels";
import { Reference } from "./ReferenceModels";

export type CollectionApi = {
  getAll(): EleventyCollectionItem[];
  getFilteredByTag(a: string): EleventyCollectionItem[];
};
export type RegisterIncludesProps = {
  eleventyConfig: UserConfig;
};

export type ResourceTypeConfig = {
  collectionName: string;
  factory(data: any, page: EleventyPage): Promise<Resource>;
};

export type ReferenceTypeConfig = {
  collectionName: string;
  factory(data: any, page: EleventyPage): Promise<Reference>;
};

export type GetAllCollectionsProps = {
  collectionApi: CollectionApi;
  resourceCollections: { [key: string]: ResourceTypeConfig };
  referenceCollections: { [key: string]: ReferenceTypeConfig };
};

export async function getAllCollections({
  collectionApi,
  resourceCollections,
  referenceCollections,
}: GetAllCollectionsProps) {
  // This what we'll return
  const allCollections: any = {};

  const allCollectionItems: EleventyCollectionItem[] = collectionApi
    .getAll()
    .filter((ci) => ci.data.resourceType);

  const allResources: Map<string, Resource> = new Map();
  const allReferences: Map<string, Reference> = new Map();

  for (const { data, page } of allCollectionItems) {
    const resourceType = getResourceType(data, page);
    try {
      if (resourceCollections[data.resourceType]) {
        const { factory } = resourceCollections[resourceType];
        const resource = await factory(data, page);
        allResources.set(page.url, resource);
      } else if (referenceCollections[data.resourceType]) {
        const { factory } = referenceCollections[resourceType];
        const reference = await factory(data, page);
        allReferences.set(reference.label, reference);
      } else {
        // TODO shouldn't get here
        console.warn(`Unregistered resource type: ${resourceType}`);
      }
    } catch (err) {
      console.error(`Failed to create resource/reference at ${page.url}`);
      throw err;
    }
  }

  allCollections.allResources = allResources;
  allCollections.allReferences = allReferences;

  // With this in place, we can de-reference resources.
  // @ts-ignore
  for (const [url, resource] of allCollections.allResources) {
    resource.references = {
      author: allCollections.allReferences.get(resource.author),
      products: [],
      technologies: [],
      topics: [],
    };
    if (resource.technologies) {
      resource.references.technologies = resource.technologies.map(
        (label: string) => allReferences.get(label)
      );
    }
    if (resource.products) {
      resource.references.products = resource.products.map((label: string) =>
        allReferences.get(label)
      );
    }
    if (resource.topics) {
      resource.references.topics = resource.topics.map((label: string) =>
        allReferences.get(label)
      );
    }
  }

  return allCollections;
}

export type ImageOptions = {
  widths: any[];
  formats: string[];
  outputDir: string;
  urlPath: string;
};
export const imageOptions: ImageOptions = {
  widths: ["auto"],
  formats: ["webp"],
  outputDir: "./public/assets/img/",
  urlPath: "/assets/img/",
};
