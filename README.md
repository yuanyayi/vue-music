# vue-music

> 一个基于Vue全家桶的音乐播放器
> 学会基本的Vue数据操作，扩展一些常用的配合Vue的插件。

## 安装：
* dependencies: stylus, stylus-loader
* 给eslintrc.js 添加新规则
* 设置别名简化路径：webpack.base.conf.js -> resolve -> alias

### 移动端优化：
* dependencies: babel-runtime, babel-polyfill, fastclick

## 关于代码组织方式：
这个项目分为通用组件(base)、通用资源和接口配置(common)、各个组件(components)、各个api(api)。

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

## 左右联动的思路：
 1 左侧生成一张完整的位置表，右侧生成一组对应的索引值
 2 当左侧滚动或右侧点击时，提供位置参数给统一的处理函数
 3 处理函数会将提供的参数输出为同一位置的位移和索引值
 4 两侧根据位移和索引值作出表现

## 固定标题的需求：
  写一个新的标题固定在指定的位置上。