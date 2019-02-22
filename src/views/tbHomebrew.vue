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
              <li>
                <button class="button is-primary is-small"
                        @click="activeLetter = ''"
                        :class="[activeLetter === '' ? '' : 'has-text-link']">
                  All
                </button>
              </li>
              <li v-for="letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')"
                  :key="letter"
                  @click="activeLetter = letter">
                <button class="button is-primary is-small"
                        :class="[activeLetter === letter ? '' : 'has-text-link']">
                  {{ letter }}
                </button>
              </li>
            </ul>
          </nav>
          <transition-group name="blur">
            <tb-row-item v-for="rowEntry of filteredHomebrewData"
                         :key="rowEntry"
                         :name="rowEntry"/>
          </transition-group>
        </div>
      </div>
    </div>
    <div id="scroll-button">
      <a class="button is-rounded is-primary"
         @click="scrollToTop">
        <span class="icon is-large">
          <i class="fas fa-arrow-circle-up"></i>
        </span>
      </a>
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
      activeLetter: '',
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
  methods: {
    scrollToTop() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(this.scrollToTop);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    },
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
    filteredHomebrewData() {
      if (this.activeLetter === '') return this.sortedHomebrewData;
      return this.$R.filter(row => this.$R.head(row) === this.activeLetter.toUpperCase(), this.sortedHomebrewData);
    },
  },
};
</script>

<style scoped>
  @keyframes blur {
    from {
    }
    80% {
      opacity: 15%;
    }
    to {
      filter: blur(3px);
      opacity: 0;
    }
  }
  .blur-enter-active {
    -webkit-animation: 0.8s ease-in-out reverse both blur;
  }
  .blur-leave-active {
    -webkit-animation: 0.8s ease-in-out both blur;
  }
  .container {
    margin-top: 15px;
  }
  .is-right-column {
    margin-left: 10px;
  }
  .input {
    margin-bottom: 5px;
  }
  #scroll-button {
    position: fixed;
    right: 10px;
    bottom: 10px;
  }
</style>
