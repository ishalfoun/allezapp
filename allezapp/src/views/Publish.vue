<template>
  <div class='maincontainer' style="margin-top:0px!important">
    <!-- <h1 class='title is-1 centered flex1'>Added</h1> -->
    <!-- <div>(route) (rating) (id)</div>
    <div>(route) (rating) (id)</div>
    <div>(route) (rating) (id)</div> -->
    <!-- <h1 class='title is-1 centered flex1'>Removed</h1> -->
    <!-- <div>(route) (rating) (id)</div>
    <div>(route) (rating) (id)</div>
    <div>(route) (rating) (id)</div> -->
    routes: <br />
    <template v-if="routes[0]">
        {{routes[0].rating}} {{routes[0].routeNum}} <br />
        {{routes[1].rating}} {{routes[1].routeNum}} <br />
    </template>
    routesReal: <br />
    <template v-if="routesReal[0]">
        {{routesReal[0].rating}} {{routesReal[0].routeNum}} <br />
        {{routesReal[1].rating}} {{routesReal[1].routeNum}}
    </template>
    additions:  <br />
    {{additions}} <br />
    removals:  <br />
    {{removals}}
    <button @click="onCommit()" class="button is-fullwidth
        title is-4 flex1">Commit</button>
    <!-- <h5 v-if="profile[0] && profile[0].lastUpdate">
      last update: {{
        profile[0].lastUpdate.toDate().getUTCFullYear()
        }}/{{
        (profile[0].lastUpdate.toDate().getUTCMonth() + 1)
        }}/{{
        profile[0].lastUpdate.toDate().getUTCDate()
        }}
      </h5> -->
    <!-- {{addedRoutes}} -->
    <!-- <b-table
    :mobile-cards="false"
    :data="addedRoutes"
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

      <template #footer v-if="(addedRoutes.length < 1)">
        <div class="has-text-right">
          No Records Found
        </div>
      </template>
    </b-table> -->

    <!-- <button @click="onGetRoutes()" class="button is-fullwidth
      is-teal title is-4 flex1">Get routes from server</button>

    <h1 class='title is-1 centered flex1'>DeletedRoutes</h1> -->

    <!-- <b-table
    :mobile-cards="false"
    :data="deletedRoutes"
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

      <template #footer v-if="(deletedRoutes.length < 1)">
        <div class="has-text-right">
          No Records Found
        </div>
      </template>
    </b-table> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

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
    ...mapState('publish', ['routes', 'routesReal', 'additions', 'removals']),
    ...mapState('profile', ['profile']),
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions('publish', ['initRoutes', 'commit', 'getAdditions']),
    onCommit() {
      this.commit();
    },
    // wait(timeout) { // await wait(500);
    //   return new Promise((resolve) => {
    //     setTimeout(resolve, timeout);
    //   });
    // },
  },
  watch: {
    async profile() {
    // console.log('1. in profile() happened=', this.happenedAlready);
      if (!this.happenedAlready
        && this.profile[0]) { // if user is logged in
        // console.log('if (!this.happenedAlready &&  this.profile[0]: true');
        this.getAdditions();
        this.happenedAlready = true;
      }
    },
  },
//     async deletedRoutes() {
//       // console.log('2. in routesWatch(): happened=', this.happenedAlreadyGetRoutes);
//       if (!this.happenedAlreadyGetRoutes) {
//         // console.log('2.         addedRoutes.length=', (this.addedRoutes.length ));
//         if (this.addedRoutes.length >0) {
//             this.getRoutes(this.profile[0]);
//             this.happenedAlreadyGetRoutes = true;
//           }
//         }
//     }
//   },
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
