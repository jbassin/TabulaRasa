import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
// const DEBUG = false;

// const load = require('./scripts/init')(DEBUG);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
