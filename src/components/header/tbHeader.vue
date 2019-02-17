<template>
  <div class="container has-text-centered"
       :class="header">
    <div class="notification is-primary">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <router-link tag="button"
                         to="/"
                         class="button is-large is-primary">
              <span class="icon">
                <transition name="fade">
                  <i v-if="!isRoot"
                     class="fas fa-home fa-lg"></i>
                </transition>
              </span>
            </router-link>
          </div>
        </div>
        <div class="level-item">
          <p class="title is-1">
            Tabula Rasa
          </p>
        </div>
        <div class="level-right"></div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tbHeader',
  computed: {
    isRoot() {
      return this.$route.path === '/';
    },
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
    }
    to {
      top: 100px;
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
    animation-timing-function: ease-in-out;
    top: 100px;
  }
  .moveUp {
    animation-name: moveUp;
    animation-duration: 2s;
    animation-timing-function: ease-out;
    top: 0;
  }
</style>
