import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const R = require('ramda');

const addNewVueFunction = (name, value) => {
  Object.defineProperty(Vue.prototype, `$${name}`, { value });
};

addNewVueFunction('R', R);
addNewVueFunction('storeGet', R.curry((vm, namespace, variable) => vm.$store.getters[`${namespace}/${variable}`]));
addNewVueFunction('storeSet', R.curry((vm, namespace, command, rest) => vm.$store.dispatch({
  type: `${namespace}/${command}`,
  ...rest,
})));
addNewVueFunction('storeMutators', (vm, namespace) => ({
  getter: vm.$storeGet(vm, namespace),
  setter: vm.$storeSet(vm, namespace),
}));

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
