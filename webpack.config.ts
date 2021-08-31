/* eslint-disable node/no-unpublished-import */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {HotModuleReplacementPlugin, Configuration} from 'webpack';

const config: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new HotModuleReplacementPlugin(),
  ],
};

export default [config];
