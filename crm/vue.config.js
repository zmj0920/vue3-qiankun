const { name } = require("./package.json");
const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: "/crm",
  devServer: {
    port: process.env.VUE_APP_CRM_PORT,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  chainWebpack: (config) => config.resolve.symlinks(false),
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    experiments: {
      topLevelAwait: true,
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: name,
      libraryTarget: "umd",
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
});
