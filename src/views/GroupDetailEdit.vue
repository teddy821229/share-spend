<template>
  <div class="main-content">
    <TopNavBar msg="編輯群組" :show="true" />
    <div class="content-container">
      <EditGroupFrom />
    </div>
  </div>
</template>

<script>
import TopNavBar from "./../components/TopNavBar.vue";
import EditGroupFrom from "./../components/EditGroupForm.vue";

export default {
  name: "GroupDetailEdit",
  components: {
    TopNavBar,
    EditGroupFrom,
  },
};
</script>

<style scoped>

.main-content {
  position: relative;

  height: 100%;
  width: 100%;
}
.content-container {
  height: calc(100% - 100px);
}
</style>