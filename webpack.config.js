/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const cwd = process.cwd();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['./src/index.tsx'],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|\.webpack)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|ttf|otf|eot)$/,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: './',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html',
      favicon: './static/favicon.ico',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].chunk.css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'static'),
          filter: (resourcePath) => !resourcePath.includes('index.html'),
        },
      ],
    }),
    new InjectManifest({
      swSrc: path.join(__dirname, 'src', 'service-worker.ts'),
      swDest: 'service-worker.js',
      maximumFileSizeToCacheInBytes: 5242880,
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      '~': path.join(cwd, 'src'),
    },
  },
  stats: 'errors-warnings',
  devtool: 'source-map',
}
