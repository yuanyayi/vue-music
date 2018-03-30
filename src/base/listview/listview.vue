<template>
  <scroll class="listview" ref="listview"
          :data="data" 
          :listenScroll="listenScroll"
          :probeType="probeType"
          @scroll="scroll">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar"/>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 右侧边栏 -->
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in shortcutList" class="item" :data-index="index" 
            :class="{'current': currentIndex === index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="scrollY<0" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div class="loading-container" v-show="!data.length || !data.length>0">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/javascript">
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'
  import Loading from 'base/loading/loading'

  // shortcut单个元素的高度：
  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30

  export default {
    created() {
      // 为什么写这里而不写在data中？因为不需要Vue为它做监听。
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    props: {
      data: {
        type: Array,
        dafault: []
      }
    },
    data(){
      return {
        // shortcut highlight
        scrollY: -1,
        currentIndex: 0,
        // 列表滚动临近顶起效果
        diff: -1
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((group)=>{
          return group.title.substr(0,1)
        })
      },
      fixedTitle() {
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    watch: {
      data() {
        // 数据变化->DOM变化会有延时
        setTimeout(()=>{
          this._calculateHeight()
        }, 20);
      },
      scrollY(newY) {
        // scroll事件是在scroll组件中重新派发的
        const listHeight = this.listHeight
        // 当滚动到顶部时
        if(-newY < 0) {
          this.currentIndex = 0
          return
        }
        // 在中间滚动
        for(let i = 0; i < listHeight.length; i++) {
          let height1 = listHeight[i] //下限
          let height2 = listHeight[i+1] //上限
          if(!height2 || (-newY >= height1 && -newY < height2)) {
            // 列表的临近顶起效果：
            this.diff = height2 + newY
            //
            this.currentIndex = i
            return
          }
        }
        // 滚动到底部时
        this.currentIndex = listHeight.length - 1
      },
      diff(newVal) {
        // 顶起动画的距离。
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if(this.fixedTop === fixedTop) return 
        this.fixedTop = fixedTop
        // 使用DOM操作移动这么多的距离。
        // 使用translate3d激活快速渲染
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      Scroll,
      Loading
    },
    methods:{
      onShortcutTouchStart(e) {
        let anchorIndex = parseInt(getData(e.target, 'index'))

        let firstTouch = e.touches[0]
        // 这是一个给TouchMove做起点的变量。为了能让另一个方法共享到这个数值，需要做成listview的全局变量
        this.touch.y1= firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        
        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e) {
        // 起始触摸位置，移动y值距离，计算最终位置
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        // Tip: num | 0 == Math.floor(num)
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta

        this._scrollTo(anchorIndex)
      },
      scroll(pos){
        // 滚动时更新位置。计算标准。
        this.scrollY = pos.y
      },
      _scrollTo(index){
        // 增加按照index设定scrollY的代码：
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
        // 商品列表左右联动？
      },
      _calculateHeight() {
        // 如果列表DOM发生变化，那么需要重新计算各个DOM元素的高度。
        this.listHeight = []
        const list = this.$refs.listGroup
        // 遍历获取元素高度：
        let height = 0
        this.listHeight.push(height)
        // 对于每个listGroup计算高度
        for(let i = 0; i < list.length; i++){
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>