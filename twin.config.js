module.exports = {
  twin: {
    preset: "emotion",
    config: "./tailwind.config.js",
    styled: {
      import: "default",
      from: "@emotion/styled",
    },
    autoCssProp: true,
  },
};
