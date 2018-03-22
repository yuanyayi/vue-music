# vue-music

> 一个基于Vue全家桶的音乐播放器

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#安装：
* dependencies: stylus, stylus-loader
* 给eslintrc.js 添加新规则
* 设置别名简化路径：webpack.base.conf.js -> resolve -> alias
## 移动端优化：
* dependencies: babel-runtime, babel-polyfill, fastclick

#jsonp的实现
动态创建一个script标签，src指向被请求的服务器地址，地址有个参数callback=a，返回的数据为a()
前端运行a()就可以获取其中的数据了