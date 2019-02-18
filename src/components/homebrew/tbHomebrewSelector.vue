<template>
  <div class="tile notification enter-smooth"
       :class="isSelected">
    <div class="has-text-centered has-text-white">
      <p class="is-subtitle is-4">{{ this.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tbHomebrewSelector',
  props: {
    activeSelector: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
  },
  computed: {
    isSelected() {
      if (this.activeSelector.toLowerCase() === this.name.toLowerCase()) return 'selected';
      return 'deselected';
    },
  },
};
</script>

<style scoped>
  @keyframes select {
    0% {
      background-color: #7D858D;
    }
    100% {
      background-color: #318AF1;
    }
  }
  @keyframes deselect {
    100% {
      background-color: #7D858D;
    }
    0% {
      background-color: #318AF1;
    }
  }
  .enter-smooth {
    animation-duration: 1.0s;
    animation-direction: normal;
    animation-timing-function: ease-in-out;
    animation-delay: 2.0s;
    animation-fill-mode: both;
    animation-name: fadeIn;
  }
  .selected {
    -webkit-animation: select 1.0s ease-in-out normal both;
  }
  .deselected {
    -webkit-animation: deselect 1.0s ease-in-out normal both;
  }
</style>
