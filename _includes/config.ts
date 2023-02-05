import { getAuthorReferences } from "./references/author/AuthorModels";
import { getTechnologyReferences } from "./references/technology/TechnologyModels";
import { getTopicReferences } from "./references/topic/TopicModels";
import { getProductReferences } from "./references/product/ProductModels";
import { Assertions, TestCases } from "../src/TestCases";
import { addCollection, RegisterIncludesProps } from "../src/registration";

import { tipConfig } from "./resources/tip";
import { authorConfig } from "./references/author";
import { productConfig } from "./references/product";
import { technologyConfig } from "./references/technology";
import { topicConfig } from "./references/topic";

const newCollections = [
  tipConfig,
  authorConfig,
  productConfig,
  technologyConfig,
  topicConfig,
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
      resourceTypeConfig: {
        collectionName: collection.collectionName,
        suffix: collection.suffix,
        factory: collection.factory,
      },
      eleventyConfig,
    });
  }
}
