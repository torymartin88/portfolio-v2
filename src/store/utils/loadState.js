import store from '../index';
import { getState } from './storage';

export default function () {
  if (store.initialized) {
    return Promise.resolve()
  }

  return getState()
    .then(state => store.commit('LOAD_FROM_CACHE', state));
}
