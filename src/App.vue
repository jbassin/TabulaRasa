<template>
  <div id="app" class="container">
    <h1 class="title is-1">
      Hello
    </h1>
  </div>
</template>

<script>
const DEBUG = false;
const load = require('./scripts/init')(DEBUG);

export default {
  name: 'app',
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
  @import "~bulmaswatch/lux/bulmaswatch.min.css";
  @import "~@fortawesome/fontawesome-free/css/all.min.css";
</style>
