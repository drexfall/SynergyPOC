const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  /** Expose public folder to storybook as static */
  staticDirs: ["../public"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", {
    name: "@storybook/addon-postcss",
    options: {
      postcssLoaderOptions: {
        implementation: require("postcss"),
      },
    },
  }, "@storybook/addon-webpack5-compiler-babel", "@storybook/addon-themes", "@storybook/addon-styling-webpack"],
  core: {
    builder: "webpack5",
  },
  framework: "@storybook/react-webpack5",
  webpackFinal: async (config) => {
    // SASS + Tailwind CSS
    config.module.rules.push({
      test: /\.s([ac])ss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1, // We always need to apply postcss-loader before css-loader
            modules: {
              auto: /\.module\.scss$/, // true
              localIdentName: "[name]__[local]--[hash:base64:5]",
            },
          },
        },
        {
          loader: "postcss-loader", // required for tailwind
          options: {
            implementation: require("postcss"), // postcss 8
            postcssOptions: {
              config: path.resolve(__dirname, "../postcss.config.js"),
            },
          },
        },
        {
          loader: "sass-loader",
          options: {
            // sourceMap: true,
            implementation: require("sass"), // dart sass
          },
        },
      ],
    });

    return config;
  },
};
