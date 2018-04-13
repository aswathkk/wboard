const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

const outDir = 'client';

module.exports = merge(common, {
  output: {
    filename: '[name].js',
    publicPath: ''
  },
  devtool: 'inline-source-map',
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'client', 'dist'),
    port: 8080,
    hot: true,
    open: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
