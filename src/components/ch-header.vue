<template>
  <div class="ch-header-wrapper">
    <!-- <a class="usa-skipnav" href="#main-content">Skip to main content</a>
    <div class="usa-banner site-banner">
      <div class="usa-accordion">
        <header class="usa-banner__header">
          <div class="usa-banner__inner">
            <div class="grid-col-auto">
              <img class="usa-banner__header-flag" src="/img/us_flag_small.png" alt="U.S. flag">
            </div>
            <div class="grid-col-fill tablet:grid-col-auto">
              <p class="usa-banner__header-text">An official website of the United States government</p>
              <p class="usa-banner__header-action" aria-hidden="true">Here’s how you know</p>
            </div>
            <button
              class="usa-accordion__button usa-banner__button"
              aria-expanded="false"
              aria-controls="gov-banner">
              <span class="usa-banner__button-text">Here’s how you know</span>
            </button>
          </div>
        </header>
        <div class="usa-banner__content usa-accordion__content" id="gov-banner">
          <div class="grid-row grid-gap-lg">
            <div class="usa-banner__guidance tablet:grid-col-6">
              <img
                class="usa-banner__icon usa-media-block__img"
                src="/img/icon-dot-gov.svg"
                alt="Dot gov">
              <div class="usa-media-block__body">
                <p>
                  <strong>The .gov means it’s official.</strong>
                  <br>Federal government websites often end in .gov or .mil. Before sharing sensitive information,
                  make sure you’re on a federal government site.
                </p>
              </div>
            </div>
            <div class="usa-banner__guidance tablet:grid-col-6">
              <img
                class="usa-banner__icon usa-media-block__img"
                src="/img/icon-https.svg"
                alt="Https">
              <div class="usa-media-block__body">
                <p>
                  <strong>The site is secure.</strong>
                  <br>The
                  <strong>https://</strong> ensures that you are connecting to the official website and
                  that any information you provide is encrypted and transmitted securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="usa-overlay"></div>
    <header class="usa-header usa-header--extended" role="banner">
      <div class="ch-header-nav-wrapper">
        <div class="ch-header-nav">
          <!-- <div class="ch-header-nav_logo">
              <img id="dot_logo" src="/img/dot_logo.png" style="" alt="Department of Transportation logo">
          </div> -->
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
                </ul>
              </div>
            </nav>
          </div>
          <div class="ch-header-nav_token">
            <input type="password" v-model="authToken" name="authorization-token" id="id-authorization-token" placeholder="Authorization token...">
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
  }
}
</script>