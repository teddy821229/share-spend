<template>
  <div class="main-content">
    <TopNavBar msg="分帳群組" />
    <div class="groups-title">我的群組 (14)</div>
    <div class="groups-container">
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
    </div>
  </div>
</template>

<script>
import TopNavBar from "./../components/TopNavBar.vue";
import GroupCard from "./../components/GroupCard.vue";

export default {
  name: "Groups",
  components: {
    TopNavBar,
    GroupCard,
  },
};
</script>

<style scoped>
.main-content {
  position: relative;

  height: 100%;
  width: 100%;
}

.groups-title {
  text-align: center;
  height: 30px;

  line-height: 30px;
  font-size: 18px;
  color: #6784b4;
}

/* .main-content::before {
  content: "";

  height: calc(100% - 80px);
  width: 80px;

  position: absolute;
  right: 0;
  top: 80px;

  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgb(240, 238, 238) 100%);
} */

.groups-container {
  position: relative;

  height: calc(100% - 100px - 30px);
  overflow-y: scroll;

  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 20px;
  grid-auto-flow: column;

  padding: 20px 0 40px;
}

.group {
  width: 400px;
}
</style>