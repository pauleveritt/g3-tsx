module.exports = function (eleventyConfig) {
  // v2.0.0-canary.19 or newer
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });
  return {
    dir: {
      input: "site",
      // output: "../_site",
      // layouts: "../_layouts",
    },
    // htmlTemplateEngine: "11ty.tsx",
  };
};
