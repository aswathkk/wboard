const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outDir = 'client';

module.exports = {
  entry: './' + outDir + '/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, outDir, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './' + outDir + 'dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([ './' + outDir + '/dist']),
    new HtmlWebpackPlugin({
      template: outDir + '/src/index.html'
    })
  ]
}
