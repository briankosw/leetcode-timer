const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    content_script: path.resolve(__dirname, "src/addTimerButton.tsx"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", "js", "tsx"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "assets/icons"),
          to: path.resolve(__dirname, "dist/images"),
        },
        {
          from: path.resolve(__dirname, "assets/css"),
          to: path.resolve(__dirname, "dist/css"),
        },
        {
          from: path.resolve(
            __dirname, "node_modules/webextension-polyfill/dist/browser-polyfill.js"
        ),
          to: path.resolve(__dirname, "dist"),
        }
      ],
    }),
  ],
};
