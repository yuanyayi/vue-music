<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" ref="list" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'   
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'
  import {mapMutations} from 'vuex'

  const HOT_NAME = '热门'
  const HOT_SINGER_LENGTH = 10

  export default{
    data(){
      return {
        singers: []
      }
    },
    components: {
      ListView
    },
    created(){
      setTimeout(()=>{
        this._getSingerList()
      }, 20)
    },
    methods:{
      selectSinger(singer) {
        // 路由跳转
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res)=>{
          if(res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item,index)=>{
          // 热门列表：
          if(index < HOT_SINGER_LENGTH){
            map.hot.items.push(
              new Singer({
                id: item.Fsinger_mid,
                name: item.Fsinger_name
              })
            )
          }
          // 普通列表：
          const key = item.Findex 
          // 创建索引列表：
          if(!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          )
        })
        // console.log(map)
        // 索引排序：
        let hot = []
        let ret = []
        for(let key in map) {
          let val = map[key]
          if(val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }

        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })

        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
    .singer-content
      height: 100%
      overflow: hidden
</style>
