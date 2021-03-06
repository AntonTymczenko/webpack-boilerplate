const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const glob = require('glob')
const PurifyCSSPlugin = require('purifycss-webpack')

const src = __dirname + '/src'
const dist = __dirname + '/dist'
const public = __dirname +'/public'

// PRODUCTION / DEVELOPMENT   mode:  --------------------------------------
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
const prod = process.env.NODE_ENV === 'production' ? true : false

const plugins = [
  new HtmlWebpackPlugin({
    minify: {
      collapseWhitespace: prod,
      removeComments: prod },
    // template: 'ejs-loader!./src/index.ejs'
    template: 'index.ejs'
  }),
  new ExtractTextPlugin({
    filename: 'bundle.css',
    disable: !prod,
    allChunks: true
  }),
  new CleanWebpackPlugin(['dist']),
  new PurifyCSSPlugin({
    paths: glob.sync(src + '/*.ejs'),
    minimize: prod
  })
]
if (!prod) {
  plugins.push( new webpack.HotModuleReplacementPlugin() )
}

// EXPORTS: ---------------------------------------------------------------
module.exports = {
  context: src,
  entry: ['./index.js'],
  output: {
    filename: 'bundle.js',
    path: dist
  },
  module: {
    rules: [
      // {
      //   test: /\.ejs$/,
      //   use: ['ejs-loader']
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.sass$/,
        use: prod ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }) : ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    contentBase: public,
    compress: true,
    port: 8080,
    hot: !prod,
    stats: "errors-only"
  },
  plugins
}
