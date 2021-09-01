/* eslint-disable node/no-unpublished-import */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {join} from 'path';
import {Configuration} from 'webpack';

const config: Configuration = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.tsx',
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'useProxy • TodoMVC',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    // eslint-disable-next-line node/no-unpublished-require
    fallback: {buffer: require.resolve('buffer/')},
  },
};

export default config;
