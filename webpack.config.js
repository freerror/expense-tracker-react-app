const path = require('path');

// entry -> output
module.exports = {
  entry: './src/app.jsx',
  // entry: './src/playground/redux-expensify.js',
  // entry: './src/playground/hoc.jsx',
  // entry: './src/playground/redux-101.js',
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'public')
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
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 9000,
    historyApiFallback: true
  }
};