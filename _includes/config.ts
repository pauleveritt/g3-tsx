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
import { Resource } from "../src/ResourceModels";
import { Reference } from "../src/ReferenceModels";

export const resourceCollections = {
  tip: tipConfig,
};
export const referenceCollections = {
  author: authorConfig,
  product: productConfig,
  technology: technologyConfig,
  topic: topicConfig,
};

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

  let allResourcesList: Resource[];
  let allReferencesList: Reference[];
  eleventyConfig.addCollection(
    `allResources`,
    async function (collectionApi: CollectionApi) {
      // Get all the collection results
      allCollections = await getAllCollections({
        collectionApi,
        resourceCollections,
        referenceCollections,
      });

      // Update closure value so we can add function
      allResourcesList = Array.from(allCollections.allResources.values());
      allReferencesList = Array.from(allCollections.allReferences.values());

      return allCollections.allResources;
    }
  );

  eleventyConfig.addCollection("allReferences", function () {
    return allCollections.allReferences;
  });

  // Query helpers
  eleventyConfig.addJavaScriptFunction(
    "getResources",
    (resourceType?: string): Resource[] => {
      if (!resourceType) return allResourcesList;
      return allResourcesList.filter(
        (resource) => resource.resourceType === resourceType
      );
    }
  );
  eleventyConfig.addJavaScriptFunction(
    "getReferences",
    (resourceType?: string): Reference[] => {
      if (!resourceType) return allReferencesList;
      return allReferencesList.filter(
        (reference) => reference.resourceType === resourceType
      );
    }
  );
}
