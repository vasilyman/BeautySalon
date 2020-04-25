import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    me: null
  },
  mutations: {
    SET_ME (state, data) {
      state.me = data
    }
  },
  actions: {
  },
  modules: {
  }
})
