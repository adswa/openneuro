const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const Visualizer = require('webpack-visualizer-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 9876,
    disableHostCheck: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  plugins: [new Visualizer()],
})
