import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import { mutations } from "./mutations";
import actions from "./actions";

import time from "./modules/time";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    apps: [],
    windows: [],
    windowCount: 0,
    desktopPattern: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    activeWindow: null,
    quoteOfDay: null
  },
  getters: {
    getActiveWindow: state => {
      return state.windows.filter(w => w.id === state.activeWindow)[0];
    },
    getWindowById: state => id => {
      return state.windows.filter(w => w.id === id);
    }
  },
  actions,
  mutations,
  modules: {
    time
  },
  plugins: [new VuexPersistence().plugin],
  strict: debug
});
