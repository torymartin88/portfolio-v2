import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./actions";

import time from "./modules/time";
import apps from "./modules/apps";
import windows from "./modules/windows";
import desktop from "./modules/desktop";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    quoteOfDay: null
  },
  getters,
  actions,
  mutations,
  modules: {
    time, apps, windows, desktop
  },
  plugins: [new VuexPersistence().plugin],
  strict: debug
});
