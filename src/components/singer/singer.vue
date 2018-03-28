<template>
  <div class="singer" ref="singer">
      <ul style="padding-left: 20px;">
        <li v-for="singer in singers" style="margin: 5px 0;">
          {{singer.Fsinger_name}}
        </li>
      </ul>
    <!-- <list-view @select="selectSinger" :data="singers" ref="list"></list-view> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'

  export default{
    data(){
      return {
        singers: []
      }
    },
    created(){
      setTimeout(()=>{
        this._getSingerList()
      }, 20)
    },
    methods:{
      _getSingerList() {
        getSingerList().then((res)=>{
          if(res.code === ERR_OK) {
            console.log(res.data.list)
            this.singers = res.data.list
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
