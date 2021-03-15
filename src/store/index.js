import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initStatus: '',
    map_lnglat: [116.397428, 39.90923],
    SoundSwitch: "关"
  },
  mutations: {
    changeStatus(state, status) {  //  重复赋值
      state.initStatus = status;
    },
    set_map(state, status) {  //  重复赋值
      state.map_lnglat = status;
    },
    SoundSwitchFun(state, status) {  //  重复赋值
      state.SoundSwitch = status;
    },
  },
  actions: {
  },
  modules: {
  }
})
