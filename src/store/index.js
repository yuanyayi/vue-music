// vuex入口文件
import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 打印日志
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// 线下调试
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug, // 严格模式
  plugins: debug ? [createLogger()] : [] // 插件(数组)
})