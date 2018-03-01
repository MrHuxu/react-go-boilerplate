const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('bundle.css');

module.exports = {
  mode : 'production',

  entry : [
    './client/index'
  ],

  output : {
    path     : resolve(__dirname, 'server', 'public'),
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
          'es2015',
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
              libraryDirectory : 'lib', // default: lib
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
      use  : extractCSS.extract({
        fallback : 'style-loader',
        use      : [
          {
            loader  : 'css-loader',
            options : {
              importLoaders : 1,
              minimize      : true
            }
          }
        ]
      })
    }, {
      test : /\.less$/,
      use  : extractCSS.extract({
        fallback : 'style-loader',
        use      : [
          {
            loader  : 'css-loader',
            options : { minimize: true }
          },
          {
            loader  : 'less-loader',
            options : { javascriptEnabled: true }
          }
        ]
      })
    }]
  },

  plugins : [
    extractCSS,
    new webpack.LoaderOptionsPlugin({
      minimize : true
    })
  ]
};
