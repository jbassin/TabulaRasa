/* eslint-disable no-param-reassign */

const state = () => ({
  localVersionNumber: '0.0.0',
  localVersionName: '',
});

const mutations = {
  SET_VERSION_NUMBER(store, { versionNumber }) {
    store.localVersionNumber = versionNumber;
  },
  SET_VERSION_NAME(store, { versionName }) {
    store.localVersionName = versionName;
  },
};

const actions = {
  setVersion({ commit }, { versionNumber, versionName }) {
    commit({
      type: 'SET_VERSION_NUMBER',
      versionNumber,
    });
    commit({
      type: 'SET_VERSION_NAME',
      versionName,
    });
  },
};

const getters = {
  versionNumber(store) { return store.localVersionNumber; },
  versionName(store) { return store.localVersionName; },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
