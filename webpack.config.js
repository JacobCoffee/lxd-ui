/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
  entry: {
    app: "./static/js/App.tsx",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/ui/",
    filename: "ui/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.tsx?/,
        use: ["ts-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "static/html/index.html",
          to: "index.html",
          toType: "file",
        },
        {
          from: "static/html/index.html",
          to: "ui/index.html",
          toType: "file",
        },
        {
          from: "static/assets",
          to: "ui/static/assets",
          toType: "dir",
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      api: path.join(__dirname, "static/js/api"),
      components: path.join(__dirname, "static/js/components"),
      pages: path.join(__dirname, "static/js/pages"),
      types: path.join(__dirname, "static/js/types"),
      util: path.join(__dirname, "static/js/util"),
    },
  },
};

module.exports = () => {
  const production = process.env.ENVIRONMENT !== "devel";

  if (production) {
    config.mode = "production";
  } else {
    config.devtool = "source-map";
    config.mode = "development";
  }

  return config;
};
