import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './d2admin'
import demo from './demo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    d2admin,
    demo
  }
})
