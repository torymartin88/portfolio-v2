import config from '../apps/appConfig'

export default {
  openWindow({ commit, state }, component) {
    // create hidden window and attach component
    // get config values for component
    var compConfig = config[component]

    var appAlreadyOpen = false

    // set all other windows to inactive
    for (let window of state.windows) {
      if (window.component === component) {
        appAlreadyOpen = window.id
      }
      commit("SET_INACTIVE", window.id)
    }

    // if the app is already open, just focus that window
    if (appAlreadyOpen) {
      commit("SET_ACTIVE", appAlreadyOpen)

    // otherwise open the app
    } else {
      commit("OPEN_WINDOW", {
        component: component,
        x: 200,
        y: 200,
        w: compConfig.w,
        h: compConfig.h,
        maxw: compConfig.maxw,
        maxh: compConfig.maxh,
        minw: compConfig.minw,
        minh: compConfig.minh,
        active: true
      });
    }
  },

  setActiveWindow({ commit, state }, id) {
    // set all windows to inactive
    for (let window of state.windows) {
      commit("SET_INACTIVE", window.id)
    }

    // activate window with passed in id
    commit("SET_ACTIVE", id)
  },

  closeWindow({ commit }, id) {
    commit("CLOSE_WINDOW", id);
  },
};
