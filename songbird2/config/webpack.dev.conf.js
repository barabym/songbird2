const webpack = require('webpack');
const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {

  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    hot: true,
    port: 8082,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
