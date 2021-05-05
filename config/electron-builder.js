/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

const path = require('path')
const ThreadsPlugin = require('threads-plugin')
const { isConstructSignatureDeclaration } = require('typescript')
const nodeExternals = require('webpack-node-externals');

const security = require('./security')

// See: https://stackoverflow.com/questions/58922143/external-webpack-module-for-electron-does-not-work-after-building

module.exports = {
  electronBuilder: {
    builderOptions: {
      appId: process.env.APP_ID,
      productName: 'mmmap',
      publish: [
        {
          provider: "github",
          owner: "oz-",
          repo: "mmmap-app",
          releaseType: 'release',
          private: true
        }
      ],
      afterSign: './config/notarizing.js',
      mac: {
        category: "public.app-category.social-networking",
        // Zip file is mandatory for autoupdates
        target: ['dmg', 'zip'],
        // @see: https://medium.com/@TwitterArchiveEraser/notarize-electron-apps-7a5f988406db
        hardenedRuntime: true,
        entitlements: './build/entitlements/entitlements.mac.inherit.plist',
        extendInfo: {
          NSCameraUsageDescription: "This app requires camera access to record video.",
          NSMicrophoneUsageDescription: "This app requires microphone access to record audio."
        }
      },
      linux: {
        executableName: "mmmap",
        artifactName: "${productName}-${version}.${ext}"
      },
      win: {
        publish: 'github'
      },
      // TODO: see: https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/1295
      npmRebuild: false,
      nodeGypRebuild: false
    },
    // Security configuration
    ...security,
    // Main entry point
    mainProcessFile: 'src/core/index.ts',
    mainProcessWatch: [
      'src/core/**',
      'src/libs/**',
      'src/shared/**'
    ],
    // Renderer entry point
    rendererProcessFile: './src/gui/main.ts',
    // Webpack
    chainWebpackMainProcess: config => {

      // Set externals (not bundled with app)
      // TODO: Why not putting everything in global externals, at the end of the file?
      config.externals({
        ...config.get('externals'),
        'bufferutil': 'commonjs bufferutil',
        'utf-8-validate': 'commonjs utf-8-validate',
      })

      config.plugin('threads').use(new ThreadsPlugin())

      config.resolve.alias
        .set('Themes', path.resolve(__dirname, "../src/themes"))
    },
    chainWebpackRendererProcess: (config) => {
      config.entry('electron-preload')
        .add('./src/core/ipc/preload/index.ts')
        .end()
      /*
      config.plugin('threads').use(new ThreadsPlugin(), [(value) => {
        console.error('YOOO THREADS IN RENDERER')
        console.log(value)
      }])
      */
    },
    // Bridge between engine and GUI for the first handshake via Electron's Ipc modules
    preload: 'src/core/ipc/preload/index.ts',
    // Don't bundle native modules.
    externals: ['serialport', 'midi'],
    nodeModulesPath: ['../node_modules', './node_modules']
  }
}