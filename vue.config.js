module.exports = {
  publicPath: '/vue/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/css/style.scss";
        `
      }
    }
  }

}
