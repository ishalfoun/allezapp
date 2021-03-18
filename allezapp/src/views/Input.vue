<template>
  <section>
    <h2 class='title mt-2'>Edit/Enter Routes</h2>
    <form @submit.prevent="onCreateRoute()" class="ml-4 mr-4">
      <b-field label="Route Num">
        <b-input v-model="route.routeNum" required></b-input>
      </b-field>
      <b-field label="Rating">
        <b-input v-model="route.rating" required></b-input>
      </b-field>
      <button class="button is-success">Add Route</button>
    </form>
  </section>
</template>

<script>
/* eslint-disable object-shorthand */
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    componentKey: 0,
    isBackUp: false,
    route: {
      routeNum: '',
      rating: '',
    },
  }),
  // When this component is mounted, we want to call the init
  // When you load a specific subreddit, the params have the name of given subreddit
  // so we call init for the one that has this name.
  mounted() {
    this.initRoutes();
  },
  computed: {
    ...mapState('input', ['routes']),
  },
  methods: {
    ...mapActions('input', ['createRoute', 'initRoutes']),
    async onCreateRoute() { // quick client side validation
      if (this.route.routeNum && this.route.rating) {
        await this.createRoute(this.route).then(() => { // pass route to save
          this.route.routeNum = '';
          this.route.rating = '';
        });
      }
    },
  },
  watch: {
  },
};
</script>

<style lang="scss" scoped>
</style>
