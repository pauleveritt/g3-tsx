const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const {
  getTipResources,
  getAuthorReferences,
  getTechnologyReferences,
  getTopicReferences,
  getProductReferences,
} = require("./src/validators");

module.exports = function (eleventyConfig) {
  // v2.0.0-canary.19 or newer
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });
  // eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPassthroughCopy("sites/**/*.{gif,jpg,png}");
  // copy assets from node_modules for static site
  eleventyConfig.addPassthroughCopy({
    "node_modules/video.js/dist/video.min.js": "assets/videojs/video.min.js",
    "node_modules/video.js/dist/video-js.min.css": "assets/videojs/video-js.min.css",
    "node_modules/videojs-youtube/dist/Youtube.min.js": "assets/videojs/Youtube.min.js"
  });

  // Wire up some custom collections which return validated, flattened objects for resources/references
  eleventyConfig.addCollection("tipResources", function (collectionApi) {
    const tips = collectionApi.getFilteredByTag("tip");
    return getTipResources(tips);
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
    const topics = collectionApi.getFilteredByTag("product");
    return getProductReferences(topics);
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
