<template>
  <div class="main-content">
    <TopNavBar msg="設定" />
    <div class="content-container">
      <SettingForm 
        :initial-user="user"
      />
    </div>
  </div>
</template>

<script>
import TopNavBar from "./../components/TopNavBar.vue";
import SettingForm from './../components/SettingForm.vue'
import { mapState } from 'vuex'

export default {
  name: "Setting",
  components: {
    TopNavBar,
    SettingForm
  },
  methods: {},
  computed: {
    ...mapState(['user'])
  }
};
</script>

<style scoped>
.main-content {
  position: relative;

  padding-bottom: 20px;

  height: 100%;
  width: 100%;
}
.content-container {
  height: calc(100% - 100px);
}
</style>
