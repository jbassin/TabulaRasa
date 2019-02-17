<template>
  <div class="container has-text-centered"
       :class="header">
    <div class="notification is-primary">
      <p class="title is-1">
        Tabula Rasa
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tbHeader',
  computed: {
    header() {
      if (this.$route.path === '/') return 'moveDown';
      return 'moveUp';
    },
  },
};
</script>

<style scoped>
  .container {
    margin-top: 15px;
  }
  @keyframes moveDown {
    from {
      top: 0;
      opacity: 0;
    }
    to {
      top: 100px;
      opacity: 100%;
    }
  }
  @keyframes moveUp {
    from {
      top: 100px;
    }
    to {
      top: 0;
    }
  }
  .moveDown {
    animation-name: moveDown;
    animation-duration: 2s;
    top: 100px;
  }
  .moveUp {
    animation-name: moveUp;
    animation-duration: 2s;
    top: 0px;
  }
</style>
