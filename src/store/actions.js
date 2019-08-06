import config from "../apps/appConfig";

export default {
  /* registerApps
      - registers all apps into the store */
  registerApps({ commit, state }) {
    const appCount = state.apps.length

    // if there are not the same number of apps, remove apps and windows
    if (appCount !== Object.keys(config).length) {
      // clear cache of apps first
      commit("CLEAR_APPS")
      commit("CLEAR_WINDOWS")

      for (let [name, props] of Object.entries(config)) {
        commit("ADD_APP", {
          name: name,
          props: props,
          open: false
        });
      }
    }
  },

  openWindow({ commit, state }, component) {
    // create hidden window and attach component
    // get config values for component
    var compConfig = config[component];

    var appAlreadyOpen = false;

    // set all other windows to inactive
    for (let window of state.windows) {
      if (window.component === component) {
        appAlreadyOpen = window.id;
      }
      commit("SET_WINDOW_INACTIVE", window.id);
    }

    // if the app is already open, just focus that window
    if (appAlreadyOpen) {
      commit("SET_WINDOW_ACTIVE", appAlreadyOpen);

      // otherwise open the app
    } else {
      commit("OPEN_APP", component);
      commit("OPEN_WINDOW", {
        component: component,
        x: 200,
        y: 200,
        w: compConfig.w,
        h: compConfig.h,
        resizable: compConfig.resizable,
        maxw: compConfig.maxw,
        maxh: compConfig.maxh,
        minw: compConfig.minw,
        minh: compConfig.minh,
        active: true,
        scroll: compConfig.scroll,
        icon: compConfig.icon || "",
        prettyName: compConfig.prettyName || compConfig.component,
      });
    }
  },

  setActiveWindow({ commit, state }, id) {
    // set all windows to inactive
    for (let window of state.windows) {
      commit("SET_WINDOW_INACTIVE", window.id);
    }

    // activate window with passed in id
    commit("SET_WINDOW_ACTIVE", id);
  },

  setInactiveWindow({ commit }, id) {
    // inactivate window with passed in id
    commit("SET_WINDOW_INACTIVE", id);
  },

  setWindowDimensions({ commit }, obj) {
    // set window position with obj (id, w, h)
    commit("SET_WINDOW_DIMENSIONS", obj);
  },

  setWindowPosition({ commit }, obj) {
    // set window position with obj (id, x, y)
    commit("SET_WINDOW_POSITION", obj);
  },

  closeWindow({ commit, getters }, id) {
    commit("CLOSE_APP", getters.getWindowById(id)[0].component);
    commit("CLOSE_WINDOW", id);
  },

  setQuoteOfDay({ commit }, obj) {
    commit("SET_QUOTE_OF_DAY", obj);
  },

  setDesktopPattern({ commit }, pattern) {
    commit("SET_DESKTOP_PATTERN", { pattern: pattern });
  },

  setDesktopPatternCell({ commit }, obj) {
    commit("SET_DESKTOP_PATTERN_CELL", obj);
  },

  setDesktopPrimaryColor({ commit }, color) {
    commit("SET_DESKTOP_PRIMARY_COLOR", color);
  },

  setDesktopSecondaryColor({ commit }, color) {
    commit("SET_DESKTOP_SECONDARY_COLOR", color);
  },
};
