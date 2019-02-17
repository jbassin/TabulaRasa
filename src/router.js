import Vue from 'vue';
import Router from 'vue-router';
import tbLandingPage from './views/tbLandingPage.vue';
import tbCreate from './views/tbCreate.vue';
import tbAbout from './views/tbAbout.vue';
import tbQuit from './views/tbQuit.vue';
import tbHomebrew from './views/tbHomebrew.vue';

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
    }, {
      path: '/quit',
      name: 'quit',
      component: tbQuit,
    }, {
      path: '/homebrew',
      name: 'homebrew',
      component: tbHomebrew,
    },
  ],
});
