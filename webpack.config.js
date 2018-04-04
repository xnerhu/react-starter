const { join } = require("path");
const webpack = require("webpack");
const UglifyJSWebpackPlugin = require("uglifyjs-webpack-plugin");

const productionDevtool = "source-map";
const developmentDevtool = "eval-source-map";

const include = [join(__dirname, "src")];
const exclude = /node_modules/;

const port = 8080;

const config = {
  devtool:
    process.env.NODE_ENV === "production"
      ? productionDevtool
      : developmentDevtool,

  devServer: {
    port,
    contentBase: "./",
    publicPath: `http://localhost:${port}/build/`,
  },

  output: {
    path: join(__dirname, "build"),
    filename: "[name].bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        include: join(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|gif|jpg|woff2|tff|svg)$/,
        include,
        exclude,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(tsx|ts)$/,
        include,
        exclude,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },

  plugins: [],

  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".tsx", ".ts"],
  },
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new UglifyJSWebpackPlugin({
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  );
}

let appConfig = {
  target: "web",
  entry: {
    app: "./src/bootstraps/app",
  },
};

appConfig = Object.assign(config, appConfig);

module.exports = [appConfig];
