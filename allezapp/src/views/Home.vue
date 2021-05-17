<template>
<div class='maincontainer' style="">
  <b-modal v-model="modalEditVisible" width="90%" scroll="keep">
    <div class="card">
      <div class="card-content">
          <!-- <div class="media">
              <div class="media-left">
                  <figure class="image is-48x48">
                      <img src="/static/img/placeholder-1280x960.png" alt="Image">
                  </figure>
              </div>
              <div class="media-content">
                  <p class="title is-4">color:{{modalProps.color}}</p>
                  <p class="subtitle is-6">@johnsmith</p>
              </div>
          </div> -->
          <!-- <div class="modalHeader">
            header
            </div> -->
          <div class="content">
            <div class="flexcenter">
              <div>
                <sup>Add Attempt</sup>
              </div>
            </div>
            <div class="title is-4 flexrow">
              <div>
                #{{modalProps.routeNum}}
              </div>
              <div>
                <template v-if="modalProps.flag_autob"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' /></template>
                <template v-if="modalProps.flag_overh"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_overh.png?alt=media&token=b6f36953-6baf-49e1-b47e-c2691fbc150b' /></template>
                <template v-else><div class='smallicon'></div></template>
                <template v-if="modalProps.flag_topr"><img class='smallicon ml-1' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' /></template>
                <template v-else><div class='smallicon'></div></template>
                <template v-if="modalProps.flag_lead"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' /></template>
                <template v-else><div class='smallicon'></div></template>
              </div>
              <div>
                <template v-if="modalProps.color">
                  <div id="square" :style="{
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
          </div>
          <div class="content">
            {{modalProps.switchTopLeadAuto}} asd
            <div class="flexcenter">
              <label class="radiobtncontainer flexcenter button"
               :disabled="!modalProps.flag_topr">
                <span class="radioLabel flexcenter">
                  <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' />
                  <span class="ml-1">Toprope</span>
                </span>
                <input type="radio" name="radio"
                 :checked="((modalProps.flag_topr) && (modalProps.switchTopLeadAuto==='Toprope'))"
                 :disabled="!modalProps.flag_topr">
                <span class="radioBg"></span>
              </label>
              <label class="radiobtncontainer flexcenter button"
               :disabled="!modalProps.flag_lead">
                <span class="radioLabel flexcenter">
                  <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' />
                  <span class="ml-1">Lead</span>
                </span>
                <input type="radio" name="radio"
                 :checked="((modalProps.flag_lead) && (modalProps.switchTopLeadAuto==='Lead'))"
                 :disabled="!modalProps.flag_lead">
                <span class="radioBg red"></span>
              </label>
               <label class="radiobtncontainer flexcenter button"
                :disabled="!modalProps.flag_autob">
                <span class="radioLabel flexcenter">
                  <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' />
                  <span class="ml-1">AutoB</span>
                </span>
                <input type="radio" name="radio"
                :checked="(modalProps.flag_autob)"
                 :disabled="!modalProps.flag_autob">
                <span class="radioBg blue"></span>
              </label>
            </div>
            <!-- <div class="flexrow mb-5">
              <b-field>
                <b-radio-button v-model="modalProps.switchTopLeadAuto"
                  native-value="top"
                  type="is-warning is-outlined">
                  <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' />
                  <span class="ml-2">Toprope</span>
                </b-radio-button>

                <b-radio-button v-model="modalProps.switchTopLeadAuto"
                  native-value="lead"
                  type="is-danger is-outlined">
                  <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' />
                  <span class="ml-2">Lead</span>
                </b-radio-button>

                <b-radio-button v-model="modalProps.switchTopLeadAuto"
                    native-value="auto"
                    disabled>
                    <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' />
                    <span class="ml-2">AutoB</span>
                </b-radio-button>
              </b-field>
            </div> -->
            <div>
              <b-field label="Personal Notes"
                label-position="on-border">
                <b-input maxlength="70" v-model="modalProps.notes"
                  placeholder="Enter Personal Notes here..."></b-input>
              </b-field>
            </div>
            <div class="content-left">
              <b-field label="Date"
                label-position="on-border">
                <b-input maxlength="13" v-model="modalProps.date"
                  placeholder="" style="width:130px"></b-input>
              </b-field>
            </div>
            <div class="flexrow mt-2" style="justify-content:space-evenly">
              <b-field>
                <b-button class="is-warning" @click="onModalAttempted()">Attempted</b-button>
              </b-field>
              <b-field>
                <b-button class="is-success" @click="onModalCompleted()">Completed</b-button>
              </b-field>
            </div>
            <div class="flexcenter">
              <div>
                <sub>Route added: {{getShortDate(modalProps.created_at)}}</sub>
              </div>
            </div>
            <!-- <div class="flexrow">
              <div class="content-left">
                <b-field label="">
                  <b-input v-model="modal.pctCmp" placeholder="100" style="width:50px"></b-input>
                </b-field>
                <div class="modal-label">% Cmp</div>
              </div>
              <div class="content-left">
                <b-button class="is-success">Completed</b-button>
              </div>
            </div>
            <div class="flexrow">
              <div class="content-left">
                <b-field label="">
                  <b-input v-model="modal.falls" placeholder="0" style="width:50px"></b-input>
                </b-field>
                <div class="modal-label"> Falls/Takes</div>
              </div>
              <div class="content-left">
                <b-button class="is-warning">Attempted</b-button>
              </div>
            </div> -->
          </div>
      </div>
  </div>
</b-modal>

  <b-modal v-model="modalViewVisible" width="90%" scroll="keep">
    <div class="card">
      <div class="card-content">
        <div class="content">
            <div class="flexcenter">
              <div>
                <sup>View Attempts</sup>
              </div>
            </div>
            <div class="title is-4 flexrow">
              <div>
                #{{modalProps.routeNum}}
              </div>
              <div>
                <template v-if="modalProps.flag_autob"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' /></template>
                <template v-if="modalProps.flag_overh"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_overh.png?alt=media&token=b6f36953-6baf-49e1-b47e-c2691fbc150b' /></template>
                <template v-else><div class='smallicon'></div></template>
                <template v-if="modalProps.flag_lead"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' /></template>
                <template v-else><div class='smallicon'></div></template>
                <template v-if="modalProps.flag_topr"><img class='smallicon ml-1' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' /></template>
                <template v-else><div class='smallicon'></div></template>
              </div>
              <div>
                <template v-if="modalProps.color">
                  <div id="square" :style="{
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
          </div>*
        <div class="content-left" v-for="(entry) in entries" :key="entry.id">
          <div style="width: 10%" class="">{{entry.cmpOrAttempt}}</div>
          <div style="width: 30%" class="">
            {{
            entry.dateDone.toDate().getUTCFullYear()
            }}/{{
            (entry.dateDone.toDate().getUTCMonth() + 1)
            }}/{{
            entry.dateDone.toDate().getUTCDate()
            }}
          </div>
          <div style="width: 60%" class="">{{entry.notes}}</div>
          <a class="button is-ghost is-small pl-2 pr-2 extrasmall"
          @click="onModalViewDelete(entry)">
            X
          </a>
        </div>
    </div>
  </div>
</b-modal>

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
    <!-- <div class="flexrow mt-3">
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
    </div> -->
    <div class="mt-3">
      <b-table
      id="table"
      :key="componentKey"
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
          <div @click="onViewRoute(props.row)">
            <span class="routeNum">{{props.row.routeNum}}</span>
            <template v-if="props.row.flag_autob"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' /></template>
            <template v-if="props.row.flag_overh"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_overh.png?alt=media&token=b6f36953-6baf-49e1-b47e-c2691fbc150b' /></template>
            <template v-else><div class='smallicon'></div></template>
            <template v-if="props.row.flag_topr"><img class='smallicon ml-1' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' /></template>
            <template v-else><div class='smallicon'></div></template>
            <template v-if="props.row.flag_lead"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' /></template>
            <template v-else><div class='smallicon'></div></template>
          </div>
        </b-table-column>
        <b-table-column field="rating" label="Rating" sortable v-slot="props">
          <div @click="onViewRoute(props.row)">
            <template v-if="props.row.color">
              <div id="square"
                :style="{
                  'background-color': props.row.color,
                  'border-color': (props.row.color === 'white' ? 'black' : ''),
                  'border-width': (props.row.color === 'white' ? '1px' : ''),
                  'border-style': (props.row.color === 'white' ? 'solid' : ''),
                  }"
                  style="border-radius: 5px;">&nbsp;
              </div>
            </template>
            {{props.row.rating}}
          </div>
        </b-table-column>
        <b-table-column field="cmp" label="Completed" sortable v-slot="props">
          <div class="flexrow" @click="onViewRoute(props.row)">
            <div>
                <img v-if="props.row.cmp === 'A'" class='smallicon attempt' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' />
                <img v-if="props.row.cmp === 'Y'" class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' />
            </div>
            <!-- <div>
              <button><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_edit.png?alt=media&token=6eaa64b0-50e0-4c82-b8a0-ad6aa1627219' /></button>
            </div> -->
            <div>
              <button v-on:click.stop="onEditRoute(props.row)"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_edit.png?alt=media&token=6eaa64b0-50e0-4c82-b8a0-ad6aa1627219' /></button>
            </div>
          </div>
          <!-- <img class='icon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/rope.png?alt=media&token=c8f1cf11-05ff-4367-a6d7-ead1426a48a1' />
          <img class='icon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/rope%20(2).png?alt=media&token=24fe9813-1b76-4a9d-ace0-afebfc7e7d8d' />
          <img class='icon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/rope%20(1).png?alt=media&token=b044feba-497a-45eb-9980-6b41c56eea63' />
          <img class='icon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner.png?alt=media&token=94cf8933-f227-49bb-b5f1-7426c50f8bcf' />
          <img class='icon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/leadclimb2.png?alt=media&token=d92b56c1-c1e8-4731-bc50-47b096143156' /> -->
          <!-- <img class='icon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' /> -->
        </b-table-column>

        <template #footer v-if="(profileroutes.length < 1)">
          <div class="has-text-right">Connecting to Server...</div>
        </template>
      </b-table>
      <div class="flexrow mt-3">
        <h5 v-if="profile[0] && profile[0].lastUpdate">
          last update:
            {{
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
import firebase from '@/firebase';

export default {
  data: () => ({
    modalEditVisible: false,
    modalViewVisible: false,
    modalProps: {
      rating: '',
      color: '',
      route: '',
      id: '',
      comments: [],
      date: '',
      notes: '',
      create_at: '',
      switchTopLeadAuto: '',
    },
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
    ...mapState('dataJS', ['routesReal', 'profileroutes', 'lastUpdate', 'entries']),
    ...mapState('profile', ['profile']),
    ...mapState('auth', ['user']),
    ...mapGetters('dataJS', ['getLoading', 'getComponentKey2']),
    componentKey2: {
      get() {
        return this.getComponentKey2;
      },
      set(newValue) {
        this.$store.dispatch('dataJS/setComponentKey2', newValue);
      },
    },
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
    ...mapActions('dataJS', ['initRoutes', 'initLastUpdate', 'initProfileRoutes', 'getRoutes', 'setCompleted', 'modalComplete', 'modalAttempted', 'deleteStat', 'initEntries']),
    // onClickSwitch(arg) {
    //   console.log('in onClick', arg);
    //   if (arg === 'topr') {
    //     this.modalProps.switchLead = !this.modalProps.switchLead;
    //   } else if (arg === 'lead') {
    //     this.modalProps.switchTopr = !this.modalProps.switchTopr;
    //   }
    //   // this.modalProps.switchTopr = this.modalProps.switchTopr
    // },
    onModalViewDelete(arg) {
      console.log('arg: ', arg);
      this.deleteStat(arg);
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
    onModalCompleted() {
      console.log('onModalCMP', this.modalProps);
      // 1. create a newrecord in statistics table with all props and date
      // 2. also set the records flag to the appropriate ( check if topr or lead)
      this.modalComplete(this.modalProps);
    },
    onModalAttempted() {
      this.modalAttempted(this.modalProps);
    },
    onViewRoute(row) {
      this.modalProps = row; // wherever the user clicked, set the modal to that data
      // this.modalProps.entries = this.getEntries(row);
      this.modalViewVisible = true;
      console.log(' onViewRoute: modalProps= ', this.modalProps);
      // entries are not showing up yet, using this function to load them.
      // (links to profileroutes table, key is id (profileroutesid))
      this.initEntries(row.id).then(() => {
        console.log('finished loading entries: ', this.entries);
      });
    },
    onEditRoute(row) {
      // event.stopPropagation();
      console.log('in edit row: ', row);
      this.modalProps = row;
      this.modalProps.notes = '';
      this.modalProps.switchTopLeadAuto = this.profile[0].default;
      this.modalProps.profileRoutesId = row.id;
      this.modalEditVisible = true;
      // this.modalProps.date = firebase.firestore.FieldValue.serverTimestamp().toString();
      // this.modalProps.date = firebase.firestore.Timestamp.now().toDate().getMonth()+1;
      // const now = firebase.firestore.Timestamp.now().toDate();
      // this.modalProps.date = now.getFullYear().toString().concat('/');
      // this.modalProps.date = this.modalProps.date.concat(now.getMonth() + 1).concat('/');
      this.modalProps.date = this.getShortDate(firebase.firestore.Timestamp.now());
    },
    onLegend() {
      this.componentKey += 1;
      console.log('component ket = ', this.componentKey);
      // this.$buefy.dialog.alert({
      //   title: 'Legend',
      //   message: 'I have a title, a custom button and <b>HTML</b>!',
      //   confirmText: 'Cool',
      // });
    },
    // onGetRoutesManually() {
    //   this.getRoutes(this.profile[0]);
    // },
    // onShowAll() {
    //   this.displayRoutes = this.profileroutes;
    //   console.log('in onShowAll, this.displayRoutes=', this.displayRoutes.length);
    // },
    // onShowMiss() {
    //   this.displayRoutes = this.profileroutes.filter((element) => (element.cmp === 'N'));
    //   console.log('in onShowMiss, this.displayRoutes=', this.displayRoutes.length);
    // },
    // onShowCmp() {
    //   this.displayRoutes = this.profileroutes.filter((element) => (element.cmp === 'Y'));
    //   console.log('in onShowCmp, this.displayRoutes=', this.displayRoutes);
    // },
    wait(timeout) { // await wait(500);
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    },
    onCompleted() {
      // this.row = row;
      // if (this.row.cmp === 'Y') {
      //   this.row.cmp = 'N';
      // } else {
      //   this.row.cmp = 'Y';
      // }
      // this.setCompleted(this.row);
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
        // console.log('       calling getRoutes', this.profile[0]);
        this.getRoutes(this.profile[0]);
        // this.displayRoutes = this.profileroutes;
        this.happenedAlreadyGetRoutes = true;
      }
    },
  },
  watch: {
    // modalSwitchTopr() {
    //   console.log('modalSwitchTopr watched!', this.modalProps.switchTopr);
    //   // this.modalSwitchLead = !this.modalSwitchLead;
    //   // this.modalProps.switchTopr = !this.modalProps.switchTopr;
    //   // this.modalProps.switchLead = !this.modalProps.switchTopr;
    // },
    // modalSwitchLead() {
    //   console.log('modalSwitchLead watched!', this.modalProps.switchLead);
    //   // this.modalSwitchTopr = !this.modalSwitchTopr;
    //   // this.modalProps.switchLead = !this.modalProps.switchLead;
    //   // this.modalProps.switchTopr = !this.modalProps.switchLead;
    // },
    loading(arg) {
      console.log('loading watched!', arg);
      if (arg) {
        this.loadingComponent = this.$buefy.loading.open();
      } else {
        this.loadingComponent.close();
      }
    },
    ///
    // if componenkey2 is changed in backend, also update here.
    ///
    componentKey2(arg) {
      console.log('componentKey2 watched!', arg);
      this.componentKey += 1;
      this.modalEditVisible = false;
    },
    async profile() {
      // console.log('1. in profileWatch, happened=', this.happenedAlready);
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
      // also set the default toprope/lead when user logs in (profile changes)
      console.log(' profile default in db is: ', this.profile[0].default);
      if (this.profile[0].default) {
        this.modalProps.switchTopLeadAuto = this.profile[0].default;
        console.log(' profile default in modalProps is: ', this.modalProps.switchTopLeadAuto);
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
.extrasmall {
  margin: 2px;
  font-size: 0.50rem;
}
.modalHeader {
  position: absolute;
  left: 1em;
  font-size: calc(1rem * 3 / 4);
  background-color: transparent;
  z-index: 5;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: calc(100% - 2em);
  overflow: hidden;
  // top: -0.775em;
  //   padding-left: 0.125em;
  //   padding-right: 0.125em;
}
.card-content {
  padding-bottom: 0.5em;
  padding-top: 6px;
}
.flexcenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* The radiobtn container */
.radiobtncontainer {
  display: block;
  position: relative;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.radiobtncontainer input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom background box aka checkbox*/
.radioBg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: white;
  z-index: 41;
  /*border-radius: 50%;*/
}

/* On mouse-over, add a grey background color */
/* dont need a mouse over yet
.radiobtncontainer:hover input ~ .radioBg {
  background-color: #white;
}*/

/* When the radio button is checked, add a yellow background */
.radiobtncontainer input:checked ~ .radioBg {
  background-color: #fadb60;
}
.radiobtncontainer input:checked ~ .radioBg.red {
  background-color: rgb(253, 114, 114);
}
.radiobtncontainer input:checked ~ .radioBg.blue {
  background-color: #1d34ff8e;
}
.radioLabel {
  z-index: 42;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
// .radioBg:after {
//   content: "";
//   position: absolute;
//   display: none;
// }

/* Show the indicator (dot/circle) when checked */
// .radiobtncontainer input:checked ~ .radioBg:after {
//   display: block;
// }

/* Style the indicator (dot/circle) */
/*.radiobtncontainer .radioBg:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}*/
//
// end radio button
//

.date{
  align-self: center;
  width: 100%;
}
.modal-label {
  align-self: center;
  margin-bottom: 0.75rem;
}
.content-left {
  display: flex;
}
#square {
  display: inline-block;
  height: 20px;
  width: 20px;
  position: relative;
  top: 10%;
  border-radius: 5px;
}
.routeNum {
  width: 23px;
  display: inline-block;
}
.smallicon {
  width: 15px;
  height: 15px;
  display: inline-block;
  margin: 2px;
}
.attempt {
  opacity: 30%;
}
/deep/.dropdown .background {
  background-color: rgba(10, 10, 10, 0.65) !important;
}
/deep/.b-table .table-wrapper.has-sticky-header {
  height: 490px !important;
}
// /deep/.b-table td {
//   text-align: right;
// }
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
  font-weight: 600;
  font-size: 1.2em;
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
.flexcenter {
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
