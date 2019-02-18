<template>
  <div class="notification enter-smooth"
       :class="isSelected">
    <div class="level">
      <div class="level-left"></div>
      <div class="level-item subtitle is-5">
        {{ this.name }}
      </div>
      <div class="level-right"></div>
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
    margin-bottom: 5px;
  }
  .selected {
    -webkit-animation: select 1.0s ease-in-out normal both;
  }
  .deselected {
    -webkit-animation: deselect 1.0s ease-in-out normal both;
  }
  .title {
    padding-bottom: 8px;
  }
</style>
