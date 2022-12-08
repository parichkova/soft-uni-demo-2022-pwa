/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const cwd = process.cwd()
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const isDev = process.env.NODE_ENV == 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: ['./src/index.tsx'],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|\.webpack|service-worker*)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader },
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
    publicPath: isDev ? '/': './',
    filename: isDev ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash].chunk.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      favicon: 'static/favicon.ico',
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
        {
          from: path.join(__dirname, '/src/service-worker.js'),
        },
        {
          from: path.join(__dirname, '/src/service-worker-registration.js'),
        }
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      '~': path.join(cwd, 'src'),
    },
  },
  stats: 'errors-warnings',
  devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
  devServer: {
    open: true,
    hot: true,
    client: {
      overlay: false,
    },
  },
}
