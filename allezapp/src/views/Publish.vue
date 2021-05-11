<template>
  <div class='maincontainer' style="margin-top:0px!important">
    <template v-if="profile[0] && profile[0].id === 'aGyG5o6IaDZtnyK7ouOKmNU1UYP2'">

    <div class='row title mt-2'>
      <button @click="onCommit()" class="button is-success is-fullwidth
        title is-4 flex1">Commit</button>
      <router-link class="button ml-2" to="/input">
        Input
      </router-link>
    </div>
    <h5 v-if="profile[0] && profile[0].lastUpdate">
      last update: {{
        profile[0].lastUpdate.toDate().getUTCFullYear()
        }}/{{
        (profile[0].lastUpdate.toDate().getUTCMonth() + 1)
        }}/{{
        profile[0].lastUpdate.toDate().getUTCDate()
        }}
      </h5>
    <!-- {{addedRoutes}} -->
    <h1 class='title is-1 centered flex1'>Additions {{additions.length}}</h1>
    <div class="border">
      <b-table
      :key="componentKeyR"
      style="width=100%"
      :mobile-cards="false"
      :data="additions"
      ref="table"
      sort-icon="arrow-up"
      sort-icon-size="is-small"
      default-sort="routeNum"
      default-sort-direction="asc">

        <b-table-column field="del" label="" v-slot="props">
          <div @click="onDeleteAddi(props.row)"> X </div>
        </b-table-column>

        <b-table-column field="routeNum" label="Route" sortable v-slot="props">
          {{props.row.routeNum}}
          <template v-if="props.row.color"><div id="square"
            :style="{
              'background-color': props.row.color,
              'border-color': (props.row.color === 'white' ? 'black' : ''),
              'border-width': (props.row.color === 'white' ? '1px' : ''),
              'border-style': (props.row.color === 'white' ? 'solid' : ''),
              }">&nbsp;</div></template>
        </b-table-column>

        <b-table-column field="rating" label="Rating" sortable v-slot="props">
          {{props.row.rating}}
        </b-table-column>

        <b-table-column field="flags" label="" sortable v-slot="props">
          <template v-if="props.row.flag_autob"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/triangle-xxl.png?alt=media&token=37986abe-878e-4b77-af1d-c0bfb8ce6ed7' /></template>
          <template v-if="props.row.flag_overh"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/leadclimbing.jpg?alt=media&token=26257ad8-ae6e-4b20-a611-f1f71cfb8be2' /></template>
          <template v-if="props.row.flag_lead"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' /></template>
          <template v-if="props.row.flag_topr"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/rope3.png?alt=media&token=633842a5-deb3-49e6-b3b8-35848865829b' /></template>
        </b-table-column>
      </b-table>
      <template v-if="additions.length === 0">
        <div>
          No Records
        </div>
      </template>
    </div>
    <h1 class='title is-1 centered flex1'>Removals {{removals.length}}</h1>
    <div class="border">
      <b-table
      :key="componentKeyR2"
      style="width=100%"
      :mobile-cards="false"
      :data="removals"
      ref="table2"
      sort-icon="arrow-up"
      sort-icon-size="is-small"
      default-sort="routeNum"
      default-sort-direction="asc">

        <b-table-column field="" label="" v-slot="props">
          <div @click="onDeleteRemo(props.row)"> X </div>
        </b-table-column>

        <b-table-column field="routeNum" label="Route" sortable v-slot="props">
          {{props.row.routeNum}}
          <template v-if="props.row.color"><div id="square"
            :style="{
              'background-color': props.row.color,
              'border-color': (props.row.color === 'white' ? 'black' : ''),
              'border-width': (props.row.color === 'white' ? '1px' : ''),
              'border-style': (props.row.color === 'white' ? 'solid' : ''),
              }">&nbsp;</div></template>
        </b-table-column>

        <b-table-column field="rating" label="Rating" sortable v-slot="props">
          {{props.row.rating}}
        </b-table-column>

        <b-table-column field="flags" label="" sortable v-slot="props">
          <template v-if="props.row.flag_autob"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' /></template>
          <template v-if="props.row.flag_overh"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' /></template>
          <template v-if="props.row.flag_lead"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' /></template>
          <template v-if="props.row.flag_topr"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/rope3.png?alt=media&token=633842a5-deb3-49e6-b3b8-35848865829b' /></template>
        </b-table-column>
      </b-table>
      <template v-if="removals.length === 0">
        <div>
          No Records
        </div>
      </template>
    </div>
    routes={{routes.length}}, routesR={{routesReal.length}}
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
    </template>
    <template v-else>
      not accessible
      </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    componentKeyR: 0,
    componentKeyR2: 0,
    happenedAlready: false,
    happenedAlreadyGetRoutes: false,
  }),
  mounted() {
    this.initRoutes();
  },
  computed: {
    ...mapState('publish', ['routes', 'routesReal', 'additions', 'removals', 'componentKey']),
    ...mapState('profile', ['profile']),
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions('publish', ['initRoutes', 'commit', 'getAdditions', 'deleteAddi', 'deleteRemo']),
    onCommit() {
      this.commit();
      this.componentKeyR += 1;
    },
    onDeleteAddi(row) {
      this.deleteAddi(row);
    },
    onDeleteRemo(row) {
      this.deleteRemo(row);
    },
    // wait(timeout) { // await wait(500);
    //   return new Promise((resolve) => {
    //     setTimeout(resolve, timeout);
    //   });
    // },
  },
  watch: {
    async routes() {
      // console.log('.... in routes()=', this.routes);
      if (this.routes.length > 0
        && this.profile[0]) { // if user is logged in
        // console.log('if (!this.happenedAlready &&  this.profile[0]: true');
        this.getAdditions();
        // this.happenedAlready = true;
      }
    },
    async routesReal() {
      // console.log('.... in roustesReal()=', this.routesReal);
      if (this.routesReal.length > 0
        && this.profile[0]) { // if user is logged in
        // console.log('if (!this.happenedAlready &&  this.profile[0]: true');
        this.getAdditions();
        // this.happenedAlready = true;
      }
    },
    componentKey() {
      this.componentKeyR += 1;
      this.componentKeyR2 += 1;
      console.log('componentKey watched!! componentKeyR=', this.componentKeyR);
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
.border {
  border-style: solid;
}
html {
  height: 100%;
}
body {
  height: 100%;
}
</style>
