// Generated by CoffeeScript 1.8.0
var path = require('path');

var webpack = require('webpack');

var webpackDevPort = 7301;

module.exports = {
  webpackDevPort: webpackDevPort,
  resolve: {
    extensions: ['', '.js','.jsx'],
  },
  externals:{
    react:'React',
    'react-dom':'ReactDOM',
    pixi:'PIXI',
    PIXI:'PIXI',
  },
  entry: {
    index: [
      'webpack-hot-middleware/client',
      path.resolve(__dirname, './public/js/main/main.jsx')
    ],
    edit: [
      'webpack-hot-middleware/client',
      path.resolve(__dirname, './public/js/edit/edit.jsx'),
    ],
    game_create: [
      'webpack-hot-middleware/client',
      path.resolve(__dirname, './public/js/game/create/index.jsx'),
    ],
    game_my: [
      'webpack-hot-middleware/client',
      path.resolve(__dirname, './public/js/game/my/index.jsx'),
    ],
    game_info: [
      'webpack-hot-middleware/client',
      path.resolve(__dirname, './public/js/game/info/index.jsx'),
    ]
  },
  output: {
    path: path.resolve(__dirname, './public/dist/'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test:/\.jsx|\.js$/,
        loader:'babel',
        query:{
          compact:false
        }
      },
      {
        test:/\.scss$/,
        exclude: /node_modules|bower_components/,
        loaders:['style','css','sass-loader']
      },{
        test:/\.css$/,
        exclude: /node_modules|bower_components/,
        loaders:['style','css']
      },{
        test:/\.ttf|otf$/,
        loaders:['file?name=[name].[ext]']
      }
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      env:{
        isDevelopment:true,
        BROWSER_ENV: true
      },
      __DEV__:true
    })
  ],
  devtool: 'source-map'
};

//# sourceMappingURL=webpack.config.js.map
