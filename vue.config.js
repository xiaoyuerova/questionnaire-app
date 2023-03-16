const webpack = require("webpack");

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
      })
    ]
  },
  devServer: {
    port: 8686 // 此处修改你想要的端口号
  }
}
