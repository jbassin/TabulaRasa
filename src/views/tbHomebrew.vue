<template>
  <div class="container">
    <div class="notification is-primary">
      <p class="title is-3">
        View and Modify Data:
      </p>
      <div class="tile is-ancestor">
        <div class="tile is-parent is-4 is-vertical">
          <tb-homebrew-selector v-for="(name, index) of this.homebrewItems"
                                :key="index"
                                :name="name"
                                :active-selector="activeSelector"
                                @click.native="activeSelector = name"/>
        </div>
        <div class="tile is-right-column">
          <transition name="fade" mode="out-in">
            <tb-homebrew-spells-view v-if="this.activeSelector === 'Spells'"/>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TbHomebrewSelector from '../components/homebrew/tbHomebrewSelector.vue';
import TbHomebrewSpellsView from '../components/homebrew/tbHomebrewSpellsView.vue';

export default {
  name: 'tbHomebrew',
  components: { TbHomebrewSelector, TbHomebrewSpellsView },
  data() {
    return {
      activeSelector: '',
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
};
</script>

<style scoped>
  .container {
    margin-top: 15px;
  }
  .is-ancestor {
    margin-left: 10px;
    margin-top: 15px;
    padding-bottom: 15px;
  }
  .is-right-column {
    margin-left: 10px;
  }
</style>
