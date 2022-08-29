## 所需依赖
npm i eslint-webpack-plugin html-webpack-plugin style-loader css-loader postcss-loader postcss-preset-env less-loader sass-loader sass -D

npm i babel-loader @babel/core babel-preset-react-app eslint-config-react-app -D

npm i webpack-dev-server webpack webpack-cli -D

npm i react-router-dom

npm i @pmmmwh/react-refresh-webpack-plugin react-refresh -D

npm i copy-webpack-plugin -D

npm i react react-dom

npm i --save-dev cross-env

npm i mini-css-extract-plugin css-minimizer-webpack-plugin -D


## TS相关
npm i typescript -D

npx tsc --init

npm i @babel/preset-typescript -D

npm i ts-loader -D

tsconfig.json配置"jsx": “react”

npm i @types/react @types/react-dom


## webpack美化器
webpackbar
webpackbar 这是一款个人感觉是个十分美观优雅的进度条，很多成名框架都用过他。而且使用起来也极其方便，也可以支持多个并发构建是个十分强大的进度插件。

我们依然要先安装一下：
npm i -D webpackbar

const WebpackBar = require('webpackbar');
let progressPlugin = new WebpackBar({
  color: "#85d",  // 默认green，进度条颜色支持HEX
  basic: false,   // 默认true，启用一个简单的日志报告器
  profile:false,  // 默认false，启用探查器。
})
plugins.push(progressPlugin)

常用的属性配置其实就是这些，注释里也写的很清楚了。

当然里面还有一个属性就是reporters还没有写上，可以在里面注册事件，也可以理解为各种钩子函数。如下：
{   // 注册一个自定义记者数组
    start(context) {
      // 在（重新）编译开始时调用
      const { start, progress, message, details, request, hasErrors } = context
    },
    change(context) {
      // 在 watch 模式下文件更改时调用
    },
    update(context) {
      // 在每次进度更新后调用
    },
    done(context) {
      // 编译完成时调用
    },
    progress(context) {
      // 构建进度更新时调用
    },
    allDone(context) {
      // 当编译完成时调用
    },
    beforeAllDone(context) {
      // 当编译完成前调用
    },
    afterAllDone(context) {
      // 当编译完成后调用
    },
}




