const path = require('path');
const fs = require('fs');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

const PAGES_DIR = PATHS.src;
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.html'));

module.exports = {

  externals: {
    paths: PATHS,
  },

  entry: {
    app: PATHS.src,
  },

  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },

      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: './config//postcss.config.js' } },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },

    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),

    new CopyWebpackPlugin([
      {
        context: `${PATHS.src}/components/`, from: '**/*', to: `${PATHS.assets}media`, flatten: true, ignore: ['*.js', '*.jsx', '*.css', '*.scss'],
      },
      { from: `${PATHS.src}/static`, to: '' },
    ]),

    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page}`,
    })),
  ],
};
