const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const { preprocess } = require("./svelte.config");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const bundle = false;

var config = {
  entry: {
    bundle: ["./src/main.js"],
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    path: prod ? __dirname + "/public/dist" : __dirname + "/public/dev",
    filename: prod ? "[name].[contenthash].js" : "[name].js",
    chunkFilename: prod ? "[name].[id].[contenthash].js" : "[name].[id].js",
  },
  module: {
    rules: [
      prod
        ? {
            test: /\.(?:svelte|m?js)$/,
            include: [
              path.resolve(__dirname, "src"),
              path.resolve(__dirname, "node_modules", "svelte"),
            ],
            use: {
              loader: "babel-loader",
            },
          }
        : {},
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true,
            preprocess,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  mode,
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: "public/index.html",
    }),
  ],
  optimization: {
    minimizer: [
      //   new UglifyJsPlugin({
      //     extractComments: true,
      //     uglifyOptions: {
      //       mangle: {
      //         toplevel: true,
      //       },
      //       compress: {
      //         drop_console: !bundle,
      //       },
      //       output: {
      //         beautify: false,
      //         comments: false,
      //       },
      //     },
      //   }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          zindex: false,
        },
      }),
    ],
  },
  devtool: prod ? "hidden-source-map" : "source-map",
};

if (!bundle) {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
    })
  );
  //   config.optimization.splitChunks = {
  //     chunks: "all",
  //     minSize: 40000,
  //     maxSize: 49000,
  //     cacheGroups: {
  //       // Merge all the CSS into one file
  //       styles: {
  //         name: "styles",
  //         test: /\.s?css$/,
  //         chunks: "all",
  //         minChunks: 1,
  //         reuseExistingChunk: true,
  //         enforce: true,
  //       },
  //     },
  //   };
}
module.exports = config;
