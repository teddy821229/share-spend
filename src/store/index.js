import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: -1,
      name: '',
      account: '',
      avatar: '',
    },
    isAuthenticate: false
  },
  mutations: {
    setCurrentUser(state, userData) {
      state.user = {
        ...state.user,
        ...userData
      },
      state.isAuthenticate = true
    }
  },
  actions: {
  },
  modules: {
  }
})
