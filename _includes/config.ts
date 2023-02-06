import { Assertions, TestCases } from "../src/TestCases";
import {
  CollectionApi,
  getAllCollections,
  RegisterIncludesProps,
} from "../src/registration";

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
  let allCollections: any;

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

  eleventyConfig.addCollection(
    `allResources`,
    async function (collectionApi: CollectionApi) {
      // Get all the collection results
      allCollections = await getAllCollections({
        collectionApi,
        newCollections,
      });

      return allCollections.allResources;
    }
  );

  // Now all the other entity-specific collections
  for (const collection of newCollections) {
    const collectionName = `${collection.collectionName}${collection.suffix}`;
    eleventyConfig.addCollection(collectionName, async function () {
      return allCollections[collectionName];
    });
  }
}
