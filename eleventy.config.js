const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { registerIncludes } = require("./_includes/config");
const { resolve } = require("path");
const commandLineArgs = require("command-line-args");

const options = commandLineArgs([
  { name: "config", type: String },
  { name: "pathprefix", type: String, defaultOption: "/" },
  { name: "serve", type: Boolean, defaultOption: false },
  { name: "watch", type: Boolean, defaultOption: false },
]);
module.exports = function (eleventyConfig) {
  // These are all relative to the input directory at the end
  eleventyConfig.addPassthroughCopy("./!(_site)**/*.{gif,jpg,png,svg}", {
    overwrite: true,
  });
  eleventyConfig.addPassthroughCopy(
    { "../../public/assets": "assets" },
    { overwrite: true }
  );
  eleventyConfig.addWatchTarget("../../public/assets");
  eleventyConfig.addWatchTarget("../../_includes");
  eleventyConfig.ignores.add("**/_site/**");
  eleventyConfig.ignores.add("**/demos/**");

  registerIncludes({ eleventyConfig })
    .then((r) => {})
    .catch((e) => console.log(e));

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      base: options.pathprefix,
      assetsInclude: ["**/demos/**"],
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
      input: "./",
      includes: "../../_includes",
      layouts: "../../_includes",
      output: "./_site",
    },
  };
};
