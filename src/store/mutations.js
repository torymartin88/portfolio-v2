// for testing
if (navigator.userAgent.indexOf("PhantomJS") > -1) {
  window.localStorage.clear();
}

export default {
  SET_QUOTE_OF_DAY(state, quoteObj) {
    state.quoteOfDay = quoteObj
  },
};
