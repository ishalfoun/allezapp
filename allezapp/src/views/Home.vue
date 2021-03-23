<template>
  <div class='maincontainer' style="margin-top:0px!important">
    <br />
    <h1 class='title is-1 centered flex1'>Routes</h1>
    <h5 v-if="profile[0] && profile[0].lastUpdate">
      last update on profile: {{profile[0].lastUpdate.toDate()}}}</h5>
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

      <b-table-column field="routeNum" label="Route" v-slot="props">
        {{props.row.routeNum}}
      </b-table-column>

      <b-table-column field="rating" label="Rating" v-slot="props">
        {{props.row.rating}}
      </b-table-column>

      <b-table-column field="cmp" label="Completed" v-slot="props">
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
/* eslint-disable */

export default {
  data: () => ({
    componentKey: 0,
    happenedAlready: false,
    happenedAlreadyGetRoutes: false,
  }),
  mounted() {
    this.initRoutes();
  },
  computed: {
    ...mapState('data', ['routes', 'profileroutes']),
    ...mapState('profile', ['profile']),
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions('data', ['initRoutes', 'initProfileRoutes', 'getRoutes']),
    onGetRoutes() {
      this.getRoutes(this.profile[0]);
    },
    wait(timeout) { // await wait(500);
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      });
    },
  },
  watch: {
    async profile() {
          // console.log('1. in initProfileRoutes happened=', this.happenedAlready);
      if (!this.happenedAlready) {
        if (this.profile[0]) { // if user is logged in
        // console.log('if (!this.happenedAlready &&  this.profile[0]: true');
          this.initProfileRoutes(this.profile[0].id);
          // this.getRoutes(this.profile[0]);
          this.happenedAlready = true;
          // this.wait(3000).then(() => {
          //   this.happenedAlready = false;
          // });
        } 
      }
    },
    async profileroutes() {
      // console.log('2. in routesWatch(): happened=', this.happenedAlreadyGetRoutes);
      if (!this.happenedAlreadyGetRoutes) {
        // console.log('2.         routes.length=', (this.routes.length )); 
        if (this.routes.length >0) {
            this.getRoutes(this.profile[0]);
            this.happenedAlreadyGetRoutes = true;
          }
        }
    }
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
