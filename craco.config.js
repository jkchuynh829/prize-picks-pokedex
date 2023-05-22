const path = require("path");

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
  },
};

function toPath(p) {
  return path.resolve(__dirname, p);
}
