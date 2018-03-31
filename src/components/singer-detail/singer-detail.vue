<template>
  <transition name="myslide">
    <div class="singer-detail">
      这是一段文字
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
  
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  // 最终展示的位置
  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background
    
  /* 转场动画
   * 官方文档中的描述： https://cn.vuejs.org/v2/guide/transitions.html
   * vue中提供了transition封装组件
   */
  .myslide-enter-active, .myslide-leave-active
    transition: all 0.3s
  // 初始位置
  .myslide-enter,.myslide-leave-to
    transform: translate3d(100%, 0, 0)
</style>