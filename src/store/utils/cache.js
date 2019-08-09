/**
 *  vuex plugin to save results to cache
 * */ 

import { setState } from './storage'

/**
 * shouldSkipCache
 * return if mutation is one that we want to cache
 * @param {*} mutation - mutation from vuex
 */
const shouldSkipCache = (mutation) => {
  return mutation ? false : true;
}

const plugin = (store) => {
  store.subscribe((mutation, state) => {
    if (!shouldSkipCache(mutation)) {
      // write state to cache
      setState(state).catch(err => console.warn('Failed to cache state', err))
    }
  })
}

export default plugin
