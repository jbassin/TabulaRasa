/* eslint-disable no-param-reassign */
const R = require('ramda');

const state = () => ({
  localSpells: [],
});

const mutations = {
  SET_SPELLS(store, { spells }) {
    store.localSpells = spells;
  },
};

const actions = {
  setSpells({ commit }, { spells }) {
    commit({
      type: 'SET_SPELLS',
      spells,
    });
  },
};

const getters = {
  spells(store) { return store.localSpells; },
  spellsClass(store) { return className => R.filter(spell => R.includes(R.toLower(className), R.map(R.toLower, spell.classes)), store.localSpells); },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
