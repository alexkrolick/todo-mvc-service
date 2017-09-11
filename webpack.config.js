const path = require("path")
const webpack = require("webpack")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "todo-mvc-service.min.js",
    path: path.resolve(__dirname, "dist"),
    library: "todoMVCService",
    libraryTarget: "umd",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
}
