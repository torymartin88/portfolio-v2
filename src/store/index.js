import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import actions from './actions'

import time from './modules/time'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        windows: [],
        windowCount: 0,
        activeWindow: null
    },
    getters: {
        getActiveWindow: state => {
            return state.activeWindow
        },
        getWindowById: (state) => (id)  =>{
            return state.windows.filter(w => w.id === id)
        }
    },
    actions,
    mutations,
    modules: {
        time,
    },
    strict: debug
})
