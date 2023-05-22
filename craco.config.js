const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  babel: {
    plugins: [
      [
        "babel-plugin-macros",
        {
          twin: {
            config: "./twin.config.js",
            preset: "emotion",
            hasSuggestions: true,
            debug: false,
          },
        },
      ],
      [
        "@emotion/babel-plugin",
        {
          autoLabel: "always",
          labelFormat: "[filename]--[local]",
        },
      ],
    ],
  },
  webpack: {
    alias: {
      "@emotion/core": toPath("@emotion/react"),
      "emotion-theming": toPath("@emotion/react"),
    },
    configure: (webpackConfig) => {
      const instanceOfPluginIndex = webpackConfig.plugins.findIndex(
        (plugin) => plugin instanceof ForkTsCheckerWebpackPlugin
      );

      if (instanceOfPluginIndex > -1) {
        webpackConfig.plugins[instanceOfPluginIndex].options = {
          // Update the options
        };
      }

      return webpackConfig;
    },
  },
};

function toPath(p) {
  return path.resolve(__dirname, p);
}
