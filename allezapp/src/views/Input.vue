<template>
  <section class="main debug">
    <template v-if="profile[0] && profile[0].id === 'aGyG5o6IaDZtnyK7ouOKmNU1UYP2'">
      <b-modal v-model="modalInputEditVisible" width="90%" scroll="keep">
        <div class="card">
          <div class="card-content" style="padding-top: 0.5em;">
            <div class="content">
              <div class="flexcenter" style="padding-top: 0;">
                <div>
                  <sup>Change fields in route:</sup>
                </div>
              </div>
              <div class="flexrow">
                <div>
                  #{{modalProps.routeNum}}
                </div>
                <div class="flexrow">
                  <template v-if="modalProps.flag_autob"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' /></template>
                  <template v-if="modalProps.flag_overh"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_overh.png?alt=media&token=b6f36953-6baf-49e1-b47e-c2691fbc150b' /></template>
                  <template v-else><div class='smallicon'></div></template>
                  <template v-if="modalProps.flag_topr"><img class='smallicon ml-1' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' /></template>
                  <template v-else><div class='smallicon'></div></template>
                  <template v-if="modalProps.flag_lead"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' /></template>
                  <template v-else><div class='smallicon'></div></template>
                </div>
                <div class="flexrow">
                  <template v-if="modalProps.color">
                    <div class="square mr-2" :style="{
                      'background-color': modalProps.color,
                      'border-color': (modalProps.color === 'white' ? 'black' : ''),
                      'border-width': (modalProps.color === 'white' ? '1px' : ''),
                      'border-style': (modalProps.color === 'white' ? 'solid' : ''),
                      }"
                      style="border-radius: 5px;">&nbsp;
                    </div>
                  </template>
                  {{modalProps.rating}}
                </div>
              </div>
              <div class="flexcontainer ml-2">
                <div class="flexcenter">
                  <b-field label="Date Added" />
                </div>
                <div class="flexcenter">
                  <!-- <b-input v-model="createdAtChanged"
                   style="width: 6em"></b-input> -->
                  <b-field label="Select a date">
                    <b-datepicker
                      v-model="createdAtChanged"
                      placeholder="Click to select..."
                      icon="calendar-today"
                      trap-focus>
                    </b-datepicker>
                  </b-field>
                </div>
              </div>
              <div class="flexcontainer ml-2">
                <div class="flexcenter">
                  <b-field label="Route#" />
                </div>
                <div class="flexcenter">
                  <div class='button' @click="onBackModal()"> ◀ </div>
                  <b-input v-model="routeNumChanged"
                   style="width: 3em"></b-input>
                  <div class='button' @click="onNextModal()"> ▶ </div>
                </div>
              </div>
              <div class="flexcontainer ml-2">
                <div class="flexcenter">
                  <b-field label="Rating" />
                </div>
                <b-select
                  v-model="ratingChanged">
                  <option
                    v-for="rating in possibleRatings"
                    :value="rating"
                    :key="rating">
                    {{ rating }}
                  </option>
                </b-select>
              </div>
              <div class="flexcontainer ml-2">
                <div class="flexcenter">
                  <b-field label="Color" />
                </div>
                <div class="flexcenter">
                  <div class="square mr-2"
                      style="border-color:red;border-style:solid;"
                      :style="{
                        'background-color': colorChanged,
                        'border-color': (colorChanged === 'white' ? 'black' : ''),
                        'border-width': (colorChanged === 'white' ? '1px' : ''),
                        'border-style': (colorChanged === 'white' ? 'solid' : ''),
                        }">&nbsp;
                      </div>
                  <b-select
                    v-model="colorChanged">
                    <option
                      v-for="(value, key) in colors"
                      :value="value"
                      :key="key">
                      {{ key }}
                    </option>
                  </b-select>
                </div>
              </div>
              <div class="flexcontainer ml-2">
                <div>
                  Autobelay:
                </div>
                <div>
                  <b-field>
                    <span class='mr-3'>
                      <template v-if="switchAutoB">
                        <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' />
                      </template>
                    </span>
                    <b-switch v-model="switchAutoB">
                    </b-switch>
                  </b-field>
                </div>
              </div>
              <div class="flexcontainer ml-2">
                <div>
                  Lead:
                </div>
                <div>
                  <b-field>
                    <span class='mr-3'>
                      <template v-if="switchLead">
                        <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' />
                      </template>
                    </span>
                    <b-switch v-model="switchLead">
                    </b-switch>
                  </b-field>
                </div>
              </div>
              <div class="flexcontainer ml-2">
                <div>
                  Toprope:
                </div>
                <div>
                  <b-field>
                    <span class='mr-3'>
                      <template v-if="switchToprope">
                        <img class='smallicon ml-1' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' />
                      </template>
                    </span>
                    <b-switch v-model="switchToprope">
                    </b-switch>
                  </b-field>
                </div>
              </div>
              <div class="flexcontainer ml-2">
                <div>
                  Overhang:
                </div>
                <div>
                  <b-field>
                    <span class='mr-3'>
                      <template v-if="switchOverhang">
                        <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_overh.png?alt=media&token=b6f36953-6baf-49e1-b47e-c2691fbc150b' />
                      </template>
                    </span>
                    <b-switch v-model="switchOverhang"
                      class="showOverhang">
                    </b-switch>
                  </b-field>
                </div>
              </div>
              <div class="flexcontainer">
                <div></div>
                <a class="button is-success pl-4 pr-4 mr-4"
                  @click="onApplyChangeToRoute(modalProps.id)">
                  Apply
                </a>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
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
      <div class='row' style="height:50%">
        <!-- <span class="firstdigit"> 5. </span> -->
        <div class='flexcolumn' style="width: 60%">
          <div class='button' :class="(inputRoute.selected7)? 'is-warning':''"
            @click="onClickRoute('7')" style="height:100%"> 7
          </div>
          <div class='button' :class="(inputRoute.selected8)? 'is-warning':''"
            @click="onClickRoute('8')" style="height:100%"> 8 </div>
          <div class='button' :class="(inputRoute.selected9)? 'is-warning':''"
            @click="onClickRoute('9')" style="height:100%"> 9 </div>
        </div>
        <div class='button' :class="(inputRoute.selected10)? 'is-warning':''"
          @click="onClickRoute('10')" style="width:100%;height:100%;flex-grow:4"> 10
        </div>
        <div class='button' :class="(inputRoute.selected11)? 'is-warning':''"
          @click="onClickRoute('11')" style="width:100%;height:100%;flex-grow:4"> 11
        </div>
        <div class='flexcolumn' style="width: 60%">
          <div class='button' :class="(inputRoute.selected12)? 'is-warning':''"
            @click="onClickRoute('12')" style="flex-grow:2"> 12
          </div>
          <div class='button' :class="(inputRoute.selected13)? 'is-warning':''"
            @click="onClickRoute('13')"> 13
          </div>
        </div>
      </div>
      <div class='row' style="height:20%">
        <!-- <span class="firstdigit"> 5. </span> -->
        <div class='button' :disabled="(!this.inputRoute.showLetters)"
          :class="(inputRoute.selecteda)? 'is-warning':''"
          @click="onClickRouteLetter('a')" style="flex-grow:10;height:100%;"> a </div>
        <div class='button' :disabled="(!this.inputRoute.showLetters)"
          :class="(inputRoute.selectedb)? 'is-warning':''"
          @click="onClickRouteLetter('b')" style="flex-grow:10;height:100%;"> b
        </div>
        <div class='button' :disabled="(!this.inputRoute.showLetters)"
          :class="(inputRoute.selectedc)? 'is-warning':''"
          @click="onClickRouteLetter('c')" style="flex-grow:5;height:100%;"> c </div>
        <div class='button' :disabled="(!this.inputRoute.showLetters)"
          :class="(inputRoute.selectedd)? 'is-warning':''"
          @click="onClickRouteLetter('d')" style="flex-grow:5;height:100%;"> d </div>
      </div>
      <div class='row'>
        <div class='button' @click="onAutob()"
          :class="(inputRoute.selectedAutob)? 'is-warning':''">
          <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' /></div>
        <div class='button' @click="onOverh()"
          :class="(inputRoute.selectedOverh)? 'is-warning':''">
          <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_overh.png?alt=media&token=b6f36953-6baf-49e1-b47e-c2691fbc150b' /></div>
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
      <!-- <div class="flexcontainer">
        <div class="button is-danger is-small" style="margin:auto"
          @touchstart.stop="touchstart" @mousedown.stop="touchstart"
          @touchend.stop="touchend" @mouseup.stop="touchend"
          @mousemove="mousemove">Long-Click to Delete</div>
      </div> -->
      <!-- {{getRoutesAt(currentRouteNum)}} -->
      <!-- route#:{{routes[currentRouteNum].routeNum}} ({{routes[currentRouteNum].rating}}) -->
      <div class="table debug">
        <b-table
        id="tableid"
        :key="componentKeyR"
        style="width=100%"
        :mobile-cards="false"
        :data="currentRoutes"
        ref="table">

          <b-table-column field="" label="" v-slot="props">
            <div class="cellcontent">
              <div @click="onDelete(props.row)">
                X
              </div>
            </div>
          </b-table-column>

          <b-table-column field="routeNum" label="Route" v-slot="props">
            <div class="cellcontent"
              @touchstart.stop="touchstart(props.row, $event)"
              @mousedown.stop="touchstart(props.row, $event)"
              @touchend.stop="touchend"
              @mouseup.stop="touchend"
              @mousemove="mousemove">
              {{props.row.routeNum}}
              <template v-if="props.row.color"><div class="square"
                :style="{
                  'background-color': props.row.color,
                  'border-color': (props.row.color === 'white' ? 'black' : ''),
                  'border-width': (props.row.color === 'white' ? '1px' : ''),
                  'border-style': (props.row.color === 'white' ? 'solid' : ''),
                  }">&nbsp;</div></template>
            </div>
          </b-table-column>

          <b-table-column field="rating" label="Rating" v-slot="props">
            <div class="cellcontent"
              @touchstart.stop="touchstart(props.row, $event)"
              @mousedown.stop="touchstart(props.row, $event)"
              @touchend.stop="touchend"
              @mouseup.stop="touchend"
              @mousemove="mousemove">
              {{props.row.rating}}
            </div>
          </b-table-column>

          <b-table-column field="flags" label="Type" v-slot="props">
            <div class="cellcontent"
              @touchstart.stop="touchstart(props.row, $event)"
              @mousedown.stop="touchstart(props.row, $event)"
              @touchend.stop="touchend"
              @mouseup.stop="touchend"
              @mousemove="mousemove">
              <template v-if="props.row.flag_autob"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/triangle-xxl.png?alt=media&token=37986abe-878e-4b77-af1d-c0bfb8ce6ed7' /></template>
              <template v-if="props.row.flag_overh"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/leadclimbing.jpg?alt=media&token=26257ad8-ae6e-4b20-a611-f1f71cfb8be2' /></template>
              <template v-if="props.row.flag_lead"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' /></template>
              <template v-if="props.row.flag_topr"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/rope3.png?alt=media&token=633842a5-deb3-49e6-b3b8-35848865829b' /></template>
            </div>
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
    mouse: {
      longtouch: null,
      timer: null,
    },
    modalInputEditVisible: false,
    modalProps: {
      rating: '',
      color: '',
      routeNum: '',
      id: '',
      comments: [],
      date: '',
      notes: '',
      create_at: '',
      checkboxPostPublic: '',
    },
    routeNumChanged: '',
    createdAtChanged: new Date(),
    ratingChanged: '',
    colorChanged: '',
    switchAutoB: '',
    switchLead: '',
    switchToprope: '',
    switchOverhang: '',
    possibleRatings: {
      7: '5.7',
      8: '5.8',
      9: '5.9',
      10: '5.10a',
      11: '5.10b',
      12: '5.10c',
      13: '5.10d',
      14: '5.11a',
      15: '5.11b',
      16: '5.11c',
      17: '5.11d',
      18: '5.12a',
      19: '5.12b',
      20: '5.12c',
      21: '5.12d',
      22: '5.13a',
      23: '5.13b',
      24: '5.13c',
      25: '5.13d',
      26: '5.14a',
      27: '5.14b',
      28: '5.14c',
      29: '5.14d',
    },
    colors: {
      Yellow: 'gold',
      Pink: 'deeppink',
      Purple: 'indigo',
      Orange: 'darkorange',
      Red: 'red',
      Green: 'green',
      Blue: 'blue',
      White: 'white',
      Black: 'black',
    },
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
    ...mapActions('input', ['createRoute', 'initRoutes', 'deleteRoute', 'deleteAll', 'applyChangeToRoute']),
    onApplyChangeToRoute(routeId) {
      const argument = {};
      argument.id = routeId;
      if (this.createdAtChanged !== this.modalProps.created_at) {
        argument.createdAtChanged = this.createdAtChanged;
      }
      if (this.routeNumChanged !== this.modalProps.routeNum) {
        argument.routeNumChanged = this.routeNumChanged;
      }
      if (this.ratingChanged !== this.modalProps.rating) {
        argument.ratingChanged = this.ratingChanged;
      }
      if (this.colorChanged !== this.modalProps.color) {
        argument.colorChanged = this.colorChanged;
      }
      if (this.switchAutoB !== this.modalProps.flag_autob) {
        argument.switchAutoB = this.switchAutoB;
      }
      if (this.switchLead !== this.modalProps.flag_lead) {
        argument.switchLead = this.switchLead;
      }
      if (this.switchToprope !== this.modalProps.flag_topr) {
        argument.switchToprope = this.switchToprope;
      }
      if (this.switchOverhang !== this.modalProps.flag_overh) {
        argument.switchOverhang = this.switchOverhang;
      }
      console.log('sending applyChangetoRoute varg=', argument);
      this.applyChangeToRoute(argument);
    },
    getShortDate(arg) {
      if (arg) {
        const toReturn = arg.toDate();
        return toReturn
          .getFullYear().toString().concat('/')
          .concat(toReturn.getMonth() + 1)
          .concat('/')
          .concat(toReturn.getDate());
      }
      return arg;
    },
    longPressAction(row) {
      console.log('in on LOOOOONG PRSSS.', row);
      this.modalInputEditVisible = true;
      this.componentKeyR = 0;
      this.modalProps = row; // wherever the user clicked, set the modal to that data
      this.routeNumChanged = row.routeNum;
      this.createdAtChanged = (row.created_at.toDate)
        ? (row.created_at.toDate()) : (row.created_at);
      this.ratingChanged = row.rating;
      this.colorChanged = row.color;
      this.switchAutoB = row.flag_autob;
      this.switchLead = row.flag_lead;
      this.switchToprope = row.flag_topr;
      this.switchOverhang = row.flag_overh;
    },
    touchstart(row, event) {
      // console.log('in on start PRSSS.', row);
      this.mouse.longtouch = false;
      this.mouse.stillTouching = true;
      this.mouse.coord_x = event.x;
      this.mouse.coord_y = event.y;

      this.mouse.timer = setTimeout(() => {
        this.mouse.longtouch = true;
        this.mouse.timer = null;
        if (this.mouse.stillTouching === true) {
          this.longPressAction(row);
        }
      }, 900);
    },
    // if at the time you let go, the timer has gone off, it's a long touch
    // what i want:
    // if the timer goes off, check if still holding, if so, do the action
    touchend() {
      this.mouse.stillTouching = false;
      console.log('touchEnd.');
      if (this.mouse.timer) {
        clearTimeout(this.mouse.timer);
        this.mouse.timer = null;
        console.log('timer canceled.');
      }
      // if (this.mouse.longtouch) {
      //   console.log('in on LOOOOONG PRSSS.');
      //   // add logic here to happe after longpress
      //   this.mouse.longtouch = false;
      // }
    },
    mousemove(event) {
      if (this.mouse.timer) { // if timer is still going
        // if move more than 50 px each way, cancel
        if (Math.abs(event.x - this.mouse.coord_x) > 50
          || Math.abs(event.y - this.mouse.coord_y) > 50) {
          this.touchend();
          console.log('moved mouse too far away :(');
        }
      }
    },
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
    onBackModal() {
      this.routeNumChanged -= 1;
      if (this.routeNumChanged < 10) {
        this.routeNumChanged = 81;
      }
    },
    onNextModal() {
      this.routeNumChanged += 1;
      if (this.routeNumChanged > 81) {
        this.routeNumChanged = 10;
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
      this.modalInputEditVisible = false;
      console.log('componentKey watched!! componentKeyR=', this.componentKeyR);
      this.getRoutesAt(this.currentRouteNum);
    },
  },
};
</script>

<style lang="scss">
.content > * {
  margin-bottom: 0.5em;
}
.flexrow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.cellcontent {
  padding: 0.5em 0.75em;
}
.table td{
  padding: 0px 0px 0px 0px !important;
  // font-weight: 400;
  // font-size: 1.4em;
}
.centered {
  justify-content: center;
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
.flexcolumn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
