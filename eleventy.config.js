const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { registerIncludes } = require("./_includes/config");
const { resolve } = require("path");

module.exports = function (eleventyConfig) {
  // eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPassthroughCopy("sites/**/*.{gif,jpg,png,svg}");
  eleventyConfig.addWatchTarget("./public/assets/img");

  registerIncludes({ eleventyConfig })
    .then((r) => {})
    .catch((e) => console.log(e));

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      server: {
        mode: "development",
        middlewareMode: true,
        watch: {
          ignored: ["_site/**"],
        },
      },
      build: {
        mode: "production",
      },

      // New in v2.0.0
      resolve: {
        alias: {
          // Allow references to `node_modules` folder directly
          "/node_modules": resolve(".", "node_modules"),
        },
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
