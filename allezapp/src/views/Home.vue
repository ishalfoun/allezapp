<template>
<div class='maincontainer' style="">
    <!-- <h1 class='title is-1 centered flex1'>Routes</h1> -->
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

    <!-- <div class="flexrow mt-3">
      <button id="filterbtn" @click="onFilter()" class="mr-4 button
        is-success">Filter</button>
      <button id="filterbtn" @click="onSort()" class="mr-4 button
        is-success">Sort</button>
    </div> -->
    <!-- <b-field label="">
      <b-select placeholder=""
        v-on:input="onChangeFilter(selectedFilter)"
        v-model="selectedFilter"
        class="mr-4 button
        is-success">
        <option disabled value="">Filter</option>
        <option value="all">All</option>
        <option value="miss">Missing</option>
        <option value="cmp">Completed</option>
      </b-select>
    </b-field> -->
    <div class="flexrow mt-3">
      <b-dropdown aria-role="list">
        <template #trigger="{ active }">
          <b-button
            label="Filter"
            type="is-success"
            :icon-right="active ? 'menu-up' : 'menu-down'" />
            {{loading}}
        </template>
        <b-dropdown-item aria-role="listitem"
         @click="onShowAll()">Show All Routes</b-dropdown-item>
        <b-dropdown-item aria-role="listitem"
         @click="onShowMiss()">Show Missing Routes</b-dropdown-item>
        <b-dropdown-item aria-role="listitem"
         @click="onShowCmp()">Show Completed Routes</b-dropdown-item>
      </b-dropdown>
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
          {{props.row.routeNum}}
          <template v-if="props.row.flag_autob"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/triangle-xxl.png?alt=media&token=37986abe-878e-4b77-af1d-c0bfb8ce6ed7' /></template>
          <template v-if="props.row.flag_overh"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/leadclimbing.jpg?alt=media&token=26257ad8-ae6e-4b20-a611-f1f71cfb8be2' /></template>
          <template v-else><div class='smallicon'></div></template>
          <template v-if="props.row.flag_lead"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' /></template>
          <template v-else><div class='smallicon'></div></template>
          <template v-if="props.row.flag_topr"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/rope3.png?alt=media&token=633842a5-deb3-49e6-b3b8-35848865829b' /></template>
          <template v-else><div class='smallicon'></div></template>
        </b-table-column>
        <b-table-column field="rating" label="Rating" sortable v-slot="props">
          {{props.row.rating}}
          <template v-if="props.row.color"><div id="square"
            :style="{'background-color': props.row.color}">&nbsp;</div></template>
        </b-table-column>
        <b-table-column field="cmp" label="Completed" sortable v-slot="props">
          <button @click="onCompleted(props.row)">{{props.row.cmp}}</button>
          <img v-if="props.row.cmp === 'Y'" class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/leadclimb2.png?alt=media&token=d92b56c1-c1e8-4731-bc50-47b096143156' />
          <!-- <img class='icon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/rope.png?alt=media&token=c8f1cf11-05ff-4367-a6d7-ead1426a48a1' />
          <img class='icon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/rope%20(2).png?alt=media&token=24fe9813-1b76-4a9d-ace0-afebfc7e7d8d' />
          <img class='icon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/rope%20(1).png?alt=media&token=b044feba-497a-45eb-9980-6b41c56eea63' />
          <img class='icon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner.png?alt=media&token=94cf8933-f227-49bb-b5f1-7426c50f8bcf' />
          <img class='icon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/leadclimb2.png?alt=media&token=d92b56c1-c1e8-4731-bc50-47b096143156' /> -->
          <!-- <img class='icon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/rope3.png?alt=media&token=633842a5-deb3-49e6-b3b8-35848865829b' /> -->
        </b-table-column>

        <template #footer v-if="(profileroutes.length < 1)">
          <div class="has-text-right">Connecting to Server...</div>
        </template>
      </b-table>
      <div class="flexrow mt-3">
        <h5 v-if="profile[0] && profile[0].lastUpdate">
          last update: {{
            profile[0].lastUpdate.toDate().getUTCFullYear()
            }}/{{
            (profile[0].lastUpdate.toDate().getUTCMonth() + 1)
            }}/{{
            profile[0].lastUpdate.toDate().getUTCDate()
            }}
        </h5>
        <h5 @click="onLegend()">
          Legend
        </h5>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    componentKey: 0,
    happenedAlready: false,
    happenedAlreadyGetRoutes: false,
    sortVar: 'route',
    row: {},
    selectedFilter: '',
    displayRoutes: [],
    loadingComponent: {},
    routesLoaded: false,
    lastUpdateLoaded: false,
    profileroutesLoaded: false,

  }),
  mounted() {
    this.initRoutes().then(() => {
      console.log('   ------- initRoutes finished loading!');
      this.routesLoaded = true;
      this.checkIfLoaded();
    })
      .catch((error) => {
        console.error('     ------  initRoutes ERROR loading!', error);
      });
    this.initLastUpdate().then(() => {
      console.log('   -------  initLastUpdate finished loading!');
      this.lastUpdateLoaded = true;
      this.checkIfLoaded();
    })
      .catch((error) => {
        console.error('     ------  initLastUpdate ERROR loading!', error);
      });
  },
  computed: {
    ...mapState('dataJS', ['routesReal', 'profileroutes', 'lastUpdate']),
    ...mapState('profile', ['profile']),
    ...mapState('auth', ['user']),
    ...mapGetters('dataJS', ['getLoading']),
    loading: {
      get() {
        return this.getLoading;
      },
      set(newValue) {
        this.$store.dispatch('dataJS/setLoading', newValue);
      },
    },
  },
  methods: {
    ...mapActions('dataJS', ['initRoutes', 'initLastUpdate', 'initProfileRoutes', 'getRoutes', 'setCompletedY', 'setCompletedN']),
    onLegend() {
      this.loadingComponent = this.$buefy.loading.open();
      // this.$buefy.dialog.alert({
      //   title: 'Legend',
      //   message: 'I have a title, a custom button and <b>HTML</b>!',
      //   confirmText: 'Cool',
      // });
    },
    // onGetRoutesManually() {
    //   this.getRoutes(this.profile[0]);
    // },
    onShowAll() {
      this.displayRoutes = this.profileroutes;
      console.log('in onShowAll, this.displayRoutes=', this.displayRoutes.length);
    },
    onShowMiss() {
      this.displayRoutes = this.profileroutes.filter((element) => (element.cmp === 'N'));
      console.log('in onShowMiss, this.displayRoutes=', this.displayRoutes.length);
    },
    onShowCmp() {
      this.displayRoutes = this.profileroutes.filter((element) => (element.cmp === 'Y'));
      console.log('in onShowCmp, this.displayRoutes=', this.displayRoutes);
    },
    wait(timeout) { // await wait(500);
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    },
    onCompleted(row) {
      this.row = row;
      if (this.row.cmp === 'Y') {
        this.row.cmp = 'N';
        this.setCompletedY(this.row);
      } else {
        this.row.cmp = 'Y';
        this.setCompletedN(row);
      }
    },
    onFilter() {
      console.log('2.         routesReal.length=', (this.routesReal.length));
    },
    onSort() {
      if (this.sortVar === 'route') {
        this.sortVar = 'Rating';
      }
    },
    ///
    // works together with watched vars:
    // 1. if profile changes: call initProfileRoutes
    // 2. if profileRoutes changes  call check
    //     OR
    // 3. if routesReal changes call check
    //     OR
    // 4. if lastUpdate changes call check
    //
    // check:
    // (profileRoutes=true)
    // (routesReal = true)
    // (lastUpdate = true)
    // if all true, call get routes and set to already called.
    checkIfLoaded() {
      if (!this.happenedAlreadyGetRoutes
        && this.routesLoaded
        && this.lastUpdateLoaded
        && this.profileroutesLoaded) {
        console.log('       calling getRoutes');
        this.getRoutes(this.profile[0]);
        // this.displayRoutes = this.profileroutes;
        this.happenedAlreadyGetRoutes = true;
      }
    },
  },
  watch: {
    loading(arg) {
      console.log('loading watched!', arg);
      if (arg) {
        this.loadingComponent = this.$buefy.loading.open();
      } else {
        this.loadingComponent.close();
        this.componentKey += 1;
      }
    },
    async profile() {
      console.log('1. in initProfileRoutes happened=', this.happenedAlready);
      if (!this.happenedAlready) {
        if (this.profile[0]) { // if user is logged in
        // console.log('if (!this.happenedAlready &&  this.profile[0]: true');
          this.initProfileRoutes(this.profile[0].id).then(() => {
            console.log('   -------  profile routes finished loading!');
            this.profileroutesLoaded = true;
            this.checkIfLoaded();
          })
            .catch((error) => {
              console.error('     ------  profile routes ERROR loading!', error);
            });
          this.happenedAlready = true;
        }
      }
    },
    // async profileroutes() {
    //   // if (this.profileroutes.length === 0) {
    //   //   console.log('        loading will be set to true');
    //   //   this.loading = true;
    //   // }
    //   console.log('    in checkIfLoaded (profileRoutes)');
    //   this.checkIfLoaded();
    // },
    // async routesReal() {
    //   console.log('    in checkIfLoaded (routesReal)');
    //   this.checkIfLoaded();
    // },
    // async lastUpdate() {
    //   console.log('    in checkIfLoaded (lastUpdate)');
    //   this.checkIfLoaded();
    // },
  },
};

</script>

<style lang="scss" scoped>
.smallicon {
  width: 15px;
  height: 15px;
  display: inline-block;
}
/deep/.dropdown .background {
  background-color: rgba(10, 10, 10, 0.65) !important;
}
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
  font-weight: 800;
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
  justify-content: space-between;
}
html {
  height: 100%;
}
body {
  height: 100%;
}
</style>
