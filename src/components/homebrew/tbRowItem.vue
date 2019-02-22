<template>
  <div class="level">
    <div class="level-left">
      <p class="level-item subtitle is-6">
        {{ this.name }}
      </p>
    </div>
    <div class="level-right">
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
