<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    data: {
      type: Array,
      dafault: null
    },
    click: { //是否监听点击事件？
      type: Boolean,
      default: true
    },
    listenScroll: { //是否监听滚动事件？
      type: Boolean,
      dafault: false
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)

    window.addEventListener('resize', () => {
      if (!this.scroll) {
        return
      }
      this.refresh()
    })
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) { return }

      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        listenScroll: this.listenScroll
      })

      if (this.listenScroll) {
        // Vue实例的this
        let _this = this
        this.scroll.on('scroll', (pos) => {
          // 派发一个事件出去
          // 这里的this会指向scroll
          _this.$emit('scroll', pos)
        })
      }
    },
    // 对几个方法进行代理
    // this=>当前vue component，代理this.scroll上的方法
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    // for listview
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}

</script>
