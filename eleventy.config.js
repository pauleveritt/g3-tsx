const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { getTipResources } = require("./_includes/resources/tip/TipModels");
const {
  getAuthorReferences,
} = require("./_includes/references/author/AuthorModels");
const {
  getTechnologyReferences,
} = require("./_includes/references/technology/TechnologyModels");
const {
  getTopicReferences,
} = require("./_includes/references/topic/TopicModels");
const {
  getProductReferences,
} = require("./_includes/references/product/ProductModels");

const { TestCases } = require("./src/TestCases");
module.exports = function (eleventyConfig) {
  const testCases = new TestCases();
  eleventyConfig.addJavaScriptFunction("addTestCase", (url, testCase) => {
    testCases.add(url, testCase);
  });

  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });
  // eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPassthroughCopy("sites/**/*.{gif,jpg,png}");
  // copy assets from node_modules for static site
  eleventyConfig.addPassthroughCopy({
    "node_modules/video.js/dist/video.min.js": "assets/videojs/video.min.js",
    "node_modules/video.js/dist/video-js.min.css":
      "assets/videojs/video-js.min.css",
    "node_modules/videojs-youtube/dist/Youtube.min.js":
      "assets/videojs/Youtube.min.js",
  });

  // Wire up some custom collections which return validated, flattened objects for resources/references
  eleventyConfig.addCollection("tipResources", async function (collectionApi) {
    const tips = collectionApi.getFilteredByTag("tip");
    return await getTipResources(tips);
  });
  eleventyConfig.addCollection(
    "authorReferences",
    async function (collectionApi) {
      const authors = collectionApi.getFilteredByTag("author");
      return await getAuthorReferences(authors);
    }
  );
  eleventyConfig.addCollection(
    "technologyReferences",
    async function (collectionApi) {
      const technologies = collectionApi.getFilteredByTag("technology");
      return await getTechnologyReferences(technologies);
    }
  );
  eleventyConfig.addCollection(
    "topicReferences",
    async function (collectionApi) {
      const topics = collectionApi.getFilteredByTag("topic");
      return await getTopicReferences(topics);
    }
  );
  eleventyConfig.addCollection(
    "productReferences",
    async function (collectionApi) {
      const topics = collectionApi.getFilteredByTag("product");
      return await getProductReferences(topics);
    }
  );

  eleventyConfig.on("eleventy.after", async ({ results }) => {
    testCases.validate(results);
  });

  eleventyConfig.addPlugin(syntaxHighlight);
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
