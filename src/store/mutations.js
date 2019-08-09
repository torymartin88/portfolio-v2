export default {
  LOAD_FROM_CACHE(state, cached) {
    if (cached) {
      Object.keys(cached).forEach(key => {
        state[key] = Object.assign({}, state[key], cached[key]);
      });
    }

    state.initialized = true;
  },
  SET_QUOTE_OF_DAY(state, quoteObj) {
    state.quoteOfDay = quoteObj
  },
};
