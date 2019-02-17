<template>
  <div id="app">
    Hello
  </div>
</template>

<script>
const DEBUG = false;
const load = require('./scripts/init')(DEBUG);

export default {
  name: 'app',
  created() {
    const { getter: itemGetter, setter: itemSetter } = this.$storeMutators(this, 'items');
    const { getter: spellGetter, setter: spellSetter } this.$storeMutators(this, 'spells')
    itemSetter('setItems', { items: load.items });
    console.log(itemGetter('weapons'));
  },
};
</script>

<style>

</style>
