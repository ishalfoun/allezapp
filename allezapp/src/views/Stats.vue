<template>
  <div class='maincontainer' style="margin-top:0px!important">
    <div class='row title mt-2'>
      <h1 class='title is-1 centered'>Stats</h1>
      <!-- <button @click="onReload()" class="button is-success
        title is-4">Reload</button> -->
    </div>
    <div class="border">
      <b-table
      :key="componentKeyTable"
      style="width=100%"
      :mobile-cards="false"
      :data="entries"
      ref="table"
      sort-icon="arrow-up"
      sort-icon-size="is-small"
      default-sort="dateDone"
      default-sort-direction="asc">

        <b-table-column field="type" label="" sortable v-slot="props">
          <div class="flexrow">
            <template v-if="props.row.doneAs === 'Toprope'">
              <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' />
            </template>
            <template v-else-if="props.row.doneAs === 'Lead'">
              <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' />
            </template>
            <template v-else-if="props.row.doneAs === 'AutoB'">
              <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' />
            </template>
            <template v-if="props.row.cmpOrAttempt === 'A'">
              <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_warn.png?alt=media&token=a7d50e59-fc66-4cf1-99c4-e40eac2edd6b' />
            </template>
            <template v-else-if="props.row.cmpOrAttempt === 'Y'">
              <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_check.png?alt=media&token=a9528343-ea49-424c-9114-94b50447ab32' />
            </template>
            <template v-if="props.row.flag_overh"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_overh.png?alt=media&token=b6f36953-6baf-49e1-b47e-c2691fbc150b' /></template>
            <template v-else><div class='smallicon'></div></template>
            <template v-if="props.row.color">
              <div style="position:relative">
                <div class="bg square"
                  :style="{
                    'background-color': props.row.color,
                    'border-color': (props.row.color === 'white' ? 'black' : ''),
                    'border-width': (props.row.color === 'white' ? '1px' : ''),
                    'border-style': (props.row.color === 'white' ? 'solid' : ''),
                    }"
                    style="border-radius: 5px">&nbsp;
                </div>
              </div>
            </template>
            <div style="z-index:4;width:45px;"
              class="mr-2">{{props.row.rating}}
            </div>
          </div>
        </b-table-column>
        <!-- <b-table-column field="dateDone" label="Date" sortable v-slot="props">
          <div class="flexcenter">
            <template v-if="props.row.dateDone.toDate">
              {{ getShortDate(props.row.dateDone) }}:
            </template>
            <template v-else>
              {{props.row.dateDone}}
            </template>
              {{props.row.dateDone}}
          </div>
        </b-table-column> -->

        <b-table-column field="notes" label="Notes" sortable v-slot="props">
          <div>{{props.row.notes}}</div>
        </b-table-column>

        <b-table-column field="date" label="Date" sortable v-slot="props">
          {{getShortDate(props.row.dateDone)}}
        </b-table-column>
      </b-table>
      <template v-if="statsSummary.length === 0">
        <div>
          No Records
        </div>
      </template>
      {{message}}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    componentKeyTable: 0,
    message: '',
  }),
  mounted() {
    // this.initEntries();
    this.initEntries(this.profile[0]);
  },
  computed: {
    ...mapState('stats', ['statsSummary', 'entries']),
    ...mapState('profile', ['profile']),
  },
  methods: {
    ...mapActions('stats', ['initEntries', 'initStatsSummary', 'initStatsFull']),
    getShortDate(arg) {
      if (arg) {
        const toReturn = arg.toDate();
        return toReturn
          .getDate().toString().concat('/')
          .concat(toReturn.getMonth() + 1)
          .concat('/')
          .concat(toReturn.getFullYear());
      }
      return arg;
    },
    onReload() {
      console.log('in onReload');
      // this.initStatsFull();
      // this.initStatsSummary();
    },
    // async quickFixForALlEntryes() {
    //   const oneTestEntry = this.entries[0];
    //   console.log('oneTestEntry', oneTestEntry);

    //   this.entries.forEach(async (entry) => {
    //     await db
    //       .collection('profileroutes')
    //       .where('profileId', '==', 'aGyG5o6IaDZtnyK7ouOKmNU1UYP2')
    //       .where('routeId', '==', entry.routeId)
    //       .get()
    //       .then((querySnapshot) => {
    //         if (querySnapshot) {
    //           // console.log('Document data:', querySnapshot);
    //           querySnapshot.docs.forEach(async (doc) => {
    //             console.log('got doc:', { id: doc.id, ...doc.data() });
    //             // only pass the id and the original func arg
    //             // this.updateProfileRouteSingleField({ getters }, doc.id, arg);
    //             await db.collection('entries').doc(entry.id)
    //               .update({
    //                 color: doc.data().color,
    //                 flag_overh: doc.data().flag_overh,
    //                 rating: doc.data().rating,
    //                 routeNum: doc.data().routeNum,
    //               })
    //               .then(() => {
    //                 console.log('     quickFixupdateentry updated in DB!');
    //               })
    //               .catch((error) => {
    //                 console.error('      Error quickFixupdateentry updated in DB! ', error);
    //               });
    //           });
    //         } else {
    //           console.log('No such document!');
    //         }
    //       })
    //       .catch((error) => {
    //         console.log('Error getting document:', error);
    //       });
    //   });
    // .update({ lastUpdate: data.lastUpdate[0].lastUpdate.toDate() })
    // .then(() => {
    //   console.log('   profile.lastUpdate write success:',
    // data.lastUpdate[0].lastUpdate.toDate());
    //   if (data.loading) {
    //     data.loading = false;
    //   }
    // })
    // .catch((error) => {
    //   console.error('   profile.lastUpdate write error: ', error);
    // });
    // },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 3;
  width: 40px;
}
</style>
