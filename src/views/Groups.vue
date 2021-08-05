<template>
  <div class="main-content">
    <TopNavBar msg="分帳群組" />
    <div class="groups-title">我的群組 (14)</div>
    <div class="groups-container">
      <CreateGroupCard />
      <GroupCard 
        v-for="group in groups"
        :key="group.id"
        :group="group"
      />
    </div>
  </div>
</template>

<script>
import TopNavBar from "./../components/TopNavBar.vue";
import GroupCard from "./../components/GroupCard.vue";
import CreateGroupCard from '../components/CreateGroupCard.vue'

const dummyGroups = [
  {
    id: 1,
    name: '地獄小組',
    image: '',
    memberCount: 5,
    consumeCount: 21,
    userOwed: "+ 3,667"
    // updatedDate: 作為排序依據
  },
  {
    id: 2,
    name: '智障小組',
    image: '',
    memberCount: 3,
    consumeCount: 11,
    userOwed: "+ 163"
  },
  {
    id: 3,
    name: '翻車小組',
    image: '',
    memberCount: 8,
    consumeCount: 44,
    userOwed: "- 2,597"
  },
  {
    id: 4,
    name: '後援會',
    image: '',
    memberCount: 11,
    consumeCount: 56,
    userOwed: "- 4,611"
  },
  {
    id: 5,
    name: '全民趴體',
    image: '',
    memberCount: 3,
    consumeCount: 9,
    userOwed: "+ 503"
  },
  {
    id: 6,
    name: '翻車小組',
    image: '',
    memberCount: 8,
    consumeCount: 44,
    userOwed: "- 2,597"
  },
  {
    id: 7,
    name: '後援會',
    image: '',
    memberCount: 11,
    consumeCount: 56,
    userOwed: "- 4,611"
  },
  {
    id: 8,
    name: '全民趴體',
    image: '',
    memberCount: 3,
    consumeCount: 9,
    userOwed: "+ 503"
  },
]

export default {
  name: "Groups",
  components: {
    TopNavBar,
    GroupCard,
    CreateGroupCard
  },
  created() {
    this.fetchGroups()
  },
  data() {
    return {
      groups: []
    }
  },
  methods: {
    fetchGroups() {
      this.groups = dummyGroups
    }
  }
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
  overflow-x: scroll;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  grid-auto-flow: row;

  padding: 20px 0 40px;
}

.group {
  width: 400px;
}
</style>