/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

const path = require('path')
const ThreadsPlugin = require('threads-plugin')

module.exports = {
  chainWebpack: config => {

    // Also see this: https://github.com/andywer/threads.js/issues/194#issuecomment-571711077
    /*
    config.plugin('threads').use(new ThreadsPlugin(), [(value) => {
      console.error('YOOO THREADS')
      console.log(value)
    }])
    */
    // Aliases for Vue.js
    // FIXME: tsconfig.json takes precedence?
    /*
    config.resolve.alias
      .set("%", path.resolve(__dirname, "../"))
      // FIXME: Potential conflict with tsconfig.json
      // .set("@", path.resolve(__dirname, "../src/gui/"))
      .set("~", path.resolve(__dirname, "../src/gui/"))
    */
      /*
    config.module
      .rule('themes')
      .test(/\.index\.ts$/)
      .use('file-loader')
      .loader('file-loader')
      .tap(options => {
        return { name: "./src/gui/themes/[name]-[hash:base36:4].[ext]" }
      })
      */

  },
  configureWebpack: {
    // Configuration applied to all builds
    resolve: {
      // Necessary to not have eslint errors with symlinks
      symlinks: false,
      alias: {
        '~': '../src/gui'
      },
      /*
      modules: ['./src/themes']
      */
    },
    /*
    resolveLoader: {
      modules: ['./src/themes']
    },
    */
    devtool: 'source-map'
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
      },
    },
  },
  transpileDependencies: [
    'vuex-module-decorators'
  ],
  filenameHashing: false
}