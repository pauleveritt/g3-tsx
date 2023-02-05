/**
 * Content registration in a site
 */
import { EleventyCollectionItem } from "./models";
import { UserConfig } from "@11ty/eleventy";

export type CollectionApi = {
  getFilteredByTag(a: string): EleventyCollectionItem[];
};
export type RegisterIncludesProps = {
  eleventyConfig: UserConfig;
};

export type ResourceTypeConfig = {
  collectionName: string;
  suffix: string;
  factory(collection: EleventyCollectionItem[]): Promise<any>;
};

export type AddCollectionProps = {
  resourceTypeConfig: ResourceTypeConfig;
  eleventyConfig: UserConfig;
};

export async function addCollection({
  resourceTypeConfig: { collectionName, suffix, factory },
  eleventyConfig,
}: AddCollectionProps) {
  eleventyConfig.addCollection(
    `${collectionName}${suffix}`,
    async function (collectionApi: CollectionApi) {
      const resources = collectionApi.getFilteredByTag(collectionName);
      return await factory(resources);
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
