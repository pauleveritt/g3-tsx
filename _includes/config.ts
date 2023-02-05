import { UserConfig } from "@11ty/eleventy";
import { getTipResources } from "./resources/tip/TipModels";
import { EleventyCollectionItem } from "../src/models";
import { getAuthorReferences } from "./references/author/AuthorModels";
import { getTechnologyReferences } from "./references/technology/TechnologyModels";
import { getTopicReferences } from "./references/topic/TopicModels";
import { getProductReferences } from "./references/product/ProductModels";
import { Assertions, BuildResult, TestCases } from "../src/TestCases";

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

export const rootPath = "sites/webstorm-guide";

export type CollectionApi = {
  getFilteredByTag(a: string): EleventyCollectionItem[];
};
export type RegisterIncludesProps = {
  eleventyConfig: UserConfig;
};

export function registerIncludes({
  eleventyConfig,
}: RegisterIncludesProps): void {
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });

  eleventyConfig.addCollection(
    "tipResources",
    async function (collectionApi: CollectionApi) {
      const tips = collectionApi.getFilteredByTag("tip");
      return await getTipResources(tips);
    }
  );
  eleventyConfig.addCollection(
    "authorReferences",
    async function (collectionApi: CollectionApi) {
      const authors = collectionApi.getFilteredByTag("author");
      return await getAuthorReferences(authors);
    }
  );
  eleventyConfig.addCollection(
    "technologyReferences",
    async function (collectionApi: CollectionApi) {
      const technologies = collectionApi.getFilteredByTag("technology");
      return await getTechnologyReferences(technologies);
    }
  );
  eleventyConfig.addCollection(
    "topicReferences",
    async function (collectionApi: CollectionApi) {
      const topics = collectionApi.getFilteredByTag("topic");
      return await getTopicReferences(topics);
    }
  );
  eleventyConfig.addCollection(
    "productReferences",
    async function (collectionApi: CollectionApi) {
      const topics = collectionApi.getFilteredByTag("product");
      return await getProductReferences(topics);
    }
  );

  const testCases = new TestCases();
  eleventyConfig.addJavaScriptFunction(
    "addTestCase",
    (url: string, assertions: Assertions) => {
      testCases.add(url, assertions);
    }
  );

  eleventyConfig.on(
    "eleventy.after",
    async ({ results }: { results: BuildResult[] }) => {
      testCases.validate(results);
    }
  );
}
