const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.conf');

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new TerserWebpackPlugin(),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(buildWebpackConfig);
});
