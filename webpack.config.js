const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (_, { mode }) => {
  prod = mode === "production"
  return {
    experiments: {
      topLevelAwait: true
    },
    plugins: [
      // plugins to run regardless
      new HtmlWebpackPlugin({
        title: 'Expense Tracker',
        filename: '../index.html',
        favicon: './public/dist/favicon.ico',
      }),
    ].concat(prod ? [
      // plugins to run in production
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      })
    ] : [
      // plugins to run in development
    ]),
    target: 'web',
    entry: './src/app.jsx',
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.join(__dirname, 'public', 'dist'),
      clean: false
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [{
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          },
        ],
      }]
    },
    mode: 'development',
    devtool: 'eval',
    devServer: {
      static: './public',
    },
    optimization: {

      runtimeChunk: 'single',

    },
  }
};