const path = require("path")
const webpack = require("webpack")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "todo-mvc-service.js",
    path: path.resolve(__dirname, "dist"),
    library: "todoMVCService",
    libraryTarget: "umd",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: __dirname + "/node_modules",
      },
    ],
  },
  plugins: [],
}
