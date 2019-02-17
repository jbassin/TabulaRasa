import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const R = require('ramda');
const Granim = require('granim');

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
Vue.prototype.$background = (new Granim({
  element: '#gradient-background',
  direction: 'top-bottom',
  isPausedWhenNotInView: true,
  states: {
    'default-state': {
      gradients: [
        ['#A3A3A3', '#E8E8E8'],
        ['#E8E8E8', '#A3A3A3'],
      ],
      transitionSpeed: 10000,
    },
  },
}));

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
