<template>
  <div id="app">
    <div class="content">
      <div class="row">
        <div class="col-3 nav-container">
          <SideNavBar />
        </div>
        <div class="col-9 container content-container">
          <router-view />
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

.nav-container {
  max-width: 300px;
  min-height: 100%  ;
}

.content {
  padding: 0;
  margin: 0 20px;
}
</style>


