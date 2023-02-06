import { Assertions, TestCases } from "../src/TestCases";
import {
  addCollection,
  CollectionApi,
  RegisterIncludesProps,
} from "../src/registration";

import { tipConfig } from "./resources/tip";
import { authorConfig } from "./references/author";
import { productConfig } from "./references/product";
import { technologyConfig } from "./references/technology";
import { topicConfig } from "./references/topic";
import {
  BaseResource,
  getResource,
  getResourceType,
} from "../src/ResourceModels";

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

  // Make the primary collections.allResources used by everybody else
  // TODO Tried putting this in registration but it caused the next line
  //    of iterating through collection registrations to never run.
  eleventyConfig.addCollection(
    `allResources`,
    async function (collectionApi: CollectionApi) {
      const collectionItems = collectionApi
        .getAll()
        .filter((ci) => "author" in ci.data)
        .sort((a, b) =>
          a.data.title.toLowerCase() < b.data.title.toLowerCase() ? -1 : 1
        );
      const results: Map<string, BaseResource> = new Map();
      for (const { data, page } of collectionItems) {
        const resourceType = getResourceType(data, page);
        const thisResource: BaseResource = getResource(
          data,
          page,
          resourceType
        );
        // @ts-ignore
        const thisKey = thisResource.url;
        results.set(thisKey, thisResource);
      }
      return results;
    }
  );

  for (const collection of newCollections) {
    await addCollection({
      resourceTypeConfig: {
        ...collection,
      },
      eleventyConfig,
    });
  }
}
