const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  mode : 'development',

  entry : './client/index',

  output : {
    path       : resolve(__dirname, 'public', 'built'),
    filename   : 'bundle.js',
    publicPath : 'http://localhost:6789/assets/'
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
        'style-loader',
        {
          loader  : 'css-loader',
          options : { importLoaders: 1 }
        }
      ]
    }, {
      test : /\.less$/,
      use  : [
        'style-loader',
        { loader: 'css-loader' },
        {
          loader  : 'less-loader',
          options : { javascriptEnabled: true }
        }
      ]
    }]
  },

  watchOptions : {
    poll : true
  },

  devServer : {
    headers : {
      'Access-Control-Allow-Origin' : '*'
    },
    port : 6789,
    hot  : true
  },

  devtool : 'source-map',

  plugins : [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
