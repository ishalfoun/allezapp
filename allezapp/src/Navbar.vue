<template>
  <div id="app">
    <div id="spacer">
      <nav id="navbar" class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <div class="navbar-item" @click="closeNav()">
            <router-link class="navbar-item logo" to="/#/" @click="closeNav()">
              AllezApp
            </router-link>
          </div>
          <div class="navbar-item profile if-mobile" aria-expanded="false">
            <template v-if="profile[0]">
              <img class="image is-24x24 mr-2"
                :src="profile[0].image">
                <span>{{profile[0].username}}</span>
            </template>
          </div>
          <a role="button" class="navbar-burger" aria-label="menu"
            aria-expanded="false" data-target="navbarBasicExample"
            @click="showNav = !showNav" :class="{ 'is-active': showNav }"
            style="margin-right:0;margin-left:0">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarBasicExample" class="navbar-menu"
         :class="{ 'is-active': showNav }"
         @click="closeNav()">
  <!-- nav bar end for mobile: -->
          <div class="navbar-end if-mobile">
            <div class="navbar-item flexcontainer">
              <a class="button is-success pl-4 pr-4" style="background:#2463b6">
                Profile
              </a>
              <router-link class="button pl-4 pr-4"
                v-if="profile[0] && profile[0].id === 'aGyG5o6IaDZtnyK7ouOKmNU1UYP2'"
                style="background:lightgrey" to="/input">
                Input
              </router-link>
              <!-- <a class="button is-danger is-small pl-2 pr-2"
                style="background:#e44035"
                v-if="isLoggedIn" @click="logout()">
                Log Out
              </a> -->
              <a class="button is-success pl-2 pr-2"
                v-if="!isLoggedIn" @click="login()">
                Log In
              </a>
            </div>
            <div v-if="isLoggedIn" class="navbar-item flexcontainer"
            v-on:click.stop="onSwitchDefault()">
              Default selection:
              <b-field >
                <span class='mr-3'>{{ switches.switchDefaultClimb }}</span>
                <b-switch v-model="switches.switchDefaultClimb"
                  type="is-danger"
                  true-value="Lead"
                  false-value="Toprope"
                  class="defaultClimb">
                </b-switch>
              </b-field>
            </div>
              <div v-if="isLoggedIn" class="navbar-item flexcontainer"
              v-on:click.stop="onSwitchHideAutoB()">
                Autobelays:
                <b-field >
                  <span class='mr-3'>{{ switches.switchHideAutoB }}</span>
                  <b-switch v-model="switches.switchHideAutoB"
                    type=""
                    true-value="Hide"
                    false-value="Show"
                    class="hideAutoB">
                  </b-switch>
                </b-field>
              </div>
              <div v-if="isLoggedIn" class="navbar-item flexcontainer"
              v-on:click.stop="onSwitchShowOnlyLead()">
                <div>
                  Lead-only routes:
                </div>
                <div>
                  <b-field >
                    <span class='mr-3'>{{ switches.switchShowOnlyLead }}</span>
                    <b-switch v-model="switches.switchShowOnlyLead"
                      type=""
                      true-value="Hide"
                      false-value="Show"
                      class="showOnlyLead">
                    </b-switch>
                  </b-field>
                </div>
              </div>
              <div v-if="isLoggedIn" class="navbar-item flexcontainer"
              v-on:click.stop="onSwitchShowOnlyToprope()">
                Toprope-only routes:
                <b-field>
                  <span class='mr-3'>{{ switches.switchShowOnlyToprope }}</span>
                  <b-switch v-model="switches.switchShowOnlyToprope"
                    type=""
                    true-value="Hide"
                    false-value="Show"
                    class="showOnlyToprope">
                  </b-switch>
                </b-field>
              </div>
              <div v-if="isLoggedIn" class="navbar-item flexcontainer"
              v-on:click.stop="onSwitchShowOnlyOverhang()">
                Overhang routes:
                <b-field>
                  <span class='mr-3'>{{ switches.switchShowOnlyOverhang }}</span>
                  <b-switch v-model="switches.switchShowOnlyOverhang"
                    type=""
                    true-value="Hide"
                    false-value="Show"
                    class="showOnlyOverhang">
                  </b-switch>
                </b-field>
              </div>
              <div v-if="isLoggedIn" class="navbar-item flexcontainer">
                <div></div>
                <a class="button is-success pl-4 pr-4"
                  @click="onApplyFilters()">
                  Apply
                </a>
              </div>
            </div>

<!-- nav bar end for desktop: -->
        <div class="navbar-end if-desktop">
          <div class="navbar-item has-dropdown is-hoverable" v-if="isLoggedIn">
            <!-- Account dropdown -->
            <div class="navbar-link">
              <!-- Accont drop down link -->
              <div class="flexcontainer" v-if='profile[0]'>
                <div class="centered imagecont mr-4">
                  <img class="centered image is-24x24"
                  :src="profile[0].image">
                </div>
                <span class="item">{{profile[0].username}}</span>
              </div>
            </div>
            <div class="navbar-dropdown" style="right: 0px;left:auto">
              <!-- Accont drop down menu -->
              <div class="navbar-item flexcontainer">
                <a class="button is-danger is-small pl-2 pr-2"
                  v-if="isLoggedIn" @click="logout()">
                  Log Out
                </a>
                <a class="button is-success is-small pl-2 pr-2"
                  v-if="!isLoggedIn" @click="login()">
                  Log In
                </a>
              </div>
              <div class="navbar-item" @click="closeNav()"
              v-if="profile[0] && profile[0].id === 'aGyG5o6IaDZtnyK7ouOKmNU1UYP2'">
                <router-link class="button" to="/input">
                  Input
                </router-link>
                <router-link class="button" to="/publish">
                  Publish
                </router-link>
              </div>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable" id="navbarLogin" v-if="!isLoggedIn">
          <!-- Login dropdown  -->
            <a class="navbar-link">
              <!-- Login dropdown link -->
              Login
            </a>
            <div class="navbar-dropdown" style="right: 0px;left:auto">
                <!-- Login dropdown menu -->
              <a href="/quiz" class="navbar-item" @click="login()">
                With Google
              </a>
              <a href="/quiz" class="navbar-item" @click="guestLogin()">
                Guest Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

      <section class="hero is-warning pt-4" v-if="!isLoggedIn">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Log In
            </h1>
            <h2 class="subtitle">
              Log in to use this app
            </h2>
            <a class="navbar-item button is-success mb-2" id="hoverpurp" @click="login()">
              Log in with Google
            </a>
          </div>
        </div>
      </section>

      <router-view id="content" class="ml-4 mr-4" v-if="isLoggedIn"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
// import store from '@/store';

export default {
  data: () => ({
    showNav: false,
    showApps: false,
    showDrop: false,
    showForm: false,
    showAcc: false,
    isLoading: true,
    switches: {
      switchDefaultClimb: 'Toprope',
      switchHideAutoB: 'Show',
      switchShowOnlyLead: 'Show',
      switchShowOnlyToprope: 'Show',
      switchShowOnlyOverhang: 'Show',
    },
  }),
  created() { // When this component is mounted, we want to call the init
    // console.log(this.$store);
    // this.init(this.$store.auth);
    // this.init(this.authUserId);
    // this.init();
    // this.initSubreddit(this.$route.params.name);
    this.isLoading = false;
  },
  mounted() {
    // console.log('in mounted:');
    this.showNav = false;
  },
  computed: { // makes it computed properties on this component, so we can use them.
    ...mapState('auth', ['user', 'isLoggedIn', 'sound']), // 'auth' is the module, the second is what you want
    ...mapState('profile', ['profile']),
    ...mapState('cjinput', ['verblistTransformed']),
  },
  methods: {
    ...mapActions('auth', ['login', 'logout', 'guestLogin', 'soundToggle']),
    ...mapActions('profile', ['init', 'updateProfileField']),
    ...mapActions('dataJS', ['applyFilters']),
    onApplyFilters() {
      this.applyFilters();
    },
    async onSwitchDefault() {
      console.log('in onSwitchDefault ');
      // this.updateProfileField((arg === 'Toprope' ? 'Lead' : 'Toprope'));
      await this.wait(500).then(() => {
        this.updateProfileField({ default: this.switchDefaultClimb });
      });
    },
    async onSwitchHideAutoB() {
      console.log('in onSwitchHideAutoB');
      await this.wait(500).then(() => {
        this.updateProfileField({ hideAutoB: this.switchHideAutoB });
      });
    },
    async onSwitchShowOnlyLead() {
      console.log('in onSwitchShowOnlyLead');
      await this.wait(500).then(() => {
        this.updateProfileField({ showOnlyLead: this.switchShowOnlyLead });
      });
    },
    async onSwitchShowOnlyToprope() {
      console.log('in onSwitchShowOnlyToprope');
      await this.wait(500).then(() => {
        this.updateProfileField({ showOnlyToprope: this.switchShowOnlyToprope });
      });
    },
    async onSwitchShowOnlyOverhang() {
      console.log('in onSwitchShowOnlyOverhang');
      await this.wait(500).then(() => {
        this.updateProfileField({ showOnlyOverhang: this.switchShowOnlyOverhang });
      });
    },
    async closeNav() {
      await this.wait(500).then(() => {
        this.showNav = false;
      });
    },
    async wait(timeout) { // await wait(500);
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    },
  },
  watch: {
    user() {
      if (this.user) {
        this.init(this.user.id);
      }
    },
    async profile() {
      // console.log('navbar. profileWatch happened', this.profile[0]);
      if (this.profile[0] && this.profile[0].default) {
        console.log('       default in db is: ', this.profile[0].default);
        this.switchDefaultClimb = this.profile[0].default;
      }
    },
  },
};
</script>

<style lang="scss">
.defaultClimb input[type=checkbox] + .check  {
  background: #ffdd57;
}
.defaultClimb:hover input[type=checkbox] + .check  {
  background: #ffdd57;
}
.showOnlyToprope input[type=checkbox]:checked + .check  {
  background: #ffdd57;
}

.showOnlyOverhang input[type=checkbox] + .check {
        background: black;
}
.showOnlyOverhang:hover input[type=checkbox] + .check {
        background: black;
}
.showOnlyOverhang input[type=checkbox]:checked + .check {
  background: #b5b5b5;
}
.showOnlyOverhang:hover input[type=checkbox]:checked + .check {
  background: #b5b5b5;
}

.showOnlyToprope input[type=checkbox] + .check {
        background: #ffdd57;
}
.showOnlyToprope:hover input[type=checkbox] + .check {
        background: #ffdd57;
}
.showOnlyToprope input[type=checkbox]:checked + .check {
  background: #b5b5b5;
}
.showOnlyToprope:hover input[type=checkbox]:checked + .check {
  background: #b5b5b5;
}

.showOnlyLead input[type=checkbox] + .check {
        background: #f14668;
}
.showOnlyLead:hover input[type=checkbox] + .check {
        background: #f14668;
}
.showOnlyLead input[type=checkbox]:checked + .check {
  background: #b5b5b5;
}
.showOnlyLead:hover input[type=checkbox]:checked + .check {
  background: #b5b5b5;
}

.hideAutoB input[type=checkbox] + .check {
  background: blue;
}
.hideAutoB:hover input[type=checkbox] + .check {
  background: rgb(37, 37, 247); // slightly lighter blue
}
.hideAutoB input[type=checkbox]:checked + .check {
  background: #b5b5b5;
}
.hideAutoB:hover input[type=checkbox]:checked + .check {
  background: #b5b5b5;
}
.logo {
  color: #fff !important;
}
#content {
  padding-top: 50px;
}
#navbar {
  width: 100%;
  position: fixed;
}
.navbar-link {
  padding-bottom: 5px;
}
.image {
  align-self: center;
}
.imagecont {
  display: flex;
  align-self: center;
  flex-direction: row;
  justify-content: space-between;
}
#soundcont{
  display: flex;
  flex-direction: column;
}
* {
  box-sizing: border-box;
}
#content {
  height: -webkit-calc(100% - 54px);
  height:    -moz-calc(100% - 54px);
  height:         calc(100% - 54px);
}
#navbarspace {
  margin-bottom: 56px;
}
#navbarDropdown {
  position: relative;
  left: auto !important;
  margin-right: 10px;
}
#navbarLogin {
  position: relative;
  left: auto !important;
  margin-right:0 ;
}
@media screen and (min-width: 1024px) { // =  on desktop
  .if-mobile { // on desktop, if mobile, dont show
    display: none !important;
  }
  .navbar-item {
    font-size: 1.5em;
  }
  .button {
    font-size: 1.5em;
  }
  #content {
    width:80%;
    margin-left: 10% !important;
    padding-top: 80px;
  }
}
@media screen and (max-width: 1024px) { // = on mobile
  .if-desktop { // on mobile, if desktop, dont show
    display: none;
  }
  .navbar-item {
    font-size: 0.9em;
  }
}
#hoverpurp:hover {
  background-color: rgb(49, 133, 49);
}
.navbar-item.profile{
  display: flex;
  justify-content: flex-end;
  margin-left:auto;
  margin-right:0;
  position:relative;
  padding: 0px 0px 0px 0px;
}
.progressbartext {
  position: absolute;
  top: 30%;
  left: 50%;
  font-size: 12px;
  color: black;
}
.progressbartext.big {
  top: 48%;
}
.flexcontainer {
  display: flex; /* or inline-flex */
  justify-content: space-between;
}
.debug {
  border-style: solid;
  border-color: red;
}
.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#app, #spacer, #content{
  height: 100%;
}
html, body {
  height: 100%;
}
</style>
