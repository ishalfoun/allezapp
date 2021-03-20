<template>
  <div class='maincontainer' style="margin-top:0px!important">
    <br />
    <h1 class='title is-1 centered flex1'>Routes</h1>
    <!-- {{routes}} -->
    <b-table
    :mobile-cards="false"
    :data="routes"
    ref="table"
    :key="componentKey"
    paginated
    per-page="5"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page">

      <b-table-column field="id" label="ID" v-slot="props">
        {{props.row.id}}
      </b-table-column>

      <b-table-column field="routeNum" label="Route" v-slot="props">
        {{props.row.routeNum}}
      </b-table-column>

      <b-table-column field="rating" label="Rating" v-slot="props">
        {{props.row.rating}}
      </b-table-column>

      <template #footer v-if="(routes.length < 1)">
        <div class="has-text-right">
          No Records Found
        </div>
      </template>
    </b-table>

    <button @click="onGetRoutes()" class="button is-fullwidth
      is-teal title is-4 flex1">Get routes from server</button>

    <h1 class='title is-1 centered flex1'>ProfileRoutes</h1>

    <b-table
    :mobile-cards="false"
    :data="profileroutes"
    ref="table2"
    paginated
    per-page="5"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page">

      <b-table-column field="routeId" label="RouteId" v-slot="props">
        {{props.row.routeId}}
      </b-table-column>

      <b-table-column field="profileId" label="ProfileId" v-slot="props">
        {{props.row.profileId}}
      </b-table-column>

      <b-table-column field="cmp" label="Complleted" v-slot="props">
        {{props.row.cmp}}
      </b-table-column>

      <template #footer v-if="(profileroutes.length < 1)">
        <div class="has-text-right">
          No Records Found
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    componentKey: 0,
  }),
  mounted() {
    this.initRoutes();
  },
  computed: {
    ...mapState('data', ['routes', 'profileroutes']),
    ...mapState('profile', ['profile']),
  },
  methods: {
    ...mapActions('data', ['initRoutes', 'initProfileRoutes', 'getRoutes']),
    onGetRoutes() {
      this.getRoutes(this.profile[0]);
    },
  },
  watch: {
    profile() {
      if (this.profile[0]) {
        this.initProfileRoutes(this.profile[0].id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
html {
  height: 100%;
}
body {
  height: 100%;
}
</style>
