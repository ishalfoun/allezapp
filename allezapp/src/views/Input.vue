<template>
  <section class="main debug">
    <template v-if="profile[0] && profile[0].id === 'aGyG5o6IaDZtnyK7ouOKmNU1UYP2'">
    <div class='row mt-2'>
      <h2 class='title'>Input Mode</h2>
      <router-link class="button" to="/publish">
        Publish
      </router-link>
    </div>
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
      <div class='button' :class="(inputRoute.selected6)? 'is-warning':''"
      @click="onClickRoute('6')"> 6 </div>
      <div class='button' :class="(inputRoute.selected7)? 'is-warning':''"
      @click="onClickRoute('7')"> 7 </div>
      <div class='button' :class="(inputRoute.selected8)? 'is-warning':''"
      @click="onClickRoute('8')"> 8 </div>
      <div class='button' :class="(inputRoute.selected9)? 'is-warning':''"
      @click="onClickRoute('9')"> 9 </div>
    </div>
    <div class='row'>
      <div class='button' :class="(inputRoute.selected10)? 'is-warning':''"
      @click="onClickRoute('10')"> 10 </div>
      <div class='button' :class="(inputRoute.selected11)? 'is-warning':''"
      @click="onClickRoute('11')"> 11 </div>
      <div class='button' :class="(inputRoute.selected12)? 'is-warning':''"
      @click="onClickRoute('12')"> 12 </div>
      <div class='button' :class="(inputRoute.selected13)? 'is-warning':''"
      @click="onClickRoute('13')"> 13 </div>
      <div class='button' :class="(inputRoute.selected14)? 'is-warning':''"
      @click="onClickRoute('14')"> 14 </div>
    </div>
    <div class='row'>
      <!-- <div class='button' :class="(inputRoute.selectedn)? 'is-warning':''"
      @click="onClickRouteLetter('n')"> _ </div> -->
      <div class='button' :disabled="(!this.inputRoute.showLetters)"
        :class="(inputRoute.selecteda)? 'is-warning':''"
        @click="onClickRouteLetter('a')"> a </div>
      <div class='button' :disabled="(!this.inputRoute.showLetters)"
        :class="(inputRoute.selectedb)? 'is-warning':''"
        @click="onClickRouteLetter('b')"> b </div>
      <div class='button' :disabled="(!this.inputRoute.showLetters)"
        :class="(inputRoute.selectedc)? 'is-warning':''"
        @click="onClickRouteLetter('c')"> c </div>
      <div class='button' :disabled="(!this.inputRoute.showLetters)"
        :class="(inputRoute.selectedd)? 'is-warning':''"
        @click="onClickRouteLetter('d')"> d </div>
    </div>
    <div class='row'>
      <div class='button' @click="onAutob()"
        :class="(inputRoute.selectedAutob)? 'is-warning':''">
        <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' /></div>
      <div class='button' @click="onOverh()"
        :class="(inputRoute.selectedOverh)? 'is-warning':''">
        <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' /></div>
      <div class='button' @click="onLead()"
        :class="(inputRoute.selectedLead)? 'is-warning':''">
        <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' /></div>
      <div class='button' @click="onTopr()"
        :class="(inputRoute.selectedTopr)? 'is-warning':''">
        <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/rope3.png?alt=media&token=633842a5-deb3-49e6-b3b8-35848865829b' /></div>
    </div>
    <div class='row'>
      <div class='button color' style="background-color:red;"
        :style="(inputRoute.selectedRed)?
        'border-color:black':'border-color:white;'"
        @click="onColor('red')"> &nbsp; </div>
      <div class='button color' style="background-color:blue"
        :style="(inputRoute.selectedBlue)?
        'border-color:deeppink;':'border-color:white;'"
        @click="onColor('blue')"> &nbsp; </div>
      <div class='button color' style="background-color: green"
        :style="(inputRoute.selectedGreen)?
        'border-color:black;':'border-color:white;'"
         @click="onColor('green')"> &nbsp; </div>
      <div class='button color' style="background-color: gold"
        :style="(inputRoute.selectedYellow)?
        'border-color:black;':'border-color:white;'"
         @click="onColor('gold')"> &nbsp; </div>
      <div class='button color' style="background-color: darkorange"
        :style="(inputRoute.selectedOrange)?
        'border-color:black;':'border-color:white;'"
         @click="onColor('darkorange')">&nbsp;</div>
      <div class='button color' style="background-color: deeppink"
        :style="(inputRoute.selectedPink)?
        'border-color:black;':'border-color:white;'"
         @click="onColor('deeppink')"> &nbsp; </div>
      <div class='button color' style="background-color: indigo"
        :style="(inputRoute.selectedPurple)?
        'border-color:black;':'border-color:white;'"
         @click="onColor('indigo')"> &nbsp; </div>
      <div class='button color' style="background-color: white;
        border-color:black;border-style:solid;"
        :style="(inputRoute.selectedWhite)?
        'border-width:4px;':'border-width:1px;'"
         @click="onColor('white')"> &nbsp; </div>
      <div class='button color' style="background-color: black"
        :style="(inputRoute.selectedBlack)?
        'border-color:gold;':'border-color:white;'"
         @click="onColor('black')"> &nbsp; </div>
    </div>
    <div class='row'>
      <div class='button' @click="onBack()"> ◀ </div>
      <div class='button' disabled> {{currentRouteNum}} </div>
      <div class='button' @click="onNext()"> ▶ </div>
      <div class='button' @click="onCreateRoute()"
      :class="(inputRoute.plus)? 'is-success':''"> + </div>
      <div class='button' @click="onEnterNext()"> +▶ </div>
      <div class='button' @click="onDeleteAll()"> × </div>
    </div>
    <!-- {{getRoutesAt(currentRouteNum)}} -->
    <!-- route#:{{routes[currentRouteNum].routeNum}} ({{routes[currentRouteNum].rating}}) -->
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
          <template v-if="props.row.color"><div id="square"
            :style="{
              'background-color': props.row.color,
              'border-color': (props.row.color === 'white' ? 'black' : ''),
              'border-width': (props.row.color === 'white' ? '1px' : ''),
              'border-style': (props.row.color === 'white' ? 'solid' : ''),
              }">&nbsp;</div></template>
        </b-table-column>

        <b-table-column field="rating" label="Rating" v-slot="props">
          {{props.row.rating}}
        </b-table-column>

        <b-table-column field="flags" label="" v-slot="props">
          <template v-if="props.row.flag_autob"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/triangle-xxl.png?alt=media&token=37986abe-878e-4b77-af1d-c0bfb8ce6ed7' /></template>
          <template v-if="props.row.flag_overh"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/leadclimbing.jpg?alt=media&token=26257ad8-ae6e-4b20-a611-f1f71cfb8be2' /></template>
          <template v-if="props.row.flag_lead"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' /></template>
          <template v-if="props.row.flag_topr"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/rope3.png?alt=media&token=633842a5-deb3-49e6-b3b8-35848865829b' /></template>
        </b-table-column>
      </b-table>
      <template v-if="currentRoutes.length === 0">
        <div>
          No Records at {{currentRouteNum}}
        </div>
      </template>
    </div>
    </template>
    <template v-else>
      not accessible
      </template>
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
    ///
    // var route is used for saving to db
    ///
    route: {
      routeNum: '',
      rating: '', // 10
      rating2: '', // c (concat'd)
      flag_autob: false,
      flag_overh: false,
      flag_lead: false,
      flag_topr: false,
    },
    ///
    // var inputRoute is used for styling of the form (what btns are highlighted)
    ///
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
      plus: false,
      showLetters: true,
      selectedAutob: false,
      selectedOverh: false,
      selectedLead: false,
      selectedTopr: false,
      selectedRed: false,
      selectedGreen: false,
      selectedBlue: false,
      selectedYellow: false,
      selectedWhite: false,
      selectedPink: false,
      selectedOrange: false,
      selectedBlack: false,
      selectedPurple: false,
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
    ...mapState('profile', ['profile']),
  },
  methods: {
    ...mapActions('input', ['createRoute', 'initRoutes', 'deleteRoute', 'deleteAll']),
    onAutob() {
      this.inputRoute.selectedAutob = !this.route.flag_autob;
      this.route.flag_autob = !this.route.flag_autob;
    },
    onOverh() {
      this.inputRoute.selectedOverh = !this.route.flag_overh;
      this.route.flag_overh = !this.route.flag_overh;
    },
    onTopr() {
      this.inputRoute.selectedTopr = !this.route.flag_topr;
      this.route.flag_topr = !this.route.flag_topr;
    },
    onLead() {
      this.inputRoute.selectedLead = !this.route.flag_lead;
      this.route.flag_lead = !this.route.flag_lead;
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
          console.log('-----rating 2 is empty'); // letter is missing
          return;
        }
      }
      if (this.route.rating.length < 1) {
        console.log('###empty route added');
        this.route.rating = '?';
        this.route.rating2 = '';
      }

      const toAdd = {
        routeNum: this.currentRouteNum,
        rating: `${this.route.rating}${this.route.rating2}`, // concat
        flag_overh: this.route.flag_overh,
        flag_lead: this.route.flag_lead,
        flag_topr: this.route.flag_topr,
        flag_autob: this.route.flag_autob,
        color: (this.route.color) ? this.route.color : false,
      };
      console.log('in Add: ', toAdd);
      await this.createRoute(toAdd).then(() => { // pass route to save
        this.clearForm();
        this.inputRoute.plus = false;
        this.componentKeyR += 1;
      });
    },
    clearForm() {
      this.setAllNumbersFalse();
      this.setAllNumbersFalse2();
      this.setAllColorsFalse();
      this.setAllFlagsFalse();
    },
    setAllFlagsFalse() {
      this.route.flag_autob = false;
      // this.route.flag_topr = false;
      // this.route.flag_lead = false;
      // this.route.flag_overh = false;
      this.inputRoute.selectedAutob = false;
      // this.inputRoute.selectedTopr = false;
      // this.inputRoute.selectedLead = false;
      // this.inputRoute.selectedOverh = false;
    },
    setAllNumbersFalse() {
      this.route.rating = '';
      this.inputRoute.selected6 = false;
      this.inputRoute.selected7 = false;
      this.inputRoute.selected8 = false;
      this.inputRoute.selected9 = false;
      this.inputRoute.selected10 = false;
      this.inputRoute.selected11 = false;
      this.inputRoute.selected12 = false;
      this.inputRoute.selected13 = false;
      this.inputRoute.selected14 = false;
    },
    setAllNumbersFalse2() {
      this.route.rating2 = '';
      this.inputRoute.selectedn = false;
      this.inputRoute.selecteda = false;
      this.inputRoute.selectedb = false;
      this.inputRoute.selectedc = false;
      this.inputRoute.selectedd = false;
    },
    setAllColorsFalse() {
      this.inputRoute.selectedRed = false;
      this.inputRoute.selectedGreen = false;
      this.inputRoute.selectedBlue = false;
      this.inputRoute.selectedYellow = false;
      this.inputRoute.selectedWhite = false;
      this.inputRoute.selectedPink = false;
      this.inputRoute.selectedPurple = false;
      this.inputRoute.selectedOrange = false;
      this.inputRoute.selectedBlack = false;
      this.route.color = '';
    },
    onClickRoute(value) {
      this.setAllNumbersFalse();
      this.inputRoute.showLetters = true;
      if (value === '6' || value === '7' || value === '8' || value === '9') {
        this.inputRoute.plus = true;
      } else {
        this.inputRoute.plus = false;
      }
      switch (value) {
        case '6': this.inputRoute.selected6 = true; this.route.rating = '5.6';
          this.inputRoute.showLetters = false;
          this.setAllNumbersFalse2();
          break;
        case '7': this.inputRoute.selected7 = true; this.route.rating = '5.7';
          this.inputRoute.showLetters = false;
          this.setAllNumbersFalse2();
          break;
        case '8': this.inputRoute.selected8 = true; this.route.rating = '5.8';
          this.inputRoute.showLetters = false;
          this.setAllNumbersFalse2();
          break;
        case '9': this.inputRoute.selected9 = true; this.route.rating = '5.9';
          this.inputRoute.showLetters = false;
          this.setAllNumbersFalse2();
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
      this.setAllNumbersFalse2();
      // if a 6-14 is selected, put plus to green
      if (this.route.rating !== '') {
        this.inputRoute.plus = true;
      }
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
    onColor(value) {
      this.setAllColorsFalse();
      switch (value) {
        case 'red':
          this.inputRoute.selectedRed = true; this.route.color = 'red';
          break;
        case 'green':
          this.inputRoute.selectedGreen = true; this.route.color = 'green';
          break;
        case 'blue':
          this.inputRoute.selectedBlue = true; this.route.color = 'blue';
          break;
        case 'darkorange':
          this.inputRoute.selectedOrange = true; this.route.color = 'orange';
          break;
        case 'white':
          this.inputRoute.selectedWhite = true; this.route.color = 'white';
          break;
        case 'black':
          this.inputRoute.selectedBlack = true; this.route.color = 'black';
          break;
        case 'deeppink':
          this.inputRoute.selectedPink = true; this.route.color = 'deeppink';
          break;
        case 'indigo':
          this.inputRoute.selectedPurple = true; this.route.color = 'indigo';
          break;
        case 'gold':
          this.inputRoute.selectedYellow = true; this.route.color = 'gold';
          break;
        default:
      }
    },
    onBack() {
      this.currentRouteNum -= 1;
      if (this.currentRouteNum < 10) {
        this.currentRouteNum = 81;
      }
      this.getRoutesAt(this.currentRouteNum);
      this.setAllNumbersFalse();
      this.setAllNumbersFalse2();
      this.inputRoute.plus = false;
    },
    onNext() {
      this.currentRouteNum += 1;
      if (this.currentRouteNum > 81) {
        this.currentRouteNum = 10;
      }
      this.getRoutesAt(this.currentRouteNum);
      this.setAllNumbersFalse();
      this.setAllNumbersFalse2();
      this.inputRoute.plus = false;
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
#square {
  display: inline-block;
  height: 15px;
  width: 15px;
}
.color{
  border-width:3px;
}
.smallicon {
  width: 15px;
  height: 15px;
}
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
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  height: 15%;
}
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
