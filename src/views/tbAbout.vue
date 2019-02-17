<template>
  <div class="container">
    <div class="notification is-primary">
      <p class="title is-3">
        About this Program:
      </p>
      <div class="has-text-centered">
        <p>
          Current Version: {{ this.version.name }} ({{ this.version.number }})
        </p>
        <p>
          Local Data Path: {{ this.filepath }}
        </p>
        <p>
          <em>Joshua Bassin</em>, &copy;{{ this.currentYear }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tbAbout',
  computed: {
    version() {
      const { getter: configGetter } = this.$storeMutators(this, 'config');
      return {
        number: configGetter('versionNumber'),
        name: configGetter('versionName'),
      };
    },
    filepath() {
      const os = require('os');
      const path = require('path');
      return path.join(os.homedir(), '.tabularasa', 'data');
    },
    currentYear() {
      return (new Date()).getFullYear();
    },
  },
};
</script>

<style scoped>
  .container {
    margin-top: 15px;
  }
</style>
