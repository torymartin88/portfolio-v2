import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'

import App from './App.vue'
import router from './router'
import store from './store'

import './assets/styles/VueDraggableResizable.css'
import './assets/styles/webfonts.css'

Vue.config.productionTip = false
Vue.component('vue-draggable-resizable', VueDraggableResizable)

// dynamic app imports
Vue.component('Calculator', () => import('@/apps/Calculator.vue'))
Vue.component('Weather', () => import('@/apps/Weather.vue'))
Vue.component('Notepad', () => import('@/apps/Notepad.vue'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
