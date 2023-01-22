const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const { EleventyCollectionItem } = require("./_includes/models");
const {
  getTipResources,
  getAuthorReferences,
  getTechnologyReferences,
  getTopicReferences,
  getProductReferences,
} = require("./src/validators");
const {
  getProduct,
} = require("./_includes/references/product/ProductModels.js");

module.exports = function (eleventyConfig) {
  // v2.0.0-canary.19 or newer
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });
  // eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPassthroughCopy("sites/**/*.[gif,jpg,png]");

  // Wire up some custom collections which return validated, flattened objects for resources/references
  eleventyConfig.addCollection("tipResources", function (collectionApi) {
    const tips = collectionApi.getFilteredByTag("tip");
    return getTipResources(tips);
  });
  eleventyConfig.addCollection("authorReferences", function (collectionApi) {
    const authors = collectionApi.getFilteredByTag("author");
    return getAuthorReferences(authors);
  });
  eleventyConfig.addCollection(
    "technologyReferences",
    function (collectionApi) {
      const technologies = collectionApi.getFilteredByTag("technology");
      return getTechnologyReferences(technologies);
    }
  );
  eleventyConfig.addCollection("topicReferences", function (collectionApi) {
    const topics = collectionApi.getFilteredByTag("topic");
    return getTopicReferences(topics);
  });
  eleventyConfig.addCollection("productReferences", function (collectionApi) {
    const topics = collectionApi.getFilteredByTag("topic");
    return getProductReferences(topics);
  });
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      server: {
        mode: "development",
        watch: {
          ignored: ["_site/**"],
        },
      },
      build: {
        mode: "production",
      },
    },
  });

  return {
    dir: {
      input: "sites",
      includes: "../_includes",
      layouts: "../_includes",
      output: "_site",
    },
    // markdownTemplateEngine: "11ty.js",
  };
};
