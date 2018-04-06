<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{title}}</h1>
    <div class="bg-image" :style="'background-image: url(\''+bgImage+'\')'" ref="bgImage">
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll class="list" @scroll="scroll" :data="songs" ref="list" :probe-type="probeType" :listen-scroll="listenScroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'

const RESERVED_HEIGHT = 40

export default {
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scrollY: 0 // 参照变量
    }
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y
    },
  },
  watch: {
    scrollY(newVal) {
      // scroll for bg-layer：
      let translateY = Math.max(this.minTranslateY, newVal)
      this.$refs.layer.style['transform'] = `translate3d(0, ${translateY}px, 0)`
      this.$refs.layer.style['webkitTransform'] = `translate3d(0, ${translateY}px, 0)`
      // scroll for bg-layer (end)

      // 解决song-list会滑出bg-layer上限的问题(不能使用overflow好痛苦TOT)
      let zIndex = 0
      if (newVal < this.minTranslateY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
      } else {
        this.$refs.bgImage.style.paddingTop = '70%' 
        this.$refs.bgImage.style.height = 0
      }
      // this.$refs.bgImage.style.zIndex = zIndex
      // 解决song-list会滑出bg-layer上限的问题(END)

      // 下拉song-list时头图放大功能：
      let scale = 1
      let blur = 0
      const percent = Math.abs(newVal / this.imageHeight)
      if (newVal > 0){
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20 * percent, 20)
      }
      this.$refs.bgImage.style['transform'] = `scale(${scale})`
      this.$refs.bgImage.style['webkitTransform'] = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
      // 下拉song-list时头图放大功能(END)
      // 模糊效果：
      this.$refs.filter.style['backdrop-filter'] = `blur(${blur}px)`
      this.$refs.filter.style['webkitBackdrop-filter'] = `blur(${blur}px)`
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {
    /* 
     *  scroll组件默认全屏，会覆盖整个music-list范围；
     *  music-list是伪全屏，必须全屏；
     *  所以解决方法是：list组件初始位置需要下移，让出头图位置；
     *  （根据需求）滚动时头图位置重新计算，跟随list 组件上移。
     */
    this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
    // 其实如果背景图是全屏这样就可以了～～～
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
  },
  components: {
    Scroll,
    SongList
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: absolute
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      // overflow: hidden
      .song-list-wrapper
        padding: 20px 30px
        // 测试用
        // background: $color-background
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
