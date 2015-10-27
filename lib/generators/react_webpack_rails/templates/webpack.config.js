var ExtractTextPlugin     = require('extract-text-webpack-plugin');
var webpack               = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = function(options) {
  var entry = {
    main: ['./app/react/index']
  };
  if (options.hot) {
    entry.main.push(
      'webpack/hot/only-dev-server'
    )
  }
  if (options.development) {
    entry.main.push(
      'webpack-dev-server/client?http://localhost:8080'
    )
  }
  var extensions = ['', '.js', '.jsx', '.js.jsx'];
  var loaders = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: options.hot ? ['react-hot', 'babel-loader'] : ['babel-loader']
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!sass')
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css!sass')
    }
  ];
  var output = {
    path: __dirname + '/app/assets/javascripts',
    filename: 'react_bundle.js',
    publicPath: 'http://localhost:8080/assets/'
  };
  var plugins = [
    new ExtractTextPlugin('../stylesheets/react_bundle.css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: options.development,
      __DEVTOOLS__: options.debug
    })
  ];
  if (options.development) {
    plugins.push(new WebpackNotifierPlugin());
  }

  return {
    entry: entry,
    output: output,
    module: {
      loaders: loaders
    },
    devtool: options.devtool,
    resolve: {
      extensions: extensions
    },
    plugins: plugins
  };
}
