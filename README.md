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