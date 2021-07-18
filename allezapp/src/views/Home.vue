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
                  <div class="square" :style="{
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
            <div class="flexcenter">
              <label class="radiobtncontainer flexcenter button"
               :disabled="!modalProps.flag_topr">
                <span class="radioLabel flexcenter">
                  <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' />
                  <span class="ml-1">Toprope</span>
                </span>
                <input type="radio" name="radio"
                  :disabled="!modalProps.flag_topr"
                  v-model="switchTopLeadAuto"
                  value="Toprope">
                <span class="radioBg"></span>
              </label>
              <label class="radiobtncontainer flexcenter button"
               :disabled="!modalProps.flag_lead">
                <span class="radioLabel flexcenter">
                  <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' />
                  <span class="ml-1">Lead</span>
                </span>
                <input type="radio" name="radio"
                 :disabled="!modalProps.flag_lead"
                 v-model="switchTopLeadAuto"
                 value="Lead">
                <span class="radioBg red"></span>
              </label>
               <label class="radiobtncontainer flexcenter button"
                :disabled="!modalProps.flag_autob">
                <span class="radioLabel flexcenter">
                  <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' />
                  <span class="ml-1">AutoB</span>
                </span>
                <input type="radio" name="radio"
                 :disabled="!modalProps.flag_autob"
                 v-model="switchTopLeadAuto"
                 value="AutoB">
                <span class="radioBg blue"></span>
              </label>
            </div>
            <div class="mb-2 flexcontainer" style="margin: auto;">
              <b-field class="checkbox">
                  <b-checkbox v-model="modalProps.checkboxPostPublic"
                      true-value="Yes"
                      false-value="No">
                      Post Public
                  </b-checkbox>
              </b-field>
              <div class="flexendcontainer">
                <div class="starsRating">
                  <input name="stars" id="e5" type="radio"
                    v-model="switchStars"
                    value="5">
                    <label for="e5">★</label>
                  <input name="stars" id="e4" type="radio"
                    v-model="switchStars"
                    value="4">
                    <label for="e4">★</label>
                  <input name="stars" id="e3" type="radio"
                    v-model="switchStars"
                    value="3">
                    <label for="e3">★</label>
                  <input name="stars" id="e2" type="radio"
                    v-model="switchStars"
                    value="2">
                    <label for="e2">★</label>
                  <input name="stars" id="e1" type="radio"
                    v-model="switchStars"
                    value="1">
                    <label for="e1">★</label>
                </div>
              </div>
            </div>
            <div>
              <b-field label="Comment"
                label-position="on-border">
                <b-input maxlength="70" v-model="modalProps.notes"
                  placeholder="Enter Comment here..."></b-input>
              </b-field>
            </div>
            <div class="content-left">
              <!-- <b-input maxlength="13" v-model="modalProps.date"
                placeholder="" style="width:130px"></b-input> -->
              <b-field label="Select a date"
                label-position="on-border">
                <b-datepicker
                  v-model="modalProps.date"
                  placeholder="Click to select..."
                  icon="calendar-today"
                  trap-focus>
                </b-datepicker>
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
  <b-button class="is-danger modalMapButton"
    @click="modalMapExpanded = !modalMapExpanded">
    Map
  </b-button>
  <div class="card">
    <template class="card" v-if="(modalMapExpanded)">
      <div class="card" @click="modalMapExpanded = false">
        <img :src="getModalMapImageSource(modalProps.routeNum)"/>
        <!-- <img src="https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/allezapp_map2.png?alt=media&token=94a05731-2df8-4685-877f-eae1746766b6" /> -->
      </div>
    </template>
    <div class="card-content">
      <div class="">
        <div class="flexrow">
          <div>
            <sup>Location:</sup>
          </div>
          <div class="pr-4">
            <sup>Type:</sup>
          </div>
          <div>
            <sup>Rating:</sup>
          </div>
          <div>
            <sup>Completed:</sup>
          </div>
        </div>
      </div>
      <div class="content">
          <div class="title is-4 flexrow">
            <div style="width:20%">
              #{{modalProps.routeNum}}
            </div>
            <div>
              <template v-if="modalProps.flag_autob"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' />
              </template>
              <template v-if="modalProps.flag_overh"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_overh.png?alt=media&token=b6f36953-6baf-49e1-b47e-c2691fbc150b' /></template>
              <template v-else><div class='smallicon'></div></template>
              <template v-if="modalProps.flag_lead"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' /></template>
              <template v-else><div class='smallicon'></div></template>
              <template v-if="modalProps.flag_topr"><img class='smallicon ml-1' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' /></template>
              <template v-else><div class='smallicon'></div></template>
            </div>
            <div>
              <template v-if="modalProps.color">
                <div class="square" :style="{
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
            <div class="flexrow"
              style="align-items:center;padding-left:2px">
              <template v-if="modalProps.toprope_cmp === 'A'">
                <img class='smallicon attempt' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' />
              </template>
              <template v-else-if="modalProps.toprope_cmp === 'Y'">
                <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' />
              </template>
              <template v-else>
                <div class='smallicon'></div>
              </template>

              <template v-if="modalProps.lead_cmp === 'A'">
                <img class='smallicon attempt' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' />
              </template>
              <template v-else-if="modalProps.lead_cmp === 'Y'">
                <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' />
              </template>
              <template v-else>
                <div class='smallicon'></div>
              </template>

              <template v-if="modalProps.autob_cmp === 'A'">
                <img class='smallicon attempt' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' />
              </template>
              <template v-else-if="modalProps.autob_cmp === 'Y'">
                <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' />
              </template>
              <template v-else>
                <div class='smallicon'></div>
              </template>
            </div>
          </div>
          <div class="flexcenter">
            <div>
              <sup>Personal Entries</sup>
            </div>
          </div>
        </div>
      <div class="" :key="componentKeyEntries">
        <div class="content-left entryStyle"
          v-for="(entry) in sortEntries(entries)"
          :key="entry.id" @click="entryRowClick(entry)">
          <!-- <div style="width: 10%" class="">{{entry.cmpOrAttempt}}</div> -->
          <div style="width: 20%" class="flexcenter">
            <template v-if="entry.doneAs === 'Toprope'">
              <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' />
            </template>
            <template v-else-if="entry.doneAs === 'Lead'">
              <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' />
            </template>
            <template v-else-if="entry.doneAs === 'AutoB'">
              <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' />
            </template>
            <template v-if="entry.cmpOrAttempt === 'A'">
              <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_warn.png?alt=media&token=a7d50e59-fc66-4cf1-99c4-e40eac2edd6b' />
            </template>
            <template v-else-if="entry.cmpOrAttempt === 'Y'">
              <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_check.png?alt=media&token=a9528343-ea49-424c-9114-94b50447ab32' />
            </template>
          </div>
          <div style="width: 30%" class="mr-2 ml-2 flexcenter">
            <template v-if="entry.dateDone.toDate">
              {{ getShortDate(entry.dateDone) }}:
            </template>
            <template v-else>
              {{entry.dateDone}}
            </template>
          </div>
          <div style="width: 60%" class="ml-2">{{entry.notes}}</div>
          <div style="width: 20%" class="button is-danger is-small mega-small"
            v-if="entry.deleteButtonVisible" @click="onClickEntryDeleteConfirm(entry)">Delete?</div>
          <a class="flexcenter button is-ghost is-small pl-2 pr-2 extrasmall"
            @click.stop="onClickEntryDeleteShow(entry)">
            X
          </a>
        </div>
      </div>
      <div class="content"> <br /> </div>
      <div class="content mt-4">
        <div class="flexcenter">
          <div>
            <sup>Public Comments:</sup>
          </div>
        </div>
      </div>
      <div :key="componentKeyComments+'a'">
        <div class="media" v-for="(comment) in comments" :key="comment.id"
         @click="commentRowClick(comment)">
          <div class="media-left">
            <figure class="image is-32x32 is-centered">
              <img :src="comment.image" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <div class="flexendcontainer">
                <span>
                  <strong>{{comment.username}}</strong>
                </span>
                <span>
                  <small>
                    <template v-if="comment.dateDone">
                      {{
                        Math.round((new Date() - comment.dateDone.toDate()) / (1000 * 3600 * 24))
                      }}
                       day(s) ago
                    </template>
                  </small>
                </span>
                <span class='flexendcontainer' >
                  <template v-if="comment.doneAs === 'AutoB'">
                    <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' />
                  </template>
                  <template v-if="comment.doneAs === 'Toprope'">
                    <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' />
                  </template>
                  <template v-else-if="comment.doneAs === 'Lead'">
                    <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' />
                  </template>
                  <template v-if="comment.cmpOrAttempt === 'A'">
                    <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_warn.png?alt=media&token=a7d50e59-fc66-4cf1-99c4-e40eac2edd6b' />
                  </template>
                  <template v-else-if="comment.cmpOrAttempt === 'Y'">
                    <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_check.png?alt=media&token=a9528343-ea49-424c-9114-94b50447ab32' />
                  </template>
                </span>
                <span class='flexendcontainer' >
                  <div class="button is-danger is-small mega-small"
                    v-if="comment.deleteButtonVisible"
                    @click="onClickCommentDeleteConfirm(comment)">
                    Confirm?
                  </div>
                  <a class="button is-ghost is-small pl-2 pr-2 extrasmall"
                    v-if="checkIfDeleteCommentAllowed(comment)"
                    @click.stop="onClickCommentDeleteShow(comment)">
                    X
                  </a>
                </span>
              </div>
              <div class="starsDisplay">
                <label :class="{yellowStar: (Number(comment.stars) >= 1) ? true : false}">★</label>
                <label :class="{yellowStar: (Number(comment.stars) >= 2) ? true : false}">★</label>
                <label :class="{yellowStar: (Number(comment.stars) >= 3) ? true : false}">★</label>
                <label :class="{yellowStar: (Number(comment.stars) >= 4) ? true : false}">★</label>
                <label :class="{yellowStar: (Number(comment.stars) >= 5) ? true : false}">★</label>
              </div>
              <div>
                {{comment.notes}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flexcenter mt-4">
        <div>
          <sub>Route added: {{getShortDate(modalProps.created_at)}}</sub>
        </div>
        <div>
          <span class="button is-danger is-small extrasmall is-rounded smallbutton"
            v-if="isDateRecent(modalProps.created_at)">(NEW!)</span>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="flexcontainer">
    <div class="button is-danger is-small" style="margin:auto"
      @touchstart.stop="touchstart()" @mousedown.stop="touchstart()"
      @touchend.stop="touchend()" @mouseup.stop="touchend()">Long-Click to Delete</div>
  </div> -->
</b-modal>
<!--
-in the 'location'column:
 -the number represents where in the gym the route is
  the icons represent what type of route it is:
    (a) = autobelay
    (t)) = toprope able
    (l) = leadable
  -use the botton on the right end of each line if you attempted or completed a route.
    you can add personal notes or modify the date
  -(attempt) = means you only attempted the route
  -(cmp) = means you also completed the route.
  -->
  <b-modal v-model="modalLegendVisible" width="90%" scroll="keep">
    <div class="card">
      <div class="card-content">
        <div class="content">
            <div class="flexcenter">
              <div>
                <h3>Legend</h3>
              </div>
            </div>
            <div class="flexrow">
            </div>
            <h5>In the 'Location' column: </h5>
            <li class="">The number represents where in the gym the route is. </li>
            <li class="">The icons represent what type of route it is:</li>
            <div class="ml-4"> <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' /> = Autobelay</div>
            <div class="ml-4"> <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' /> = Toprope</div>
            <div class="ml-4"> <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' /> = Lead</div>
            <div class="ml-4"> <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_overh.png?alt=media&token=b6f36953-6baf-49e1-b47e-c2691fbc150b' /> = Overhang</div>
            <h5 class="mt-4">In the 'Completed' column: </h5>
            <li>Use the button on the right side if
              you attempted or completed a route.</li>
            <li>When you complete or attempt a route, it will show as:</li>
            <div class="ml-4">
              <img class='smallicon attempt' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' />
              <img class='smallicon attempt' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' />
              = Attempt
            </div><div class="ml-4">
              <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' />
              <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' />
              = Completed
            </div>
            <h5 class="mt-4">When viewing your attempts:</h5>
            <div class="ml-4"> <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_warn.png?alt=media&token=a7d50e59-fc66-4cf1-99c4-e40eac2edd6b' /> = Attempt </div>
            <div class="ml-4"> <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_check.png?alt=media&token=a9528343-ea49-424c-9114-94b50447ab32' /> = Completed</div>
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
      :data="filterRoutes(profileroutes)"
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
        <b-table-column field="routeNum" :custom-sort="customSortFuncRouteNum"
         label="Location" sortable v-slot="props">
          <div @click="onViewRoute(props.row)">
            <span class="routeNum">{{props.row.routeNum}}</span>
            <template v-if="props.row.flag_autob"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' /></template>
            <template v-if="props.row.flag_overh"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_overh.png?alt=media&token=b6f36953-6baf-49e1-b47e-c2691fbc150b' /></template>
            <template v-else><div class='smallicon'></div></template>
            <template v-if="props.row.flag_topr"><img class='smallicon ml-1' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' /></template>
            <template v-else><div class='smallicon'></div></template>
            <template v-if="props.row.flag_lead"><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' /></template>
            <template v-else><div class='smallicon'></div></template>
            <!-- {{isDateRecentNum(props.row.created_at)}} -->
          </div>
        </b-table-column>
        <b-table-column field="rating" :custom-sort="customSortFuncRating"
         label="Rating" sortable v-slot="props">
          <div class="flexcontainer"
           style="align-items:center;justify-content: flex-start;" @click="onViewRoute(props.row)">
            <template v-if="props.row.color">
              <div class="square mr-2"
                :style="{
                  'background-color': props.row.color,
                  'border-color': (props.row.color === 'white' ? 'black' : ''),
                  'border-width': (props.row.color === 'white' ? '1px' : ''),
                  'border-style': (props.row.color === 'white' ? 'solid' : ''),
                  }"
                  style="border-radius: 5px">&nbsp;
              </div>
            </template>
            <div>{{props.row.rating}}
            </div>
            <span class="button is-danger is-small extrasmall is-rounded smallbutton"
              v-if="isDateRecent(props.row.created_at)">(NEW!)</span>
          </div>
        </b-table-column>
        <b-table-column field="cmp" label="Completed"
          :custom-sort="customSortFuncCmp" sortable v-slot="props">
          <div class="flexrow"
           style="align-items:center;padding-left:2px" @click="onViewRoute(props.row)">
            <template v-if="props.row.toprope_cmp === 'A'">
              <img class='smallicon attempt' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' />
            </template>
            <template v-else-if="props.row.toprope_cmp === 'Y'">
              <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/iconp_topr.png?alt=media&token=e02edaf4-0f0d-40af-8048-481a3f3dd8ed' />
            </template>
            <template v-else>
              <div class='smallicon'></div>
            </template>

            <template v-if="props.row.lead_cmp === 'A'">
              <img class='smallicon attempt' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' />
            </template>
            <template v-else-if="props.row.lead_cmp === 'Y'">
              <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/carabiner%20(1).png?alt=media&token=d6e81e07-3cc7-48ef-9dda-c1087c9da84b' />
            </template>
            <template v-else>
              <div class='smallicon'></div>
            </template>

            <template v-if="props.row.autob_cmp === 'A'">
              <img class='smallicon attempt' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' />
            </template>
            <template v-else-if="props.row.autob_cmp === 'Y'">
              <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_autob.png?alt=media&token=85f1bdb2-96eb-4d6a-8753-0f9b0702233d' />
            </template>
            <template v-else>
              <div class='smallicon'></div>
            </template>
            <div></div>
            <!-- <div>
              <button><img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_edit.png?alt=media&token=6eaa64b0-50e0-4c82-b8a0-ad6aa1627219' /></button>
            </div> -->
            <div>
              <button v-on:click.stop="onEditRoute(props.row)">
                <img class='smallicon' src='https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/icon_edit.png?alt=media&token=6eaa64b0-50e0-4c82-b8a0-ad6aa1627219' />
              </button>
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
          last update: {{ getShortDate(profile[0].lastUpdate) }}
        </h5>
        <h5 @click="onLegend()" style="cursor:pointer">
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
    modalLegendVisible: false,
    modalMapExpanded: false,
    modalProps: {
      rating: '',
      color: '',
      route: '',
      id: '',
      comments: [],
      date: new Date(),
      notes: '',
      create_at: '',
      switchTopLeadAuto: '',
      checkboxPostPublic: '',
    },
    picked: '',
    switchTopLeadAuto: '',
    switchStars: '',
    componentKey: 0,
    componentKeyEntries: 0,
    componentKeyComments: 0,
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
    convertedRatings: {
      5.7: 7,
      5.8: 8,
      5.9: 9,
      '5.10a': 10,
      '5.10b': 11,
      '5.10c': 12,
      '5.10d': 13,
      '5.11a': 14,
      '5.11b': 15,
      '5.11c': 16,
      '5.11d': 17,
      '5.12a': 18,
      '5.12b': 19,
      '5.12c': 20,
      '5.12d': 21,
      '5.13a': 22,
      '5.13b': 23,
      '5.13c': 24,
      '5.13d': 25,
      '5.14a': 26,
      '5.14b': 27,
      '5.14c': 28,
      '5.14d': 29,
    },
    longtouch: null,
    timer: null,
    touchduration: 900, // length of time we want the user to touch before we do something
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
    ...mapState('dataJS', ['routesReal', 'profileroutes', 'lastUpdate', 'entries', 'comments', 'filters']),
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
    ...mapActions('dataJS', ['initRoutes', 'initLastUpdate', 'initProfileRoutes', 'getRoutes', 'setCompleted', 'modalSubmit', 'deleteEntry', 'deleteComment', 'initEntries', 'initComments']),
    getModalMapImageSource(routeNum) {
      if (routeNum >= 10 && routeNum <= 17) {
        return 'https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/allezapp_map_sec1.png?alt=media&token=8b23acad-22ab-4667-8848-1dfd19187ac2';
      }
      if (routeNum >= 18 && routeNum <= 20) {
        return 'https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/allezapp_map_sec2.png?alt=media&token=64e157f0-c9ee-4251-8bf5-df50b1afdcc8';
      }
      if (routeNum >= 21 && routeNum <= 26) {
        return 'https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/allezapp_map_sec3.png?alt=media&token=a9334c87-b7a9-4a6b-a795-a60357302250';
      }
      if (routeNum >= 27 && routeNum <= 34) {
        return 'https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/allezapp_map_sec4.png?alt=media&token=101898a3-c6d4-4e87-b9f8-5e42a5b1ecf9';
      }
      if (routeNum >= 35 && routeNum <= 41) {
        return 'https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/allezapp_map_sec5.png?alt=media&token=431d4ea2-03af-4de7-a086-5e422663cf89';
      }
      if (routeNum >= 42 && routeNum <= 47) {
        return 'https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/allezapp_map_sec6.png?alt=media&token=d5d7ba76-ccae-4087-acd8-af678327054f';
      }
      if (routeNum >= 48 && routeNum <= 52) {
        return 'https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/allezapp_map_sec7.png?alt=media&token=4130f337-a898-43b3-b9c2-f5c1bcac81ec';
      }
      if (routeNum >= 53 && routeNum <= 58) {
        return 'https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/allezapp_map_sec8.png?alt=media&token=ab16cf27-3a41-45c7-bf4c-88807df3e78a';
      }
      if (routeNum >= 59 && routeNum <= 65) {
        return 'https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/allezapp_map_sec9.png?alt=media&token=9056e3a1-85e3-4c3e-a31b-cab2e95bc707';
      }
      if (routeNum >= 66 && routeNum <= 73) {
        return 'https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/allezapp_map_sec10.png?alt=media&token=2eaa2377-ece2-43a4-9dc5-bb2af8897f2c';
      }
      if (routeNum >= 74 && routeNum <= 80) {
        return 'https://firebasestorage.googleapis.com/v0/b/allezapp-isaak.appspot.com/o/allezapp_map_sec11.png?alt=media&token=13b2a799-d99f-4ba7-af01-977fe867647d';
      }
      return null;
    },
    isDateRecentNum(timestamp) {
      if (timestamp) {
        const today = new Date();
        const dateDone = timestamp.toDate();
        return (Math.round((today - dateDone) / (1000 * 3600 * 24)));
      }
      return false;
    },
    isDateRecent(timestamp) {
      if (timestamp) {
        const today = new Date();
        const dateDone = timestamp.toDate();
        const result = (Math.round((today - dateDone) / (1000 * 3600 * 24)));
        // console.log('   xxxin isdaterecent: 1', dateDone);
        // console.log('   xxxin isdaterecent: 2', today);
        // console.log('   xxxin isdaterecent: 3=', result);
        return result < 8; // if age is less than 8 days
      }
      return false;
    },
    checkIfDeleteCommentAllowed(comment) {
      if (comment.profileId === this.profile[0].id) {
        return true;
      }
      return false;
    },
    sortEntries(arg) {
      // console.log('in sortEntries', arg);
      const arrayToReturn = arg.filter(() => true);
      arrayToReturn.sort((a, b) => a.dateDone - b.dateDone);
      return arrayToReturn;
    },
    entryRowClick(arg) { // cancel the delete
      const entry = this.entries.find(
        (element) => (element.id === arg.id),
      );
      entry.deleteButtonVisible = false;
      this.componentKeyEntries += 1;
    },
    onClickEntryDeleteConfirm(entry) {
      console.log('onClickEntryDeleteConfirm, ', entry);
      this.deleteEntry([entry.id, this.modalProps.id]);
    },
    onClickEntryDeleteShow(arg) {
      const entry = this.entries.find(
        (element) => (element.id === arg.id),
      );
      entry.deleteButtonVisible = !entry.deleteButtonVisible;
      this.componentKeyEntries += 1;
      // this.entries[arg.id].deleteButtonVisible = true;
    },
    commentRowClick(arg) { // cancel the delete
      const comment = this.comments.find(
        (element) => (element.id === arg.id),
      );
      comment.deleteButtonVisible = false;
      this.componentKeyComments += 1;
    },
    onClickCommentDeleteConfirm(comment) {
      console.log('onClickCommentDeleteConfirm, ', comment);
      this.deleteComment([comment.id, this.modalProps.routeId]);
    },
    onClickCommentDeleteShow(arg) {
      const comment = this.comments.find(
        (element) => (element.id === arg.id),
      );
      comment.deleteButtonVisible = !comment.deleteButtonVisible;
      this.componentKeyComments += 1;
      // this.entries[arg.id].deleteButtonVisible = true;
    },
    touchstart(arg1, arg2) {
      console.log('arg1, ', arg1);
      console.log('arg2, ', arg2);
      this.longtouch = false;

      this.timer = setTimeout(() => {
        this.longtouch = true;
        this.timer = null;
      }, this.touchduration);
    },
    touchend() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      if (this.longtouch) {
        console.log('in on LOOOOONG PRSSS.');
        // add logic here to happe after longpress
        this.longtouch = false;
      }
    },
    onShortPress() {
      console.log('in on shortpress.');
      // this.componentKey += 1;
      // this.modalEditVisible = false;
    },
    //
    // Function (a: Object, b: Object, isAsc: Boolean)
    customSortFuncRouteNum(firstObj, secondObj, isAsc) {
    // default behaviour for numbers:
      return (isAsc) ? (firstObj.routeNum - secondObj.routeNum)
        : (secondObj.routeNum - firstObj.routeNum);
    },
    // Function (a: Object, b: Object, isAsc: Boolean)
    customSortFuncRating(a, b, isAsc) {
      // convert the ratings using the array
      const newA = this.convertedRatings[a.rating];
      const newB = this.convertedRatings[b.rating];

      return (isAsc) ? (Number(newA) - Number(newB))
        : (Number(newB) - Number(newA));
    },
    // Function (a: Object, b: Object, isAsc: Boolean)
    customSortFuncCmp(a, b, isAsc) {
      // convert the ratings using the array
      const newA = this.convertCompletedFlagsForSorting(a);
      const newB = this.convertCompletedFlagsForSorting(b);

      return (isAsc) ? (Number(newA) - Number(newB))
        : (Number(newB) - Number(newA));
    },
    convertCompletedFlagsForSorting(arg) {
      if (arg.lead_cmp === 'Y') {
        return 6;
      } if (arg.lead_cmp === 'A') {
        return 5;
      } if (arg.toprope_cmp === 'Y') {
        return 4;
      } if (arg.toprope_cmp === 'A') {
        return 3;
      } if (arg.autob_cmp === 'Y') {
        return 2;
      } if (arg.autob_cmp === 'A') {
        return 1;
      }
      return 0;
    },
    filterRoutes(arg) {
      let profileRoutes = arg;
      // console.log('in filterRoutes (new table data), filters:', this.filters);
      // console.log('   in filterRoutes (new table data), proutes:', profileRoutes);
      // remove the autoBs
      if (this.filters.switchHideAutoB === 'Hide') {
        // return routes that have autoB=false
        profileRoutes = profileRoutes.filter((element) => !element.flag_autob);
      }
      if (this.filters.switchShowOnlyLead === 'Hide') {
        // return routes that are not lead only routes
        profileRoutes = profileRoutes.filter(
          (element) => !(element.flag_lead && !element.flag_topr),
        );
      }
      if (this.filters.switchShowOnlyToprope === 'Hide') {
        // return routes that are not Toprope only routes
        profileRoutes = profileRoutes.filter(
          (element) => !(element.flag_topr && !element.flag_lead),
        );
      }
      if (this.filters.switchShowOnlyOverhang === 'Hide') {
        // return routes that are not overhang routes
        profileRoutes = profileRoutes.filter((element) => !element.flag_overh);
      }
      return profileRoutes;
    },
    getShortDate(arg) {
      if (arg) {
        const toReturn = arg.toDate();
        return toReturn
          .getDate().toString().concat('/')
          .concat(toReturn.getMonth() + 1)
          .concat('/')
          .concat(toReturn.getFullYear());
        // .getFullYear().toString().concat('/')
        // .concat(toReturn.getMonth() + 1)
        // .concat('/')
        // .concat(toReturn.getDate());
      }
      return arg;
    },
    onModalCompleted() {
      console.log('onModalCMP', this.modalProps);
      this.modalProps.switchTopLeadAuto = this.switchTopLeadAuto;
      this.modalProps.switchStars = this.switchStars;
      this.modalProps.username = this.profile[0].username;
      this.modalProps.image = this.profile[0].image;
      this.modalProps.cmpOrAttempt = 'Y';
      this.modalSubmit(this.modalProps);
    },
    onModalAttempted() {
      console.log('onModalATT', this.modalProps);
      this.modalProps.switchTopLeadAuto = this.switchTopLeadAuto;
      this.modalProps.switchStars = this.switchStars;
      this.modalProps.username = this.profile[0].username;
      this.modalProps.image = this.profile[0].image;
      this.modalProps.cmpOrAttempt = 'A';
      this.modalSubmit(this.modalProps);
    },
    onViewRoute(row) {
      this.modalProps = row; // wherever the user clicked, set the modal to that data
      this.modalViewVisible = true;
      // this.modalMapExpanded = false;
      console.log(' onViewRoute: modalProps= ', this.modalProps);

      // entries are not showing up yet, using this function to load them.
      // (links to profileroutes table, key is id (profileroutesid))
      this.initEntries(row.id).then(() => {
        console.log('finished loading entries: ', this.entries);
      });

      this.initComments(row.routeId).then(() => {
        console.log('finished loading comments: ', this.comments);
      });
    },
    onEditRoute(row) {
      // event.stopPropagation();
      console.log('in edit row: ', row);
      this.modalProps = row;
      this.modalProps.notes = '';
      if (this.modalProps.flag_autob
        && !this.modalProps.flag_lead
        && !this.modalProps.flag_toprope) {
        this.switchTopLeadAuto = 'AutoB';
      } else {
        this.switchTopLeadAuto = this.profile[0].default;
      }
      this.modalProps.profileRoutesId = row.id;
      this.modalEditVisible = true;
      this.modalProps.date2 = this.getShortDate(firebase.firestore.Timestamp.now());
      console.log('new date(): ', new Date());
      this.modalProps.date = new Date();
    },
    onLegend() {
      this.modalLegendVisible = true;
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

<style lang="scss" >
.flexcenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.square {
  display: inline-block;
  height: 20px;
  width: 20px;
  position: relative;
  top: 10%;
  border-radius: 5px;
}
</style>

<style lang="scss" scoped>
.modalMapButton {
  background: none;
  height: 40px;
  position: fixed;
  top: 20px;
}
.entryStyle {
  border-style: solid;
  border-width: thin;
  border-color: gray;
}
.smallbutton {
  height: 1.6em !important;
  width: 4em !important;
  font-size: 0.60rem !important;
}
.mega-small {
  height: 1.8em;
  margin: auto;
  font-size: 0.55rem;
  font-weight: 400;
}
  /*
  * Rating styles
  */
.starsDisplay, .starsRating{
  margin: auto;
  margin-bottom: 5px;
  font-size: 1.5em;
  overflow:hidden;
}
.starsRating input {
  float: right;
  opacity: 0;
  position: absolute;
}
.starsRating a,
.starsRating label {
  float:right;
  color: #aaa;
  text-decoration: none;
  -webkit-transition: color .4s;
  -moz-transition: color .4s;
  -o-transition: color .4s;
  transition: color .4s;
}
.starsRating label:hover ~ label,
.starsRating input:checked ~ label,
.starsRating input:focus ~ label,
.starsRating label:hover,
.starsRating a:hover,
.starsRating a:hover ~ a,
.starsRating a:focus,
.starsRating a:focus ~ a {
  color: orange;
  cursor: pointer;
}
.starsDisplay .yellowStar {
  color: orange;
}
// :checked
// rating end
//
.flexendcontainer{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.media {
  align-items: center;
}
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
.square {
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
