<template>
  <div id="app">
    <nav id="navbar" class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/#/">
          AllezApp
        </router-link>
        <div class="navbar-item profile if-mobile" aria-expanded="false">
          <template v-if="profile[0]">
            <img class="image is-24x24 mr-2"
              :src="user.image">
              <span>{{user.name}}</span>
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
      <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showNav }">
<!-- nav bar end for mobile: -->
        <div class="navbar-end if-mobile">
          <div class="navbar-item flexcontainer">
            <a class="button is-primary" style="width:30%;">
              nothing yet
            </a>
          </div>
          <div class="navbar-item flexcontainer">
            <a class="button is-danger is-small pl-2 pr-2"
              v-if="isLoggedIn" @click="logout()">
              Log Out
            </a>
          </div>
          <router-link class="navbar-item" to="/input">
            Input
          </router-link>
        </div>

<!-- nav bar end for desktop: -->
        <div class="navbar-end if-desktop">
          <div class="navbar-item has-dropdown is-hoverable" id="navbarApps">
          <!-- Menu dropdown  -->
            <a class="navbar-link">
              <!-- Menu dropdown link -->
              Menu
            </a>
            <div class="navbar-dropdown" style="right: 0px;">
              <router-link class="navbar-item" to="/input">
                Input
              </router-link>
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
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="hero is-warning" v-if="!isLoggedIn">
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
  }),
  created() { // When this component is mounted, we want to call the init
    // console.log(this.$store);
    // this.init(this.$store.auth);
    // this.init(this.authUserId);
    // this.init();
    // this.initSubreddit(this.$route.params.name);
    this.isLoading = false;
  },
  computed: { // makes it computed properties on this component, so we can use them.
    ...mapState('auth', ['user', 'isLoggedIn', 'sound']), // 'auth' is the module, the second is what you want
    ...mapState('profile', ['profile']),
    ...mapState('cjinput', ['verblistTransformed']),
  },
  methods: {
    ...mapActions('auth', ['login', 'logout', 'guestLogin', 'soundToggle']),
    ...mapActions('profile', ['init']),
  },
  watch: {
    user() {
      if (this.user) {
        this.init(this.user.id);
      }
    },
  },
};
</script>

<style lang="scss">
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
#navbar {
  width: 100%;
}
#navbarspace {
  margin-bottom: 56px;
}
#navbarApps {
  position: relative;
  left: auto !important;
  margin-right:0;
}
#navbarLogin {
  position: relative;
  left: auto !important;
  margin-right:0 ;
}
@media screen and (min-width: 1024px) { // =  on desktop
  .if-mobile { // on desktop, if mobile, dont show
    display: none;
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
  }
}
@media screen and (max-width: 1024px) { // = on mobile
  .if-desktop { // on mobile, if desktop, dont show
    display: none;
  }
}
#hoverpurp:hover {
  background-color: rgb(49, 133, 49);
}
.navbar-item.profile{
  width: 15%;
  margin-left:auto;
  margin-right:0;
  position:relative;
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
#app {
  height: 100%;
}
html, body {
  height: 100%;
}
</style>
