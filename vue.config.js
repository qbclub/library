module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: 'https://cubit-2021.appspot.com/'
  },
  configureWebpack: {
    mode: 'production',
    performance: {
      hints: false
    },
    optimization: {
      nodeEnv: 'production',
      minimize: true,
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
     }
    },
    pwa: {
      name: 'library',
      description: "книги по программированию графике и дизайну, управлению проектами",
      themeColor: '#FDEDDB',
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'f5f5f5',
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        swSrc: 'service-worker.js',
    },
  },
}