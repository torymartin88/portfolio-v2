import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import VueResource from 'vue-resource'
import VueYoutube from 'vue-youtube'

import App from './App.vue'
import router from './router'
import store from './store'

// import external css
import './assets/styles/VueDraggableResizable.css'
import './assets/styles/webfonts.css'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueYoutube)

Vue.component('vue-draggable-resizable', VueDraggableResizable)

import appConfig from '@/apps/appConfig'

// setup global components for everything in the /src/app folder
for (let key in appConfig) {
    // Init global component for app (Key == Name of app)
    Vue.component(key, () => import(`@/apps/${key}.vue`))
}

// global directives
Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
