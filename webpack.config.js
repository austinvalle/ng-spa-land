const webpack = require('webpack');
const path = require('path');
const applications = require('./portal/applications.config.json');

const PORT = 8080;

const devApplications = {
  // spa-accounts: 'http://localhost:4200',
  // spa-gift-cards: 'http://localhost:4201',
  // spa-home: 'http://localhost:4202',
  // spa-schedules: 'http://localhost:4203'
};

module.exports = {
  mode: 'development',
  entry: [
    __dirname + '/portal/main.js',
    __dirname + '/portal/main.css'
  ],
  optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all"
            }
        }
    }
},
  output: {
    path: process.cwd() + '/dist',
    filename: '[name].js',
    publicPath: '/dist/',
  },
  devtool: 'inline-source-map',
  devServer: {
    port: PORT,
    publicPath: '/dist/',
    contentBase: './',
    historyApiFallback: true,
    proxy: getProxyConfig(applications, devApplications),
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, './'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        exclude: /node_modules|svelte/,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: getBabelConfig(),
      }
    ],
  }
};

function getBabelConfig() {
  return {
    presets: [
      ['babel-preset-env', {
        targets: {
          'browsers': ['last 2 versions'],
        },
      }],
    ],
    plugins: [
      'transform-object-rest-spread',
      'transform-class-properties',
      'syntax-dynamic-import',
      'transform-function-bind',
    ],
  };
}
function getProxyConfig(applications, devApplications) {
  const proxy = {};
  for (app of applications) {
    const path = app.baseHref + '/';
    let target = `http://localhost:${PORT}/build/${path}`;
    if (devApplications.hasOwnProperty(app.name)) {
      target = devApplications[app.name];
    }
    proxy[path] = {
      target: target,
      pathRewrite: {
        [path]: ''
      },
      bypass: function (req, res, proxyOptions) {
        if (req.headers.accept.indexOf('html') !== -1) {
          return '/index.html';
        }
      }
    };
  }
  return proxy;
}
/**
function getProxyConfig(applications, devApplications) {
  const proxy = {};
  for (const appName of Object.keys(devApplications)) {
    const application = applications.find(a => a.name === appName);
    const path = application.baseHref + '/';
    proxy[path] = {
      target: devApplications[appName],
      pathRewrite: {
        [path]: ''
      },
      bypass: function (req, res, proxyOptions) {
        if (req.headers.accept.indexOf('html') !== -1) {
          return '/index.html';
        }
      }
    };
  }
  return proxy;
}
 */