// Store and update desktop related properties
const foregroundLight = "#ffffff";
const foregroundDark = "#000000";

const state = {
  icons: [],
  backgroundPattern: [
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1]
  ],
  themeColor: "#E6E8E8",
  colorOptions: [
    {
      name: "white",
      hex: "#E6E8E8",
      secondary: "#D2D0D0",
      foreground: foregroundDark
    },
    {
      name: "black",
      hex: "#20242b", // $pepper500
      secondary: "#000000",
      foreground: foregroundLight
    },
    {
      name: "blue",
      hex: "#2e7ab8", // $blackberry500
      secondary: "#205586",
      foreground: foregroundLight
    },
    {
      name: "red",
      hex: "#bf2e3a", // $strawberry500
      secondary: "#991525",
      foreground: foregroundLight
    },
    {
      name: "green",
      hex: "#3ca666", // $kiwi500
      secondary: "#258049",
      foreground: foregroundLight
    },
    {
      name: "lightblue",
      hex: "#4ec3e0", // $blueberry400
      secondary: "#2c96b0",
      foreground: foregroundDark
    },
    {
      name: "orange",
      hex: "#de8d37", // $tangerine500
      secondary: "#944a00",
      foreground: foregroundDark
    },
    {
      name: "pink",
      hex: "#ba4182", // $pomegranate500
      secondary: "#842256",
      foreground: foregroundLight
    },
    {
      name: "yellow",
      hex: "#deb743", // $banana400
      secondary: "#bf942e",
      foreground: foregroundDark
    }
  ]
};

const getters = {
  /**
  * getColorPallete - returns array of color pallete hex values
  * @param {*} state - Vuex State
  * @returns {Array} Hex color values as an array
  */
  getColorPallete(state) {
    return state.colorOptions.map(c => c.hex)
  },

  /**
   * getIconColor - returns icon color based on background color
   * @param {*} state - Vuex State
   * @returns {String} Hex color value
   */
  getIconColor(state) {
    return state.colorOptions.filter(c => c.hex.toLowerCase() === state.themeColor.toLowerCase())[0].foreground
  },


  /**
   * getThemeName - returns theme name based on background color
   * @param {*} state - Vuex State
   * @returns {String} Name as string
   */
  getThemeName(state) {
    return state.colorOptions.filter(c => c.hex.toLowerCase() === state.themeColor.toLowerCase())[0].name
  },

  getThemeSecondaryColor(state) {
    return state.colorOptions.filter(c => c.hex.toLowerCase() === state.themeColor.toLowerCase())[0].secondary
  }
};

const actions = {
  setBackgroundPattern({ commit }, pattern) {
    commit("SET_DESKTOP_PATTERN", { pattern: pattern });
  },

  setBackgroundPatternCell({ commit }, obj) {
    commit("SET_DESKTOP_PATTERN_CELL", obj);
  },

  setThemeColor({ commit }, color) {
    commit("SET_THEME_COLOR", color);
  },
};

const mutations = {
  SET_DESKTOP_PATTERN(state, { pattern }) {
    state.backgroundPattern = pattern;
  },

  SET_DESKTOP_PATTERN_CELL(state, { row, col, value }) {
    state.backgroundPattern[row].splice(col, 1, value);
  },

  SET_THEME_COLOR(state, color) {
    state.themeColor = color;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
