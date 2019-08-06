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
      prettyName: props.prettyName || name,
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

  SET_QUOTE_OF_DAY(state, { quote, author, background, date }) {
    state.quoteOfDay.quote = quote
    state.quoteOfDay.author = author
    state.quoteOfDay.background = background
    state.quoteOfDay.date = date
  },

  SET_DESKTOP_PATTERN(state, { pattern }) {
    state.desktopPattern = pattern
  },

  SET_DESKTOP_PATTERN_CELL(state, { row, col, value }) {
    state.desktopPattern[row].splice(col, 1, value)
  },

  SET_DESKTOP_PRIMARY_COLOR(state, color) {
    state.desktopColors.primary = color
  },

  SET_DESKTOP_SECONDARY_COLOR(state, color) {
    state.desktopColors.secondary = color
  },
};
