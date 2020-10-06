const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PROD = 'production';
const DEV = 'development';

module.exports = (env = {}) => {
  const { mode = DEV } = env;

  const isProd = mode === PROD;
  const isDev = mode === DEV;

  const getEntry = () => {
    const entry = ['./src/index.tsx'];
    if (isDev) entry.unshift('react-hot-loader/patch');
    return entry;
  };
  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        inject: 'body',
        title: 'Chinchilla village',
        appMountId: 'root',
        template: HtmlWebpackTemplate,
        favicon: './src/images/favicon.ico',
      }),
    ];
    if (isProd) {
      plugins.unshift(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: 'styles.[contenthash:4].css',
          sourceMap: true,
          ignoreOrder: false,
        }),
      );
    }
    return plugins;
  };

  return {
    mode: isProd ? PROD : isDev && DEV,

    entry: getEntry(),

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },

    devtool: 'source-map',

    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },

    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
        },

        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },

        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[local]-[hash:base64:5]',
                },
              },
            },
            'sass-loader',
          ],
        },

        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            name: '[name]-[contenthash:5].[ext]',
          },
        },

        {
          test: /\.(ttf)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
            name: '[name]-[contenthash:5].[ext]',
          },
        },
      ],
    },

    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
      hotOnly: true,
    },

    watchOptions: {
      ignored: /node_modules/,
    },

    plugins: getPlugins(),
  };
};
