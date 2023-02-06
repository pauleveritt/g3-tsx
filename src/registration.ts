/**
 * Content registration in a site
 */
import { EleventyCollectionItem, EleventyData, EleventyPage } from "./models";
import { UserConfig } from "@11ty/eleventy";
import { Reference } from "./ReferenceModels";
import { BaseResource } from "./ResourceModels";

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

export async function addCollection({
  resourceTypeConfig: { collectionName, attributeKey, suffix, factory },
  eleventyConfig,
}: AddCollectionProps) {
  eleventyConfig.addCollection(
    `${collectionName}${suffix}`,
    async function (collectionApi: CollectionApi) {
      const collectionItems = collectionApi
        .getAll()
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
      return results;
    }
  );
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

export type GetReferencesProps = {
  collectionItems: EleventyCollectionItem[];
  factory(data: EleventyData, page: EleventyPage): Promise<any>;
};

export async function getReferences({
  collectionItems,
  factory,
}: GetReferencesProps) {
  const results: { [index: string]: Reference } = {};
  for (const item of collectionItems) {
    const thisReference = await factory(item.data, item.page);
    results[thisReference.label] = thisReference;
  }
  return results;
}
