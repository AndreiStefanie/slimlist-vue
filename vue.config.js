module.exports = {
  css: {
    loaderOptions: {
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
