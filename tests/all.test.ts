import { expect, test } from "vitest";
import { getTipResources } from "../_includes/resources/tip/TipModels";
import { getAuthorReferences } from "../_includes/references/author/AuthorModels";
import { getTechnologyReferences } from "../_includes/references/technology/TechnologyModels";
import { getTopicReferences } from "../_includes/references/topic/TopicModels";
import { getProductReferences } from "../_includes/references/product/ProductModels";

const Eleventy = require("@11ty/eleventy");
const TemplateConfig = require("@11ty/eleventy/src/TemplateConfig");
const debugDev = require("debug")("Dev:Eleventy:TemplateConfig");

const input = "../sites";
const output = "./_site";

class TestConfig extends TemplateConfig {
  getConfig() {
    if (!this.hasConfigMerged) {
      debugDev("Merging via getConfig (first time)");
      this.projectConfigPaths = [];
      this.config = this.mergeConfig();
      this.hasConfigMerged = true;
    }
    return this.config;
  }

  setProjectConfigPath(path: string) {
    if (path !== undefined) {
      this.projectConfigPaths = [path];
    } else {
      this.projectConfigPaths = [];
    }

    if (this.hasConfigMerged) {
      // merge it again
      debugDev(
        "Merging in getConfig again after setting the local project config path."
      );
      this.forceReloadConfig();
    }
  }
}
test("render the guide site", async () => {
  const testConfig = new TestConfig();
  const elev = new Eleventy(
    input,
    output,
    {
      config: function (eleventyConfig: any) {
        expect(eleventyConfig).to.exist;
      },
    },
    testConfig
  );
  expect(elev).to.exist;
});

async function getTestOutput(input: string, configCallback = function () {}) {
  let elev = new Eleventy(input, "./_site/", {
    config: function (eleventyConfig: any) {
      // @ts-ignore
      configCallback(eleventyConfig);
    },
  });

  elev.setIsVerbose(false);

  // Careful with this!
  // elev.disableLogger();

  await elev.init();

  let result = await elev.toJSON();

  if (!result.length) {
    throw new Error(`No Eleventy JSON output found for input: ${input}`);
  }
  return result;
}

test("old render the guide site", async () => {
  const elev = new Eleventy(input, output, {});
  expect(elev).to.exist;
  return;
  const result = await getTestOutput(
    "../sites",
    function (eleventyConfig: any) {
      eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
        key: "11ty.js",
      });
      // eleventyConfig.setServerPassthroughCopyBehavior("copy");
      // eleventyConfig.addPassthroughCopy("sites/**/*.{gif,jpg,png}");
      // // copy assets from node_modules for static site
      // eleventyConfig.addPassthroughCopy({
      //   "node_modules/video.js/dist/video.min.js":
      //     "assets/videojs/video.min.js",
      //   "node_modules/video.js/dist/video-js.min.css":
      //     "assets/videojs/video-js.min.css",
      //   "node_modules/videojs-youtube/dist/Youtube.min.js":
      //     "assets/videojs/Youtube.min.js",
      // });
      //
      // // Wire up some custom collections which return validated, flattened objects for resources/references
      // eleventyConfig.addCollection(
      //   "tipResources",
      //   async function (collectionApi: any) {
      //     const tips = collectionApi.getFilteredByTag("tip");
      //     return await getTipResources(tips);
      //   }
      // );
      // eleventyConfig.addCollection(
      //   "authorReferences",
      //   async function (collectionApi: any) {
      //     const authors = collectionApi.getFilteredByTag("author");
      //     return await getAuthorReferences(authors);
      //   }
      // );
      // eleventyConfig.addCollection(
      //   "technologyReferences",
      //   async function (collectionApi: any) {
      //     const technologies = collectionApi.getFilteredByTag("technology");
      //     return await getTechnologyReferences(technologies);
      //   }
      // );
      // eleventyConfig.addCollection(
      //   "topicReferences",
      //   async function (collectionApi: any) {
      //     const topics = collectionApi.getFilteredByTag("topic");
      //     return await getTopicReferences(topics);
      //   }
      // );
      // eleventyConfig.addCollection(
      //   "productReferences",
      //   async function (collectionApi: any) {
      //     const topics = collectionApi.getFilteredByTag("product");
      //     return await getProductReferences(topics);
      //   }
      // );
    }
  );

  expect(result).to.exist;
});
