const { join } = require("path");
const webpack = require("webpack");
const UglifyJSWebpackPlugin = require("uglifyjs-webpack-plugin");

const productionDevtool = "source-map";
const developmentDevtool = "eval-source-map";

const include = [join(__dirname, "src")];
const exclude = /node_modules/;

const config = {
  devtool:
    process.env.NODE_ENV === "production"
      ? productionDevtool
      : developmentDevtool,

  devServer: {
    contentBase: "./",
    publicPath: "http://localhost:8181/build/"
  },

  output: {
    path: join(__dirname, "build"),
    filename: "[name].bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|woff2|tff|svg)$/,
        include,
        exclude,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.(tsx|ts)$/,
        include,
        exclude,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  },

  plugins: [],

  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".tsx", ".ts"],
    alias: {
      react: join(__dirname, "node_modules", "react")
    }
  }
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new UglifyJSWebpackPlugin({
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    })
  );
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  );
}

let appConfig = {
  target: "web",
  entry: {
    app: "./src/bootstraps/app"
  }
};

appConfig = Object.assign(appConfig, config);

module.exports = [appConfig];
