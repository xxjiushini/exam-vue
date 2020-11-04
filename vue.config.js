/**
 * @name: webpack配置文件
 * @Author: xiao jun
 * @Date: 2020-09-10
 * Copyright(c) 2015-2010 xiaojun.
 */
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const path =  require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
    publicPath: './', // 默认'/'，部署应用包时的基本 URL
    outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
    assetsDir: 'static',  // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: IS_PROD,  // 取消 eslint 验证
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: false,  // 生产环境的 source map
    devServer: {
        //lint错误显示在浏览器上
        overlay: {
          warnings: true,
          errors: true
        },
        open: IS_PROD,//配置自动启动浏览器
        host: '0.0.0.0',
        port: 8099,
        https: false,
        hotOnly: true,// 热更新
        proxy: {
            '/api': {
                target: process.env.VUE_APP_BASE_API,
                ws: false,//websocket支持
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    chainWebpack: config => {
        // 修复热更新
        config.resolve.symlinks(true)
        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))

        config.externals = {
            'vue': 'Vue',
            'element-ui': 'ELEMENT',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios'
        };

    },

    css: {
        requireModuleExtension: true,
        extract: IS_PROD,
        sourceMap: false,
        loaderOptions: {
            sass: {
                // 向全局sass样式传入共享的全局变量
                prependData:
                    `@import '@/assets/style/index.scss';$src: "${process.env.VUE_APP_SRC}";`
            }
        }
    }


};
