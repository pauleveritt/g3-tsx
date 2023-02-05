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

// New start
const { registerIncludes } = require("./_includes/config");

module.exports = function (eleventyConfig) {
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

  registerIncludes({ eleventyConfig });

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
  };
};
