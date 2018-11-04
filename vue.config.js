module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        data: `@import "@/styles/index.scss";`
      }
    }
  },
  pwa: {
    name: 'SlimList',
    themeColor: '#383a39',
    msTileColor: '#383a39',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black'
  }
};
