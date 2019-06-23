const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkerPlugin = require("worker-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: [
      "./src/index"
    ],
    styles: `./src/styles.css`,
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "..", "dist")
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: {
          loader: "html-loader",
          options: {
            minimize: true,
            removeComments: true,
            collapseWhitespace: true
          }
        }
      },
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".html"]
  },
  plugins: [
    new WorkerPlugin({
      globalObject: "self"
    }),
    new CleanWebpackPlugin({
      verbose: true,
      root: path.resolve(__dirname, "..")
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: "static",
        ignore: [".*"]
      },
      {
        from: path.join(
          path.resolve(
            __dirname,
            "../node_modules/@webcomponents/webcomponentsjs/"
          ),
          "*.js"
        ),
        to: "./webcomponentsjs",
        flatten: true
      }
    ]),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.HotModuleReplacementPlugin()
  ]
};
