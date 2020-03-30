<template>
  <div class="ch-header-wrapper">
    <div class="usa-overlay"></div>
    <header class="usa-header usa-header--extended" role="banner">
      <div class="ch-header-nav-wrapper">
        <div class="ch-header-nav">
          <div class="ch-header-nav_text">
            <div class="ch-header-nav_text-title">CodeHub Admin UI</div>
            <div class="ch-header-nav_text-version">Version: {{version}}</div>
          </div>
          <div class="ch-header-nav_links">
            <nav role="navigation" class="usa-nav">
              <div class="usa-nav__inner">
                <button class="usa-nav__close">
                  <img src="/img/close.svg" alt="close">
                </button>
                <ul class="usa-nav__primary usa-accordion">
                  <li class="usa-nav__primary-item">
                    <router-link aria-controls="dh-nav1" to="/" exact-active-class="router-link-exact-active" exact>Home</router-link>
                  </li>
                  <li class="usa-nav__primary-item">
                    <router-link aria-controls="dh-nav1" to="/categories" exact-active-class="router-link-exact-active" exact>Categories</router-link>
                  </li>
                  <li class="usa-nav__primary-item">
                    <router-link aria-controls="dh-nav1" to="/engagementpopup" exact-active-class="router-link-exact-active" exact>Engagement_Popup</router-link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div class="ch-header-nav_token">
            <input type="password" v-model="authToken" @keyup.enter="reloadData" name="authorization-token" id="id-authorization-token" placeholder="Authorization token...">
          </div>
          
        </div>
        <button class="usa-menu-btn" aria-controls="dh-nav">Menu</button>
      </div>
      
    </header>
    <div v-if="showControls">
      <CHControls/>
      <CHSearchBar filterCb="applyFilter"/>
    </div>
  </div>
</template>

<script>
import CHControls from '@/components/ch-controls.vue';
import CHSearchBar from '@/components/ch-search-bar.vue';
export default {
  name: 'CHHeader',
  data: function() {
    return {
      showControls: true
    }
  },
  components: {
    CHControls,
    CHSearchBar
  },
  watch: {
    $route: function(to) {
      this.showControls = to.name === 'home';
    }
  },
  computed: {
    authToken: {
      get: function() {return this.$store.state.auth_token;},
      set: function(val) { this.$store.commit('setAuthToken', val); }
    },
    version: {
      get: function() {return this.$store.state.version;}
    }
  },
  methods: {
    reloadData: function() {
      this.$store.dispatch('getAll');
    }
  }
}
</script>