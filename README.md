# vue-music

> 一个基于Vue全家桶的音乐播放器

## 安装：
* dependencies: stylus, stylus-loader
* 给eslintrc.js 添加新规则
* 设置别名简化路径：webpack.base.conf.js -> resolve -> alias

## 关于代码组织方式：
这个项目分为通用组件(base)、通用资源和接口配置(common)、各个组件(components)、各个api(api)。

### 移动端优化：
* dependencies: babel-runtime, babel-polyfill, fastclick

## jsonp的实现
动态创建一个script标签，src指向被请求的服务器地址，地址有个参数callback=a，返回的数据为a()
前端运行a()就可以获取其中的数据了

## 后台服务器代理：
* 请求自己的服务端地址，通过转发解决跨域问题

## 加载时机问题：
能确定占位大小的，可以优先加载，参考骨架页面。
不能确定占位大小的，在内容异步获取成功后再加载。
如果内容分多次异步获取（图片）不确定时间的，加一个watch => refresh的余地。

## vue-lazyload插件：
vue-lazyload: [https://github.com/hilongjw/vue-lazyload](https://github.com/hilongjw/vue-lazyload)
在main.js中引用并设置，就可以使用v-lazy命令了。
