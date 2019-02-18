<template>
  <div class="level">
    <div class="level-left">
      <p class="subtitle is-6">
        {{ this.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tbRowItem',
  props: {
    name: {
      required: true,
      type: String,
    },
  },
};
</script>

<style scoped>
  .level {
    border-bottom: 1px solid grey;
  }
</style>
