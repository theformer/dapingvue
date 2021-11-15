"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",

    // Various Dev Server settings
    host: "0.0.0.0", // can be overwritten by process.env.HOST
    port: 9002, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
    proxyTable: {
      "/api/User": {
        target: "https://api-fcsp.zgyiyun.com:1200",
        changeOrigin: true,
        pathRewrite: {
          "^/api/User": "/User"
        }
      },
      "/api/SafetySubject": {
        target: "https://api-fcsp.zgyiyun.com:1200",
        changeOrigin: true,
        pathRewrite: {
          "^/api/SafetySubject": "/SafetySubject"
        }
      },
      // 滑动验证请求
      // '/api/auth': {
      //   // target: 'http://192.168.5.167:10023',
      //   target: 'https://api-fcsp.zgyiyun.com:1200',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api/auth': '/auth'
      //   }
      // },
      "/security/query/": {
        target: "http://101.37.65.163:8400",
        changeOrigin: true,
        pathRewrite: {
          "^/security/query": "/query"
        }
      },
      "/api/bigData/": {
        // target: 'http://192.168.5.33:10024',
        target: "https://api-fcsp.zgyiyun.com:1200",
        changeOrigin: true,
        pathRewrite: {
          "^/api/bigData": "/bigData"
        }
      },
      "/api/auth/": {
        // target: 'http://192.168.5.33:10024',
        target: "http://192.168.5.107:8765",
        changeOrigin: true,
        pathRewrite: {
          "^/api/auth": "/api/auth"
        }
      },
      // "/api/screen/getordertypeinfo": {
      //   // target: 'http://192.168.5.33:10024',
      //   target: "http://192.168.100.111:8899",
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/api/screen/getordertypeinfo": "/screen/getordertypeinfo"
      //   }
      // },
      "/api/screen/": {
        // target: 'http://192.168.5.33:10024',
        target: "http://192.168.5.167:10081",
        // target: "http://121.40.46.103:10081",
        changeOrigin: true,
        pathRewrite: {
          "^/api/screen": "/screen"
        }
      },
      "/api/login/": {
        // target: 'http://192.168.5.33:10024',
        target: "http://192.168.5.167:10081",
        // target: "http://121.40.46.103:10081",
        changeOrigin: true,
        pathRewrite: {
          "^/api/login": "/login"
        }
      },

    },
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
