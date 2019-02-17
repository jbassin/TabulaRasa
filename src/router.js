import Vue from 'vue';
import Router from 'vue-router';
import tbLandingPage from './views/tbLandingPage.vue';
import tbCreate from './views/tbCreate.vue';
import tbAbout from './views/tbAbout.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: tbLandingPage,
    }, {
      path: '/create',
      name: 'create',
      component: tbCreate,
    }, {
      path: '/about',
      name: 'about',
      component: tbAbout,
    },
  ],
});
