module.exports = {
  publicPath: '/vue/',
  outputDir: 'dist/vue',
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
