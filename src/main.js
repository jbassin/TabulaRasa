import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
const DEBUG = false;

const R = require('ramda');

Vue.prototype.$R = R;

Vue.prototype.$storeGet = R.curry(function storeGet(namespace, variable) {
  return this.$store.state[namespace][variable];
});

Vue.prototype.$storeSet = R.curry(function storeSet(namespace, command, ...rest) {
  return this.$store.dispatch({
    type: `${namespace}/${command}`,
    ...rest,
  });
});

Vue.prototype.$storeMutators = function storeMutators(namespace) {
  return {
    getter: this.$storeGet(namespace),
    setter: this.$storeSet(namespace),
  };
};

const load = require('./scripts/init')(DEBUG);

console.log(load);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
