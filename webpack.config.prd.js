const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode : 'production',

  entry : [
    './client/index'
  ],

  output : {
    path     : resolve(__dirname, 'client', 'public'),
    filename : 'bundle.js'
  },

  resolve : {
    extensions : ['.jsx', '.js', '.json', '.less']
  },

  module : {
    rules : [{
      test    : /\.(js|jsx)$/,
      exclude : [/node_modules/],
      loader  : 'babel-loader',
      options : {
        presets : [
          'env',
          'react'
        ],
        plugins : [
          'syntax-decorators',
          'transform-class-properties',
          'transform-decorators-legacy',
          'transform-export-extensions',
          'transform-object-rest-spread',
          [
            'import',
            {
              libraryName      : 'antd',
              libraryDirectory : 'lib',
              style            : true
            }
          ]
        ]
      }
    }, {
      test    : /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader  : 'url-loader',
      options : {
        limit    : 10000,
        minetype : 'application/font-woff'
      }
    }, {
      test   : /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader : 'file-loader'
    }, {
      test    : /\.(jpe?g|png|gif|svg)$/i,
      loader  : 'url-loader',
      options : { limit: 10000 }
    }, {
      test : /\.css$/,
      use  : [
        MiniCssExtractPlugin.loader,
        {
          loader  : 'css-loader',
          options : {
            importLoaders : 1
          }
        }
      ]
    }, {
      test : /\.less$/,
      use  : [
        MiniCssExtractPlugin.loader,
        {
          loader  : 'css-loader',
          options : {
            importLoaders : 1
          }
        },
        {
          loader  : 'less-loader',
          options : { javascriptEnabled: true }
        }
      ]
    }]
  },

  plugins : [
    new UglifyJsPlugin(),
    new MiniCssExtractPlugin({
      filename : 'bundle.css'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize : true
    })
  ]
};
