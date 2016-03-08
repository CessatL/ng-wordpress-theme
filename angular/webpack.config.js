// @AngularClass

var webpack = require('webpack');
var helpers = require('./helpers');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var HMR = helpers.hasProcessFlag('hot');

var metadata = {
  title: 'Angular2 Webpack Starter by @gdi2990 from @AngularClass',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV,
  HMR: HMR
};
/*
 * Config
 * with default values at webpack.default.conf
 */
module.exports = helpers.defaults({
  // static data for index.html
  metadata: metadata,
  // devtool: 'eval' // for faster builds use 'eval'

  // our angular app
  entry: { 'polyfills': './src/polyfills.ts', 'main': './src/main.ts' },

  // Config for our build files
  output: {
    path: helpers.root('dist')
  },

  resolve: {
    alias: {
      materializecss: 'materialize-css/dist/css/materialize.css',
      materialize: 'materialize-css/dist/js/materialize.min.js',
    },
    extensions: ['', '.ts', '.js']
  },

  module: {
    preLoaders: [
      // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },
      // TODO(gdi2290): `exclude: [ helpers.root('node_modules/rxjs') ]` fixed with rxjs 5 beta.3 release
      { test: /\.js$/, loader: "source-map-loader", exclude: [ helpers.root('node_modules/rxjs') ] }
    ],
    loaders: [

      { test: /materialize-css\/dist\/js\/materialize\.js/, loader: 'imports?materializecss' },

      { test: /materialize\.css$/,   loader: 'style-loader!css-loader' },
      // Support for .ts files.
      { test: /\.ts$/, loader: 'ts-loader', exclude: [ /\.(spec|e2e)\.ts$/ ] },

      // Support for *.json files.
      { test: /\.json$/,  loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/,   loader: 'raw-loader' },

      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader', exclude: [ helpers.root('src/index.html'), helpers.root('node_modules') ] },

      { test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000' }

    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: 'polyfills', filename: 'polyfills.bundle.js', minChunks: Infinity }),
    // static assets
    new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ]),
    // generating html
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    // replace
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV),
        'HMR': HMR
      }
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ],

  // Other module loader config

  // our Webpack Development Server config
  devServer: {
    port: metadata.port,
    host: metadata.host
  }
});
