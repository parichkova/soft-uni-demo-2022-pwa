/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const cwd = process.cwd();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: ['./src/index.tsx'],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|\.webpack)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                isDev && require.resolve('react-refresh/babel')
              ].filter(Boolean),
            },
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
    publicPath: 'auto',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'jsTalks2022DemoAddProduct',
      filename: 'remoteEntry.js',
      exposes: {
        './AddProduct': './src/realIndex',
      },
    }),
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      favicon: 'static/favicon.png',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'static'),
          filter: (resourcePath) => !resourcePath.includes('index.html'),
        },
      ],
    }),
    ...(isDev ? [new ReactRefreshWebpackPlugin({ overlay: false })] : []),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      '~': path.join(cwd, 'src'),
    },
  },
  stats: 'errors-warnings',
  optimization: {
    splitChunks: false,
  },
  devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
  devServer: {
    port: 8082,
    open: true,
    hot: true,
    static: path.join(__dirname, '/public/'),
  },
}
