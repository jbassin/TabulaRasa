<template>
  <div id="app">
    <tb-header/>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import TbHeader from './components/header/tbHeader.vue';

const DEBUG = false;
const load = require('./scripts/init')(DEBUG);

export default {
  name: 'app',
  components: { TbHeader },
  created() {
    const { setter: configSetter } = this.$storeMutators(this, 'config');
    configSetter('setVersion', {
      versionNumber: '0.1.0',
      versionName: 'Aboleth',
    });

    const { setter: spellSetter } = this.$storeMutators(this, 'spells');
    spellSetter('setSpells', {
      spells: load.spells,
    });

    const { setter: itemSetter } = this.$storeMutators(this, 'items');
    itemSetter('setItems', {
      items: load.items,
    });
  },
};
</script>

<style>
  @import "~@fortawesome/fontawesome-free/css/all.min.css";
  @import "~bulmaswatch/lux/bulmaswatch.min.css";
  @font-face {
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 400;
    src: local('Nunito Sans Regular'), local('NunitoSans-Regular'), url(https://fonts.gstatic.com/s/nunitosans/v3/pe0qMImSLYBIv1o4X1M8cce9I9s.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 100%;
    }
  }
  .fade-enter-active {
    -webkit-animation: 1.0s ease-in-out both fadeIn;
  }
  .fade-leave-active {
    -webkit-animation: 1.0s ease-in-out reverse both fadeIn;
  }
</style>
