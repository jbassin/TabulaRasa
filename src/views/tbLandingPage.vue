<template>
  <div class="container has-text-centered">
    <div class="columns">
      <div class="column is-one-fifth is is-offset-two-fifths landing-page-buttons">
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
          destination: '/about',
          text: 'About this Program',
        }, {
          destination: '/quit',
          text: 'Quit the Program',
        },
      ],
    };
  },
};
</script>

<style scoped>
  .landing-page-buttons {
    margin-top: 145px;
  }
</style>
