// for testing
if (navigator.userAgent.indexOf("PhantomJS") > -1) {
  window.localStorage.clear();
}

export const mutations = {
  CLEAR_APPS(state) {
    state.apps = []
  },

  ADD_APP(state, { name, props, open }) {
    state.apps.push({
      name: name,
      icon: props.icon,
      open: open
    })
  },

  OPEN_APP(state, name) {
    const app = state.apps.filter(a => a.name === name)
    app[0].open = true
  },

  CLOSE_APP(state, name) {
    const app = state.apps.filter(a => a.name === name)
    app[0].open = false
  },

  CLEAR_WINDOWS(state) {
    state.windows = []
  },

  OPEN_WINDOW(state, window) {
    state.windowCount++
    window.id = state.windowCount

    state.windows.push(window);
  },

  CLOSE_WINDOW(state, id) {
    var removeIndex = state.windows.map(w => w.id).indexOf(id)
    state.windows.splice(removeIndex, 1);
  },

  SET_WINDOW_ACTIVE(state, window_id) {
    const window = state.windows.filter(w => w.id === window_id)
    window[0].active = true
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
};
