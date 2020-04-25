<template>
  <div class="" >
    <!-- header -->
    <nav class="navbar " :class="$route.name === 'Home' ? 'is-transparent transparent is-fixed-top' : 'is-primary'" >
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item is-size-4">
            BeautySalon
          </router-link>
          <span class="navbar-burger burger" data-target="navbarMenuHeroA">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroA" class="navbar-menu">
          <div class="navbar-end">
            <!-- if authenticated -->
            <template v-if="$store.state.me">
              <!-- logged user menu -->

              <!-- add salon -->
              <router-link to="/add-salon" class="navbar-item" title="add salon address">
                <span class="icon"><i class="fas fa-map-marked-alt"></i></span>
                <span>Add salon</span>
              </router-link>
              <!-- account edit -->
              <router-link to="/me" class="navbar-item" title="edit account">
                <span class="icon"><i class="fas fa-user"></i></span>
                <span>Hi, {{$store.state.me}}</span>
              </router-link>
              <a to="#" class="navbar-item" @click.prevent="logout">
                <span class="icon"><i class="fas fa-sign-out-alt"></i></span>
                <span>Logout</span>
              </a>
            </template>
            <!-- if unauthenticated -->
            <template v-else>
              <router-link to="/login" class="navbar-item">
                Login
              </router-link>
              <span class="navbar-item">
                <router-link to="/signin" class="button is-primary is-inverted">
                  <span class="icon">
                    <i class="fas fa-user-plus"></i>
                  </span>
                  <span>Sign In</span>
                </router-link>
              </span>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- content -->
    <section class="hero is-fullheight" :class="$route.name === 'Home' ? 'is-primary is-bold' : 'is-light'">
      <div class="hero-body">
        <!-- <div class="container has-text-centered"> -->
        <router-view/>
        <!-- </div> -->
      </div>
    </section>
  </div>
</template>

<script>
const Cookie = require('js-cookie')
export default {
  name: 'layout-default',
  beforeCreate () {
    // get cookies
    const me = Cookie.get('me')
    if (typeof me === 'string') this.$store.commit('SET_ME', me)
  },
  methods: {
    logout () {
      // logout user
      this.$store.state.me = null
      Cookie.remove('me')
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
  .transparent {
    background-color: transparent;
    box-shadow: 0 0 15px rgba(0,0,0,.1);
  }
  .transparent .navbar-item {
    color: white!important;
  }
</style>
