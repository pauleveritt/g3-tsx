import { getTipResources } from "./resources/tip/TipModels";
import { getAuthorReferences } from "./references/author/AuthorModels";
import { getTechnologyReferences } from "./references/technology/TechnologyModels";
import { getTopicReferences } from "./references/topic/TopicModels";
import { getProductReferences } from "./references/product/ProductModels";
import { Assertions, TestCases } from "../src/TestCases";
import { addCollection, RegisterIncludesProps } from "../src/registration";

const newCollections = [
  { collectionName: "tip", factory: getTipResources, prefix: "Resources" },
  {
    collectionName: "author",
    factory: getAuthorReferences,
    prefix: "References",
  },
  {
    collectionName: "product",
    factory: getProductReferences,
    prefix: "References",
  },
  {
    collectionName: "technology",
    factory: getTechnologyReferences,
    prefix: "References",
  },
  {
    collectionName: "topic",
    factory: getTopicReferences,
    prefix: "References",
  },
];

export const rootPath = "sites/webstorm-guide";

export async function registerIncludes({
  eleventyConfig,
}: RegisterIncludesProps) {
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });

  const testCases = new TestCases();
  eleventyConfig.addJavaScriptFunction(
    "addTestCase",
    (url: string, assertions: Assertions) => {
      testCases.add(url, assertions);
    }
  );

  for (const collection of newCollections) {
    await addCollection({
      collectionName: collection.collectionName,
      prefix: collection.prefix,
      factory: collection.factory,
      eleventyConfig,
    });
  }
}
