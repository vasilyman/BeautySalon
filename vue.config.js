module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/css/style.scss";
        `
      }
    }
  },
}