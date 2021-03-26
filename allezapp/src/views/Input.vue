<template>
  <section class="main">
    <h2 class='title mt-2'>Input Mode</h2>
    <!-- <form @submit.prevent="onCreateRoute()" class="ml-4 mr-4">
      <b-field label="Route Num">
        <b-input v-model="route.routeNum" required></b-input>
      </b-field>
      <b-field label="Rating">
        <b-input v-model="route.rating" required></b-input>
      </b-field>
      <button class="button is-success">Add Route</button>
    </form> -->
    <div class='row'>
      <!-- <span class="firstdigit"> 5. </span> -->
      <div class='button' :class="(inputRoute.selected6)? 'is-success':''"
      @click="onClickRoute('6')"> 6 </div>
      <div class='button' :class="(inputRoute.selected7)? 'is-success':''"
      @click="onClickRoute('7')"> 7 </div>
      <div class='button' :class="(inputRoute.selected8)? 'is-success':''"
      @click="onClickRoute('8')"> 8 </div>
      <div class='button' :class="(inputRoute.selected9)? 'is-success':''"
      @click="onClickRoute('9')"> 9 </div>
    </div>
    <div class='row'>
      <div class='button' :class="(inputRoute.selected10)? 'is-success':''"
      @click="onClickRoute('10')"> 10 </div>
      <div class='button' :class="(inputRoute.selected11)? 'is-success':''"
      @click="onClickRoute('11')"> 11 </div>
      <div class='button' :class="(inputRoute.selected12)? 'is-success':''"
      @click="onClickRoute('12')"> 12 </div>
      <div class='button' :class="(inputRoute.selected13)? 'is-success':''"
      @click="onClickRoute('13')"> 13 </div>
      <div class='button' :class="(inputRoute.selected14)? 'is-success':''"
      @click="onClickRoute('14')"> 14 </div>
    </div>
    <div class='row'>
      <!-- <div class='button' :class="(inputRoute.selectedn)? 'is-success':''"
      @click="onClickRouteLetter('n')"> _ </div> -->
      <div class='button' :disabled="(!this.inputRoute.showLetters)"
        :class="(inputRoute.selecteda)? 'is-success':''"
        @click="onClickRouteLetter('a')"> a </div>
      <div class='button' :disabled="(!this.inputRoute.showLetters)"
        :class="(inputRoute.selectedb)? 'is-success':''"
        @click="onClickRouteLetter('b')"> b </div>
      <div class='button' :disabled="(!this.inputRoute.showLetters)"
        :class="(inputRoute.selectedc)? 'is-success':''"
        @click="onClickRouteLetter('c')"> c </div>
      <div class='button' :disabled="(!this.inputRoute.showLetters)"
        :class="(inputRoute.selectedd)? 'is-success':''"
        @click="onClickRouteLetter('d')"> d </div>
    </div>
    <div class='row'>
      <div class='button' @click="onBack()"> ◀ </div><!-- works -->
      <div class='button' disabled> {{currentRouteNum}} </div><!-- works -->
      <div class='button' @click="onNext()"> ▶ </div><!-- works -->
      <div class='button' @click="onCreateRoute()"> + </div>
      <div class='button' @click="onEnterNext()"> +▶ </div>
      <div class='button' @click="onDeleteAll()"> × </div>
    </div>
    <!-- {{getRoutesAt(currentRouteNum)}} -->
    <!-- route#:{{routes[currentRouteNum].routeNum}} ({{routes[currentRouteNum].rating}}) -->
    <template v-if="currentRouteNum === 81">
      <button is-success @click="onPublish()"> Publish </button>
    </template>
    <div class="table debug">
      <b-table
      :key="componentKeyR"
      style="width=100%"
      :mobile-cards="false"
      :data="currentRoutes"
      ref="table">

        <b-table-column field="" label="" v-slot="props">
          <div @click="onDelete(props.row)"> X </div>
        </b-table-column>

        <b-table-column field="routeNum" label="Route" v-slot="props">
          {{props.row.routeNum}}
        </b-table-column>

        <b-table-column field="rating" label="Rating" v-slot="props">
          {{props.row.rating}}
        </b-table-column>
      </b-table>
      <template v-if="currentRoutes.length === 0">
        <div>
          No Records at {{currentRouteNum}}
        </div>
      </template>
    </div>
  </section>
</template>

<script>
/* eslint-disable object-shorthand */
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    currentRouteNum: 10,
    componentKeyR: 0,
    isBackUp: false,
    route: {
      routeNum: '',
      rating: '', // 10
      rating2: '', // c (concat'd)
    },
    inputRoute: {
      selected6: false,
      selected7: false,
      selected8: false,
      selected9: false,
      selected10: false,
      selected11: false,
      selected12: false,
      selected13: false,
      selected14: false,
      selectedn: false,
      selecteda: false,
      selectedb: false,
      selectedc: false,
      selectedd: false,
      showLetters: true,
    },
    nonfound: false,
    currentRoutes: [],
    alreadyInitd: false,
  }),
  // When this component is mounted, we want to call the init
  // When you load a specific subreddit, the params have the name of given subreddit
  // so we call init for the one that has this name.
  mounted() {
    this.initRoutes();
  },
  computed: {
    ...mapState('input', ['routes', 'componentKey']),
  },
  methods: {
    ...mapActions('input', ['createRoute', 'initRoutes', 'deleteRoute', 'deleteAll']),
    onPublish() {
      console.log('onPublish');
    },
    ///
    // queries the routes db to get each route with that routeNum
    // and sets it as this.currentRoutes
    ///
    getRoutesAt(value) {
      // console.log('in getRoutesAt( ', value);
      const toReturn = this.routes.filter((route) => {
        if (String(route.routeNum) === String(value)) {
          // console.log('  in filter, matched route:', route.routeNum);
          return true; // end .filter()
        }
        // console.log('  in filter, no match: route.routeNum=', String(route.routeNum));
        // console.log('  in filter, no match: value=', String(value));
        return false; // end .filter()
      });
      if (toReturn.length < 1) {
        this.nonfound = true;
      } else {
        this.nonfound = false;
      }
      this.currentRoutes = toReturn;
    },
    async onCreateRoute() {
      if (this.route.rating.length > 3) {
        console.log('-----onCreate: rating above 9:', this.route.rating);
        if (this.route.rating2 === '') { // if no letter ("5.11")
          console.log('-----rating 2 is empty');
          this.route.rating2 = 'a'; // assume default a
        }
      }
      const toAdd = {
        routeNum: this.currentRouteNum,
        rating: `${this.route.rating}${this.route.rating2}`, // concat
      };
      console.log('in Add: ', toAdd);
      await this.createRoute(toAdd).then(() => { // pass route to save
        this.setAllSelectedFalse();
        this.setAllSelectedFalse2();
        this.componentKeyR += 1;
      });
    },
    setAllSelectedFalse() {
      this.inputRoute.selected6 = false;
      this.inputRoute.selected7 = false;
      this.inputRoute.selected8 = false;
      this.inputRoute.selected9 = false;
      this.inputRoute.selected10 = false;
      this.inputRoute.selected11 = false;
      this.inputRoute.selected12 = false;
      this.inputRoute.selected13 = false;
      this.inputRoute.selected14 = false;
      this.route.rating = '';
    },
    setAllSelectedFalse2() {
      this.inputRoute.selectedn = false;
      this.inputRoute.selecteda = false;
      this.inputRoute.selectedb = false;
      this.inputRoute.selectedc = false;
      this.inputRoute.selectedd = false;
      this.route.rating2 = '';
    },
    onClickRoute(value) {
      this.setAllSelectedFalse();
      this.inputRoute.showLetters = true;
      switch (value) {
        case '6': this.inputRoute.selected6 = true; this.route.rating = '5.6';
          this.inputRoute.showLetters = false;
          this.setAllSelectedFalse2();
          break;
        case '7': this.inputRoute.selected7 = true; this.route.rating = '5.7';
          this.inputRoute.showLetters = false;
          this.setAllSelectedFalse2();
          break;
        case '8': this.inputRoute.selected8 = true; this.route.rating = '5.8';
          this.inputRoute.showLetters = false;
          this.setAllSelectedFalse2();
          break;
        case '9': this.inputRoute.selected9 = true; this.route.rating = '5.9';
          this.inputRoute.showLetters = false;
          this.setAllSelectedFalse2();
          break;
        case '10': this.inputRoute.selected10 = true; this.route.rating = '5.10';
          break;
        case '11': this.inputRoute.selected11 = true; this.route.rating = '5.11';
          break;
        case '12': this.inputRoute.selected12 = true; this.route.rating = '5.12';
          break;
        case '13': this.inputRoute.selected13 = true; this.route.rating = '5.13';
          break;
        case '14': this.inputRoute.selected13 = true; this.route.rating = '5.14';
          break;
        default:
      }
    },
    onClickRouteLetter(value) {
      this.setAllSelectedFalse2();
      if (this.inputRoute.showLetters) {
        switch (value) {
          case 'n': this.inputRoute.selectedn = true; this.route.rating2 = '';
            break;
          case 'a': this.inputRoute.selecteda = true; this.route.rating2 = 'a';
            break;
          case 'b': this.inputRoute.selectedb = true; this.route.rating2 = 'b';
            break;
          case 'c': this.inputRoute.selectedc = true; this.route.rating2 = 'c';
            break;
          case 'd': this.inputRoute.selectedd = true; this.route.rating2 = 'd';
            break;
          default:
        }
      }
    },
    onBack() {
      this.currentRouteNum -= 1;
      if (this.currentRouteNum < 10) {
        this.currentRouteNum = 81;
      }
      this.getRoutesAt(this.currentRouteNum);
      this.setAllSelectedFalse();
      this.setAllSelectedFalse2();
    },
    onNext() {
      this.currentRouteNum += 1;
      if (this.currentRouteNum > 81) {
        this.currentRouteNum = 10;
      }
      this.getRoutesAt(this.currentRouteNum);
      this.setAllSelectedFalse();
      this.setAllSelectedFalse2();
    },
    async onDelete(row) {
      console.log('onDelete: row=', row.id);
      this.deleteRoute(row.id);
    },
    onDeleteAll() {
      this.deleteAll(this.currentRoutes);
    },
    onEnterNext() {
      this.onCreateRoute();
      this.onNext();
    },
  },
  watch: {
    // only call getRoutesAt() once, when routes is loaded:
    routes() { // watch routes change
      if (this.routes[0] === '-1' || !this.routes[0] || this.alreadyInitd) {
        // if routes are not loaded or
        // if no routes exists, exit
      } else {
        this.getRoutesAt(this.currentRouteNum);
        this.alreadyInitd = true;
      }
    },
    componentKey() {
      this.componentKeyR += 1;
      console.log('componentKey watched!! componentKeyR=', this.componentKeyR);
      this.getRoutesAt(this.currentRouteNum);
    },
  },
};
</script>

<style lang="scss">
.table {
  height: 40%;
}
.firstdigit {
  -webkit-box-pack: center;
  justify-content: center;
  padding-bottom: calc(0.5em - 1px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(0.5em - 1px);
  text-align: center;
}
.row {
  display: flex;
  justify-content: space-between;
  height: 15%;
}
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
}
</style>
