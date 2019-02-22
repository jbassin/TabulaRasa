<template>
  <div class="level">
    <div class="level-left">
      <p class="level-item subtitle is-6">
        {{ this.name }}
      </p>
    </div>
    <div class="level-right">
      <a class="button is-rounded is-primary is-small">
        <span class="icon is-small">
          <i class="fas fa-eye"></i>
        </span>
      </a>
      <a class="button is-rounded is-primary is-small">
        <span class="icon is-small">
          <i class="fas fa-edit"></i>
        </span>
      </a>
      <a class="button is-rounded is-primary is-small">
        <span class="icon is-small">
          <i class="fas fa-times-circle"></i>
        </span>
      </a>
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
