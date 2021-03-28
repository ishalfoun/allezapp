<template>
<div class='maincontainer' style="margin-top:0px!important">
    <!-- <h1 class='title is-1 centered flex1'>Routes</h1> -->
    <h5 v-if="profile[0] && profile[0].lastUpdate">
      last update: {{
        profile[0].lastUpdate.toDate().getUTCFullYear()
        }}/{{
        (profile[0].lastUpdate.toDate().getUTCMonth() + 1)
        }}/{{
        profile[0].lastUpdate.toDate().getUTCDate()
        }}
      </h5>
    <!-- {{routesReal}} -->
    <!-- <b-table
    :mobile-cards="false"
    :data="routesReal"
    ref="table"
    :key="componentKey"
    paginated
    per-page="5"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
    sort-icon="arrow-up"
    sort-icon-size="is-small"
    default-sort="routeNum"
    default-sort-direction="asc">

      <b-table-column field="id" label="ID" sortable v-slot="props">
        {{props.row.id.substring(0,4)}}
      </b-table-column>

      <b-table-column field="routeNum" label="Route" sortable v-slot="props">
        {{props.row.routeNum}}
      </b-table-column>

      <b-table-column field="rating" label="Rating" sortable v-slot="props">
        {{props.row.rating}}
      </b-table-column>

      <template #footer v-if="(routesReal.length < 1)">
        <div class="has-text-right">
          No Records Found
        </div>
      </template>
    </b-table> -->

    <!-- <button @click="onGetRoutes()" class="button is-fullwidth
      is-teal title is-4 flex1">Get routes from server</button>

    <h1 class='title is-1 centered flex1'>ProfileRoutes</h1> -->

    <div class="flexrow">
      <button id="filterbtn" @click="onFilter()" class="mr-4 button
        is-success">Filter</button>
    </div>
    <div>
      <b-table
      id="table"
      :mobile-cards="false"
      :data="profileroutes"
      ref="table2"
      sort-icon="arrow-up"
      sort-icon-size="is-small"
      default-sort="routeNum"
      default-sort-direction="asc"
      striped
      sticky-header>
        <!-- <b-table-column field="routeId" label="RouteId" sortable v-slot="props">
          {{props.row.routeId.substring(0,4)}} </b-table-column> -->
        <!-- <b-table-column field="profileId" label="ProfileId" sortable v-slot="props">
          {{props.row.profileId.substring(0,4)}} </b-table-column> -->
        <b-table-column field="routeNum" label="Location" sortable v-slot="props">
          {{props.row.routeNum}} </b-table-column>
        <b-table-column field="rating" label="Rating" sortable v-slot="props">
          {{props.row.rating}} </b-table-column>
        <b-table-column field="cmp" label="Completed" v-slot="props">
          <button @click="onCompleted(props.row)">{{props.row.cmp}}</button></b-table-column>

        <template #footer v-if="(profileroutes.length < 1)">
          <div class="has-text-right">No Records Found</div>
        </template>
      </b-table>
    </div>
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
    sortVar: 'route',
  }),
  mounted() {
    this.initRoutes();
  },
  computed: {
    ...mapState('dataJS', ['routesReal', 'profileroutes']),
    ...mapState('profile', ['profile']),
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions('dataJS', ['initRoutes', 'initProfileRoutes', 'getRoutes', 'setCompletedY', 'setCompletedN']),
    onGetRoutes() {
      this.getRoutes(this.profile[0]);
    },
    wait(timeout) { // await wait(500);
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      });
    },
    onCompleted(row) {
      if (row.cmp === 'Y') {
        row.cmp = 'N';
        this.setCompletedY(row);
      } else {
        row.cmp = 'Y';
        this.setCompletedN(row);
      }
    },
    onFilter() {

    },
    onSort() {
      if (this.sortVar === 'route') {
        this.sortVar = 'Rating'
      }
    }
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
        // console.log('2.         routesReal.length=', (this.routesReal.length )); 
        if (this.routesReal.length >0) {
            this.getRoutes(this.profile[0]);
            this.happenedAlreadyGetRoutes = true;
          }
        }
    }
  },
};
</script>

<style lang="scss" scoped>
/deep/.b-table .table-wrapper.has-sticky-header {
  height: 490px !important;
}
#table {
  border-style: solid;
  border-color: red;
  height: 100px;
}
/deep/ .table.is-striped tbody tr:not(.is-selected):nth-child(even) {
  background-color: #57cdeb;
  // padding-top: 10px;
}
/deep/ .table td, .table th{
  padding: 0px 0px 0px 0px !important;
}
#filterbtn {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 30px;
  padding-right: 30px;
  line-height: 1.0rem;
  font-size: 1.6rem;
  font-weight: 600;
  height: 2rem;
}
.flexrow {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
html {
  height: 100%;
}
body {
  height: 100%;
}
</style>
