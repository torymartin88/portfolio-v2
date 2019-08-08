// Store and update app related properties
import config from "../../apps/appConfig";

/**
 * Props from AppConfig
 * @typedef {object} props
 * @param {String} icon - name of icon for app
 * @param {String} prettyName - pretty name of app
 * @param {Boolean} showInDock - show this app in the dock? 
 */

/**
 * Example app Object
 * 
 * @param {String} name - Name of app component
 * @param {String} icon - Name of icon for app
 * @param {String} prettyName - Pretty name 
 * @param {Boolean} open - Is app open?
 * @param {Boolean} showInDock - show this app in the dock? 
 */

const state = {
  apps: [],
}

export const getters = {
  getDockApps: state => {
    return state.apps.filter(a => a.showInDock === true);
  },
}

export const actions = {
  /* registerApps
   * registers all apps into the store */
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
}

export const mutations = {
  CLEAR_APPS(state) {
    state.apps = []
  },

  /**
   * ADD_APP
   * @param {*} state - Vuex state
   * @param {String} name - Name of app component
   * @param {props} props - {@link props} from AppConfig
   */
  ADD_APP(state, { name, props }) {
    state.apps.push({
      name: name,
      icon: props.icon,
      prettyName: props.prettyName || name,
      open: false,
      showInDock: (props.showInDock === false) ? false : true
    })
  },

  /**
   * OPEN_APP
   * @param {*} state - Vuex state
   * @param {String} name - Name of app to open
   */
  OPEN_APP(state, name) {
    const app = state.apps.filter(a => a.name === name)
    app[0].open = true
  },

  /**
   * CLOSE_APP
   * @param {*} state - Vuex state
   * @param {String} name - Name of app to close
   */
  CLOSE_APP(state, name) {
    const app = state.apps.filter(a => a.name === name)
    app[0].open = false
  },
}

export default {
    state,
    getters,
    actions,
    mutations
}
  