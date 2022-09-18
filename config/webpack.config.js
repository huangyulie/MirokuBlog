const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackBar = require('webpackbar');

const isProduction = process.env.NODE_ENV === "production";
isProduction ? console.log('开始打包') : console.log('开启项目中');
const getStyleLoaders = (preProcessor) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env",
          ],
        },
      },
    },
    preProcessor && {
      loader: preProcessor,
      options:
        preProcessor === "less-loader"
          ? {
            // antd的自定义主题
            lessOptions: {
              modifyVars: {
                // 其他主题色：https://ant.design/docs/react/customize-theme-cn
                "@primary-color": "#000", // 全局主色
              },
              javascriptEnabled: true,
            },
          }
          : {},
    },
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.tsx",
  output: {
    path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
    filename: isProduction
      ? "static/js/[name].[contenthash:10].js"
      : "static/js/[name].js",
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:10].chunk.js"
      : "static/js/[name].chunk.js",
    assetModuleFilename: "static/js/[hash:10][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: getStyleLoaders(),
          },
          {
            test: /\.less$/,
            use: getStyleLoaders("less-loader"),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders("sass-loader"),
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders("stylus-loader"),
          },
          {
            test: /\.(png|jpe?g|gif|svg|webp)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
          },
          {
            test: /\.(jsx|js|tsx|ts)$/,
            include: path.resolve(__dirname, "../src"),
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              plugins: [
                // "@babel/plugin-transform-runtime",  // presets中包含了
                !isProduction && "react-refresh/babel",
              ].filter(Boolean),
            },
          }
        ],
      },
    ],
  },
  plugins: [
    new WebpackBar({
      color: "blue",  // 默认green，进度条颜色支持HEX
      basic: false,   // 默认true，启用一个简单的日志报告器
      profile: false,  // 默认false，启用探查器。
    }),
    new ESLintWebpackPlugin({
      extensions: [".js", ".jsx"],
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    isProduction &&
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
      ignoreOrder: true
    }),
    !isProduction && new ReactRefreshWebpackPlugin(),
    // 将public下面的资源复制到dist目录去（除了index.html）
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          toType: "dir",
          noErrorOnMissing: true, // 不生成错误
          globOptions: {
            // 忽略文件
            ignore: ["**/index.html"],
          },
          info: {
            // 跳过terser压缩js
            minimized: true,
          },
        },
      ],
    }),
  ].filter(Boolean),
  optimization: {
    minimize: isProduction,
    // 压缩的操作
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js
      new TerserWebpackPlugin(),
    ],
    // 代码分割配置
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        // layouts通常是admin项目的主体布局组件，所有路由组件都要使用的
        // 可以单独打包，从而复用
        // 如果项目中没有，请删除
        layouts: {
          name: "layouts",
          test: path.resolve(__dirname, "../src/layouts"),
          priority: 40,
        },
        // 如果项目中使用antd，此时将所有node_modules打包在一起，那么打包输出文件会比较大。
        // 所以我们将node_modules中比较大的模块单独打包，从而并行加载速度更好
        // 如果项目中没有，请删除
        antd: {
          name: "chunk-antd",
          test: /[\\/]node_modules[\\/]antd(.*)/,
          priority: 30,
        },
        // 将react相关的库单独打包，减少node_modules的chunk体积。
        react: {
          name: "react",
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          chunks: "initial",
          priority: 20,
        },
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10, // 权重最低，优先考虑前面内容
          chunks: "initial",
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 3002,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  mode: isProduction ? "production" : "development",
  performance: false, // 关闭性能分析，提示速度,
};