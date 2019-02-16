/* eslint-disable no-param-reassign */
const state = () => ({
  items: [],
});

const mutations = {
  ADD_ITEM: (store, { item }) => {
    store.items = this.$R.append(item, store.items);
  },
};

const actions = {
  setItems: ({ commit }, { items }) => {
    this.$R.map(item => commit({
      type: 'ADD_ITEM',
      item,
    }), items);
  },
};

const getters = {
  items: store => store.items,
  weapons: store => this.$R.filter(item => item.weapon.isWeapon, store.items),
  armor: store => this.$R.filter(item => item.armor.isArmor, store.items),
  magic: store => this.$R.filter(item => item.magic.isMagic, store.items),
  shields: store => this.$R.filter(item => item.type.toLowerCase() === 'shield', store.items),
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
