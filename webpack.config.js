const MinifyPlugin = require('babel-minify-webpack-plugin');
module.exports = {
  entry: './src/stretchtext.js',
  output: {
    filename: 'dist/StretchText.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.js$/, // include .js files
        enforce: 'pre', // preload the jshint loader
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        use: [
          {
            loader: 'jshint-loader',
            options: {
              esversion: 6,
              camelcase: true,
              emitErrors: false,
              failOnHint: false,
            },
          },
        ],
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  plugins: [new MinifyPlugin({}, {})],
};
