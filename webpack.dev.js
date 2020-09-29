const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');

module.exports = {
  mode: 'development',

  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.less'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // {
      //   test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      //   loader: 'url-loader',
      //   include : path.join(__dirname, 'images'),
      //   options: {
      //     limit: 10000,
      //     name: 'images/[name].[ext]',
      //   },
      // },
      // {
      //   test: /\.(png|svg|jpg|gif|ico)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '/images/[name].[ext]',
      //   },
      // },
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

  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      title: 'Chinchilla village',
      template: HtmlWebpackTemplate,
      bodyHtmlSnippet: '<div id=\'root\'></div>',
      favicon: './src/images/favicon.ico',
    }),
  ],
};
