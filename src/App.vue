<template>
  <div id="app">
    <div class="content">
      <div class="row">
        <div class="col-3 nav-container" :class="{showNav: showNav}">
          <SideNavBar />
        </div>
        <div class="col-12 col-md-9 container content-container">
          <router-view />
        </div>
        <div class="button-container">
          <button 
            class="toggle-button"
            @click.prevent.stop="toggleShow"
          >
            <ion-icon name="menu-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import SideNavBar from "./components/SideNavBar.vue";

export default {
  components: {
    SideNavBar,
  },
  data() {
    return {
      showNav: false
    }
  },
  methods: {
    toggleShow() {
      this.showNav = !this.showNav
    }
  }
};
</script>

<style>
#app,
.content,
.nav-container,
.row,
.content-container {
  height: 100%;
  background: #fff;
}

.content {
  position: relative;
}

.nav-container {
  position: absolute;

  min-width: 300px;
  opacity: 0;
  z-index: -1;
  transition: opacity .2s ease-in-out ;
}

.showNav {
  display: block;
  opacity: 1;
  z-index: 1;
}

.content {
  padding: 0;
  margin: 0 20px;
}

.toggle-button {
  position: absolute;
  top: 20px;
  right: 0px;
  display: block;

  padding: 5px 10px;
  border-radius: 10px;

  border: 1px solid transparent;

  background: #a9b6cc;
}

.toggle-button ion-icon {
  transform: translateY(2px);
}

.toggle-button:hover {
  background: #fff;
  border-color: #a9b6cc;
}

.toggle-button:hover ion-icon {
  color: #a9b6cc;
}

@media screen and (min-width: 768px) {
  .nav-container {
    position: relative;
    display: block;
    min-width: 100px;
    max-width: 300px;
    min-height: 100%;

    opacity: 1;
    z-index: 1;
  }

  .toggle-button {
    display: none;
  }
}
</style>


