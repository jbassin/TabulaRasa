import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const R = require('ramda');

Vue.prototype.$R = R;
Vue.prototype.$storeGet = R.curry((vm, namespace, variable) => vm.$store.getters[`${namespace}/${variable}`]);
Vue.prototype.$storeSet = R.curry((vm, namespace, command, rest) => vm.$store.dispatch({
  type: `${namespace}/${command}`,
  ...rest,
}));
Vue.prototype.$storeMutators = (vm, namespace) => ({
  getter: vm.$storeGet(vm, namespace),
  setter: vm.$storeSet(vm, namespace),
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
