import localForage from 'localforage';
import localforageGetItems from 'localforage-getitems'; //eslint-disable-line no-unused-vars

const store = localForage.createInstance({
  name: 'app',
  version: 1.0,
  storeName: 'classicdb'
});

/**
 * mapStateForCache
 * make any changes to state object before caching here
 * @param {*} state - vuex state
 */
const mapStateForCache = (state) => {
  return state
}

export const setState = (state) => {
  const promises = [];

  const cachedState = mapStateForCache(state);

  return new Promise((resolve, reject) => {
    for (let [key, value] of Object.entries(cachedState)) {
      promises.push(store.setItem(key, value));
    }

    Promise.all(promises)
    .then(result => {
      resolve(result);
    })
    .catch(error => {
      reject(error);
    })
  });
}

export const getState = (fetchKey) => {
  if (fetchKey) {
    return store.getItem(fetchKey);
  } else {
    return store.getItems().then(resultObj => {
      return Promise.resolve(resultObj);
    });
  }
}

export const deleteState = (fetchKey) => {
  if (fetchKey) {
    return store.removeItem(fetchKey);
  } else {
    return store.removeItems()
  }
}
