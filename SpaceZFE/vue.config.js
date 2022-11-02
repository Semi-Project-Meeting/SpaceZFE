const { defineConfig } = require("@vue/cli-service");
module.exports =
  //   {
  //   devServer: {
  //     overlay: false,
  //     port: 4000,
  //     contentBase: ".",
  //     proxy: {
  //       // 이부분 추가
  //       "^/spaceZBE/api": {
  //         target: "http://127.0.0.1:8090/spaceZBE", // 요청할 서버 주소
  //         pathRewrite: { "^/spaceZBE/api": "" },
  //         changeOrigin: true,
  //         logLevel: "debug", // 터미널에 proxy 로그가 찍힌다.
  //       },
  //     },
  //   },
  // }

  defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
  });
