// Store and update window related properties
import config from "../../apps/appConfig";

const state = {
  windows: [],
  windowCount: 0,
  activeWindow: null, // set to id of active window in [windows]
  activeWindowTitleText: null // if null, window will display app name
}

const getters = {
  getActiveWindow(state) {
    return state.windows.filter(w => w.id === state.activeWindow)[0];
  },
  getWindowById: (state) => (id) => {
    return state.windows.filter(w => w.id === id);
  }
}

const actions = {
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
        title: null,
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

  setWindowTitle({ commit }, { id, title }) {
    // set window title
    commit("SET_WINDOW_TITLE", { window_id: id, title: title } );
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

}

const mutations = {
  CLEAR_WINDOWS(state) {
    state.windows = []
  },

  OPEN_WINDOW(state, window) {
    state.windowCount++
    window.id = state.windowCount

    state.windows.push(window);
    state.activeWindow = window.id
  },

  CLOSE_WINDOW(state, id) {
    var removeIndex = state.windows.map(w => w.id).indexOf(id)
    state.windows.splice(removeIndex, 1);
  },

  SET_WINDOW_ACTIVE(state, window_id) {
    const window = state.windows.filter(w => w.id === window_id)
    window[0].active = true
    state.activeWindow = window_id
  },

  SET_WINDOW_TITLE(state, { window_id, title }) {
    const window = state.windows.filter(w => w.id === window_id)
    window[0].title = title
  },

  SET_WINDOW_INACTIVE(state, window_id) {
    state.windows.filter(w => w.id === window_id)[0].active = false
  },

  SET_WINDOW_DIMENSIONS(state, obj) {
    const window = state.windows.filter(w => w.id === obj.id)
    window[0].h = obj.h
    window[0].w = obj.w
  },

  SET_WINDOW_POSITION(state, obj) {
    const window = state.windows.filter(w => w.id === obj.id)
    window[0].x = obj.x
    window[0].y = obj.y
  },
}

export default {
    state,
    getters,
    actions,
    mutations
}
  