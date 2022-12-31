const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");

module.exports = function (eleventyConfig) {
  // v2.0.0-canary.19 or newer
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });
  eleventyConfig.addPlugin(EleventyVitePlugin);

  return {
    dir: {
      input: "sites",
      includes: "../_includes",
      layouts: "../_includes",
      output: "_site",
    },
    markdownTemplateEngine: "11ty.js",
  };
};
