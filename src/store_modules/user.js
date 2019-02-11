/* eslint-disable no-param-reassign */
const state = () => ({
  username: '',
  password: '',
  nickname: '',
  admin: false,
});

const mutations = {
  SET_USERNAME: (store, { username }) => {
    store.username = username;
  },
  SET_PASSWORD: (store, { password }) => {
    store.password = password;
  },
  SET_NICKNAME: (store, { nickname }) => {
    store.nickname = nickname;
  },
  SET_ADMIN: (store, { admin }) => {
    store.admin = admin;
  },
};

const actions = {
  login: ({ commit }, {
    username, password, nickname, admin,
  }) => {
    commit({
      type: 'SET_USERNAME',
      username,
    });
    commit({
      type: 'SET_PASSWORD',
      password,
    });
    commit({
      type: 'SET_NICKNAME',
      nickname,
    });
    commit({
      type: 'SET_ADMIN',
      admin,
    });
  },
  setUserInfo: (context, payload) => {
    if (payload.userInfo === null) {
      payload.userInfo = {
        username: '',
        password: '',
      };
    }
    localStorage.setItem('userInfo', JSON.stringify(payload.userInfo));
    context.commit({
      type: 'SET_USER_INFO',
      userInfo: payload.userInfo,
    });
  },
};

const getters = {
  isLoggedIn: store => store.username !== '',
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
