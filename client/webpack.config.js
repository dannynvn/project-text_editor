const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');



module.exports = () => {
  return {
    mode: 'development',
    // entry point for webpack
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      header: './src/js/header.js',
      editor: './src/js/editor.js',
    },
    // output point for webpack
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // webpack plugin that generates an HTML file
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Just Another Text Editor'
      }),

      // injects custom service worker into the webpack build
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js',
      }),

      // webpack plugin that generates a manifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: '/',
        public_path: '/',
        icons: [
          {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
    experiments: {
      topLevelAwait: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
          },
        }
        }
      ],
    },
  };
};
