// for testing
if (navigator.userAgent.indexOf("PhantomJS") > -1) {
  window.localStorage.clear();
}

export const mutations = {
  OPEN_WINDOW(state, window) {
    state.windowCount++
    window.id = state.windowCount

    state.windows.push(window);
  },

  CLOSE_WINDOW(state, id) {
    var removeIndex = state.windows.map((w) => w.id).indexOf(id)
    state.windows.splice(removeIndex, 1);
  },

  SET_ACTIVE(state, window_id) {
    console.log(window_id)
    const window = state.windows.filter(w => w.id === window_id)
    window[0].active = true
  },

  SET_INACTIVE(state, window_id) {
    state.windows.filter(w => w.id === window_id)[0].active = false
  }
};
