module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      "/api*": {
        target: 'http://192.168.64.2:8000/',
      }
    }
  }
}
