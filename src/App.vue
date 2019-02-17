<template>
  <div id="app">
    <tb-header/>
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
    const { getter: itemGetter, setter: itemSetter } = this.$storeMutators(this, 'items');
    const { getter: spellGetter, setter: spellSetter } = this.$storeMutators(this, 'spells');
    itemSetter('setItems', { items: load.items });
    console.log(itemGetter('shields'));
    spellSetter('setSpells', { spells: load.spells });
    const spellClassLookup = className => spellGetter('spellsClass')(className);
    console.log(spellClassLookup('bard'));
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
</style>
