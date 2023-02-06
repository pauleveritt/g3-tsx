/**
 * Content registration in a site
 */
import { EleventyCollectionItem, EleventyPage } from "./models";
import { UserConfig } from "@11ty/eleventy";
import { BaseResource, getResource, getResourceType } from "./ResourceModels";

export type CollectionApi = {
  getAll(): EleventyCollectionItem[];
  getFilteredByTag(a: string): EleventyCollectionItem[];
};
export type RegisterIncludesProps = {
  eleventyConfig: UserConfig;
};

export type ResourceTypeConfig = {
  collectionName: string;
  suffix: string;
  attributeKey: string; // Which attribute to use as Map key
  factory(data: any, page: EleventyPage): Promise<BaseResource>;
};

export type AddCollectionProps = {
  resourceTypeConfig: ResourceTypeConfig;
  eleventyConfig: UserConfig;
};

export type GetAllCollectionsProps = {
  collectionApi: CollectionApi;
  newCollections: ResourceTypeConfig[];
};

export async function getAllCollections({
  collectionApi,
  newCollections,
}: GetAllCollectionsProps) {
  // This what we'll return
  const allCollections: any = {};

  const allCollectionItems = collectionApi.getAll();
  const allResourceItems = allCollectionItems.filter(
    (ci) => "author" in ci.data
  );
  const allResources: Map<string, BaseResource> = new Map();
  for (const { data, page } of allResourceItems) {
    const resourceType = getResourceType(data, page);
    const thisResource: BaseResource = getResource(data, page, resourceType);
    // @ts-ignore
    const thisKey = thisResource.url;
    allResources.set(thisKey, thisResource);
  }
  allCollections.allResources = allResources;

  // Let's now add the reference collections
  for (const collection of newCollections) {
    const { collectionName, attributeKey, suffix, factory } = collection;
    const collectionItems = allCollectionItems
      .filter((ci) => ci.data.resourceType === collectionName)
      .sort((a, b) =>
        a.data.title.toLowerCase() < b.data.title.toLowerCase() ? -1 : 1
      );
    const results: Map<string, BaseResource> = new Map();
    for (const { data, page } of collectionItems) {
      const thisResource: BaseResource = await factory(data, page);
      // @ts-ignore
      const thisKey = thisResource[attributeKey];
      results.set(thisKey, thisResource);
    }
    const thisKey = `${collectionName}${suffix}`;
    allCollections[thisKey] = results;
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
