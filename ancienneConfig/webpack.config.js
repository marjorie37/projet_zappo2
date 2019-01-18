const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';


module.exports = (env,argv) => {
  return {
    module: {
      rules: [
         {
           test: /\.(js|jsx)$/,
           exclude: /node_modules/,
           use: [
             {
               loader: require.resolve('eslint-loader')
             },
             {
               loader:require.resolve('babel-loader'),
               options:{
                 plugins: ['react-hot-loader/babel']
               }
             }
           ]
         },
         {
          test: /\.html$/,
          use: [
            {
              loader: require.resolve("html-loader"),
              options: { minimize: true }
            }
          ]
        },
        {
          test:/\.css$/,
          use:[
            argv.mode === 'development' ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
              }
            },
            {
              loader: require.resolve('postcss-loader')
            },
          ]
        },
        {
          test:/\.(scss|sass)$/,
          use:[
            argv.mode === 'development' ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 2,
              }
            },
            {
              loader: require.resolve('postcss-loader')
            },
            {
              loader:require.resolve('sass-loader')
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: require.resolve('file-loader')
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 8192,
                name: '[name].[hash:7].[ext]'
              }
            },
            {
              loader: require.resolve('img-loader'),
              options: {
                enabled: argv.mode === 'production' ? true : false
              }
            }
          ]
        }
      ]
    },
    devtool: argv.mode === 'production' ? "none" : 'eval-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
      hot:true,
      open:true,
      port: 3002,
      historyApiFallback: true
    }
  }
}
