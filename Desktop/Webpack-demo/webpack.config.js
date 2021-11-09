const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
__webpack_base_uri__ = 'https://example.com'

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './js/app.js',
    amind: './js/amind.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  devServer: {
    compress: true,
    port: 3000,
    stats: {
      assets: true,
      cached: false,
      chunkModules: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      source: false,
      version: false,
      warnings: false,
    },
    proxy: {
      // 原本網址 https://www.vscinemas.com.tw/vsweb/api/GetLstDicCinema
      '/vsweb/api/': {
        target: 'https://www.vscinemas.com.tw',
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.html$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       name: '[path][name].[ext]'
      //     }
      //   }]
      // },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'ejs-webpack-loader',
            options: {
              data: {
                title: 'New Title',
                someVar: 'hello world',
              },
              htmlmin: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          // 要照順序 下到上
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'assets', to: 'assets' }],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery', // plugin 的名字
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack前端自動化開發', // template title 名稱
      filename: 'app.html', // 輸出的名字
      template: 'html/app.html', // 指定在 template 夾裡面的 template.html
      viewport: 'width=640, user-scalable=no',
      description: 'Webpack前端自動化開發，讓你熟悉現代前端工程師開發的方法',
      Keywords: 'Webpack前端自動化開發、前端、工程師、線上教學、教學範例',
      chunksSortMode: 'manual',
      chunks: ['vendors', 'app', 'amind'],
    }),
  ],
}
