const path    = require('path');
const webpack = require('webpack');

module.exports = {
  entry : './client/index',

  output : {
    path       : path.join(__dirname, 'public', 'built'),
    filename   : 'bundle.js',
    publicPath : 'http://localhost:6789/assets/'
  },

  resolve : {
    extensions : ['.jsx', '.scss', '.js', '.json']
  },

  module : {
    loaders : [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ['react-hot-loader', 'babel-loader'] },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['url-loader?limit=10000&minetype=application/font-woff'] },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['file-loader'] },
      { test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['url?limit=10000!img?progressive=true'] }
    ]
  },

  watchOptions : {
    poll : true
  },

  devServer : {
    headers : {
      'Access-Control-Allow-Origin' : '*'
    }
  },

  devtool : 'source-map',

  plugins : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : '"development"'
    })
  ]
};
