const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

const outDir = 'client';

module.exports = merge(common, {
  output: {
    filename: '[name].bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin([ './' + outDir + '/dist']),
    new UglifyJSPlugin()
  ]
});
