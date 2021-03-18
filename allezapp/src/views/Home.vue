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

      <b-table-column field="routeNum" label="Route" v-slot="props">
        {{props.row.routeNum}}
      </b-table-column>

      <b-table-column field="rating" label="Rating" v-slot="props">
        {{props.row.rating}}
      </b-table-column>

      <b-table-column field="cmp" label="Completed" v-slot="props">
        {{props.row.cmp}}
      </b-table-column>

      <template #footer v-if="(routes.length < 1)">
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
    ...mapState('data', ['routes']),
  },
  methods: {
    ...mapActions('data', ['initRoutes']),
    onEditRow(args) {
      console.log('args= ', args);
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
