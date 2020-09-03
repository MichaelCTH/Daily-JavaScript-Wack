const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "none",
  entry: {
    app: path.join(__dirname, "src", "index.tsx"),
    home: path.join(__dirname, "src", "Components/Home.tsx"),
    about: path.join(__dirname, "src", "Components/About.tsx"),
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].min.js",
    publicPath: "/dist/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new BundleAnalyzerPlugin({ analyzerMode: "static" }),
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
      name: true,
      cacheGroups: {
        common: {
          name: "common",
          chunks: "all",
          minChunks: 2,
          priority: 10,
        },
      },
    },
  },
};
