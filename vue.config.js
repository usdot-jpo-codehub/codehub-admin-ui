const webpack = require('webpack');
module.exports = {
  devServer: {
    proxy: {
      '/api/*': {
        target: process.env.VUE_APP_ADMIN_API_URL,
        secure: false
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          VUE_APP_PACKAGE_JSON: '"' + escape(JSON.stringify(require('./package.json'))) + '"'
        }
      })
    ]
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'test') {
      config.module.rule('js')
        .test(/\.js$/)
        .use('istanbul-instrumenter-loader')
        .loader('istanbul-instrumenter-loader')
        .options({
          esModules: true,
        });
    }
  }
}
