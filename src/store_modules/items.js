/* eslint-disable no-param-reassign */
const R = require('ramda');

const state = () => ({
  localItems: [],
});

const mutations = {
  SET_ITEMS(store, { items }) {
    store.localItems = items;
  },
};

const actions = {
  setItems({ commit }, { items }) {
    commit({
      type: 'SET_ITEMS',
      items,
    });
  },
};

const getters = {
  items(store) { return store.localItems; },
  weapons(store) { return R.filter(item => item.weapon.isWeapon, store.localItems); },
  armor(store) { return R.filter(item => item.armor.isArmor, store.localItems); },
  magic(store) { return R.filter(item => item.magic.isMagic, store.localItems); },
  shields(store) { return R.filter(item => item.type.toLowerCase() === 'shield', store.localItems); },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
