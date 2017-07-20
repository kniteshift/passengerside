const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ExtractTextPlugin.extract('css-loader!sass-loader'),
        test: /\.(sass|scss)$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('build/client/style.css', {
      allChunks: true
    })
  ]
}