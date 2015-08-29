module.exports = {
  context: __dirname + '/app/react',
  entry: './index',
  output: {
    path: __dirname + '/app/assets/javascripts',
    filename: 'react_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components$)/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.js.jsx']
  }
};
