import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import cache from "./utils/cache";

import time from "./modules/time";
import apps from "./modules/apps";
import windows from "./modules/windows";
import desktop from "./modules/desktop";

// apps
import notepad from "./apps/notepad";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    initialized: false,
    quoteOfDay: null
  },
  getters,
  actions,
  mutations,
  modules: {
    time, apps, windows, desktop,
    notepad
  },
  plugins: [cache],
  strict: debug
});
