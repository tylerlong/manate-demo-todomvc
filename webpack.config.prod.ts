/* eslint-disable node/no-unpublished-import */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {join} from 'path';
import {Configuration} from 'webpack';

const config: Configuration = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: join(__dirname, 'docs'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /(node_modules|docs|test|\.spec\.js)/,
        use: [
          {
            loader: 'webpack-strip-block',
            options: {
              start: 'DEV-START',
              end: 'DEV-END',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};

export default [config];
