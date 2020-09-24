// module.exports = function (api) {
//   api.cache(true);
//   const presets = [
//     [
//       "@babel/env",
//       { modules: false, useBuiltIns: "usage", corejs: 3, targets: "ie 11" },
//     ],
//   ];
//   return { presets };
// };

module.exports = {
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "transform-async-to-promises",
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
};
