<template>
  <div class="container has-text-centered">
    <div class="columns">
      <div class="column is-one-fifth is is-offset-two-fifths notification is-white">
        <tb-landing-page-button v-for="(button, index) in this.buttons"
                                :key="index"
                                :destination="button.destination"
                                :text="button.text"
                                :transition-offset="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import TbLandingPageButton from '../components/landing_page/tbLandingPageButton.vue';

export default {
  name: 'tbLandingPage',
  components: { TbLandingPageButton },
  data() {
    return {
      buttons: [
        {
          destination: '/create',
          text: 'Create a Character',
        }, {
          destination: '/character',
          text: 'Load a Character',
        }, {
          destination: '/homebrew',
          text: 'View and Modify Data',
        }, {
          destination: '/info',
          text: 'About this Program',
        },
      ],
    };
  },
};
</script>

<style scoped>
  .notification {
    margin-top: 145px;
  }
</style>
