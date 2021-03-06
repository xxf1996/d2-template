// 全局注册的组件
import Vue from 'vue'

import D2Container from './d2-container'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', D2Container)
Vue.component('d2-page-cover', () => import('./d2-page-cover/Index.vue'))
Vue.component('d2-icon', () => import('./d2-icon/Index.vue'))
Vue.component('d2-icon-svg', () => import('./d2-icon-svg/Index.vue'))
