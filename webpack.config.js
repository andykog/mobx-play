var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: './mobx-react-todomvc/src/client',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
      __CLIENT__: JSON.stringify(true),
      __SERVER__: JSON.stringify(false),
      __TARGET__: JSON.stringify('browser'),
    }),
  ],
  resolve: {
    alias: {
      mobx: path.resolve(__dirname, './mobx/src/mobx.ts'),
      'mobx-react': path.resolve(__dirname, './mobx-react/src'),
      'mobx-react-devtools': path.resolve(__dirname, './mobx-react-devtools/src')
    },
    extensions: ['.js', '.jsx', '.ts']
  },
  externals: {
    'react-native': {
      root: 'ReactNative',
      commonjs: 'react-native',
      commonjs2: 'react-native',
      amd: 'react-native'
    },
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css/locals?module'
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: /(mobx-react-devtools)/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|mobx-react-devtools)/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        loader: 'ts-loader',
      }
    ],
  },
};
