<template>
  <div  class="tbLandingPageButton"
        :style="tbLandingPageButton">
    <router-link :to="destination"
                 tag="button"
                 class="button is-primary">
      {{ this.text }}
    </router-link>
    <br>
  </div>
</template>

<script>
export default {
  name: 'tbLandingPageButton',
  props: {
    destination: {
      required: true,
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
    transitionOffset: {
      required: true,
      type: Number,
    },
  },
  computed: {
    tbLandingPageButton() {
      return `animation-delay: ${this.transitionOffset * 0.5 + 0.8}s`;
    },
  },
};
</script>

<style scoped>
  @keyframes enter {
    from {
      opacity: 0;
    }
    to {
      opacity: 100%;
    }
  }
  .tbLandingPageButton {
    margin-top: 15px;
    opacity: 1%;
    animation: enter 1.5s both;
  }
</style>
