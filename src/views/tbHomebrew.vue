<template>
  <div class="container">
    <div class="notification is-primary">
      <p class="title is-3">
        View and Modify Data:
      </p>
      <div class="columns">
        <div class="column is-4 is-vertical">
          <input class="input"
                 type="text"
                 placeholder="Search Here"
                 v-model="searchBar">
          <tb-homebrew-selector v-for="(name, index) of this.homebrewItems"
                                :key="index"
                                :name="name"
                                :active-selector="activeSelector"
                                @click.native="activeSelector = name"/>
        </div>
        <div class="column is-right-column">
          <nav class="breadcrumb has-dot-separator is-small is-centered" aria-label="breadcrumbs">
            <ul>
              <li><button class="button is-primary is-small">All</button></li>
              <li v-for="letter of 'abcdefghijklmnopqrstuvwxyz'.split('')"
                  :key="letter"><button class="button is-primary is-small">{{ letter }}</button></li>
            </ul>
          </nav>
          <transition-group name="fade" mode="out-in">
            <tb-row-item v-for="rowEntry of sortedHomebrewData"
                         :key="rowEntry"
                         :name="rowEntry"/>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TbHomebrewSelector from '../components/homebrew/tbHomebrewSelector.vue';
import TbRowItem from '../components/homebrew/tbRowItem.vue';

export default {
  name: 'tbHomebrew',
  components: { TbRowItem, TbHomebrewSelector },
  data() {
    return {
      activeSelector: '',
      searchBar: '',
      homebrewItems: [
        'Races',
        'Classes',
        'Subclasses',
        'Spells',
        'Feats',
        'Items',
      ],
    };
  },
  computed: {
    homebrewData() {
      switch (this.activeSelector) {
        case 'Spells': return this.$storeMutators(this, 'spells').getter('spells');
        case 'Items': return this.$storeMutators(this, 'items').getter('items');
        default: return [];
      }
    },
    sortedHomebrewData() {
      const rowNames = this.$R.map(row => row.name, this.homebrewData);
      if (this.searchBar.length <= 3) return rowNames;
      const stringSimilarities = require('string-similarity').findBestMatch(this.searchBar, rowNames);
      const sortedStringSimilarities = this.$R.map(row => row.target, this.$R.filter(row => row.rating > 0.2, this.$R.sortBy(this.$R.prop('rating'))(stringSimilarities.ratings)));
      return this.$R.reverse(sortedStringSimilarities);
    },
  },
};
</script>

<style scoped>
  .container {
    margin-top: 15px;
  }
  .is-right-column {
    margin-left: 10px;
  }
  .input {
    margin-bottom: 5px;
  }
</style>
