<template>
  <transition name="myslide">
    <music-list :bg-image="bgImage" :songs="songs" :title="title"></music-list>
  </transition>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
// mapGetters: 语法糖，vuex自带，数组
import {getSingerDetails} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'

import MusicList from 'components/music-list/music-list'

export default {
  data (){
    return {
      songs: [],
    }
  },
  computed: {
    ...mapGetters([
      'singer' // 刷新页面就没有了
    ]),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    }
  },
  components: {
    MusicList
  },
  created() {
    this._getSingerDetails()
  },
  methods: {
    _getSingerDetails(){
      if(!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetails(this.singer.id).then((res)=>{
        if(res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs(list) {
      let result = []
      list.forEach((item,index)=>{
        // ES6特性-解构赋值：当属性名与变量名一致时，可以简写：
        let {musicData} = item
        if(musicData.songid && musicData.albummid){
          result.push(createSong(musicData))
        }
      })
      return result
    }
  }
}

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
