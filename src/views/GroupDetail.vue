<template>
  <div class="main-content">
    <TopNavBar :msg="group.name" :show="true" />
    <div class="row">
      <div class="col-6">
        <GroupCardInDetail :group="group" />
        <div class="title">
          群組成員 <span>{{ group.Members.length }} 人</span>
        </div>
        <div class="member-container">
          <GroupMemberCard
            v-for="member in group.Members"
            :key="member.id"
            :member="member"
          />
        </div>
      </div>
      <div class="col-6">
        <div class="title">
          群組消費列表 <span>{{ group.Consumes.length }} 筆</span>
        </div>
        <!-- TODO: Group Conusumes -->
      </div>
    </div>
  </div>
</template>

<script>
import TopNavBar from "./../components/TopNavBar.vue";
import GroupCardInDetail from "./../components/GroupCardInDetail.vue";
import GroupMemberCard from "./../components/GroupMemberCard.vue";

const dummyGroup = {
  id: 1,
  name: "地獄小組",
  image: "",
  Members: [
    {
      id: 22,
      name: "買盲盒買到破產",
      account: "nomoney",
      avatar: "",
      isFriend: false,
      debtInGroup: -4457,
    },
    {
      id: 24,
      name: "抽不到六星",
      account: "poorgame",
      avatar: "",
      isFriend: true,
      debtInGroup: 3301,
    },
    {
      id: 26,
      name: "找不到工作又單身",
      account: "lohanka",
      avatar: "",
      isFriend: false,
      debtInGroup: 2230,
    },
    {
      id: 28,
      name: "好想換手機",
      account: "wantiphone13",
      avatar: "",
      isFriend: true,
      debtInGroup: 1010,
    },
    {
      id: 1,
      name: "Teddy",
      account: "teddy1993",
      avatar: "",
      isFriend: false,
      debtInGroup: -4005,
    },
  ],
  Consumes: [],
  userOwed: "+ 3,667",
  updatedDate: "2021/07/02",
};

export default {
  name: "GroupDetail",
  components: {
    TopNavBar,
    GroupCardInDetail,
    GroupMemberCard,
  },
  data() {
    return {
      group: {
        id: -1,
        name: "",
        image: "",
        Members: [],
        Consumes: [],
        userOwed: "",
      },
    };
  },
  created() {
    this.fetchGroup();
  },
  methods: {
    fetchGroup() {
      this.group = {
        ...this.group,
        ...dummyGroup,
      };
    },
  },
};
</script>

<style scoped>
.main-content {
  height: 100%;
  width: 100%;
}

.row {
  height: calc(100% - 100px);
}

.col-6 {
  height: 100%;
}

.title {
  position: relative;

  padding: 10px 0 20px 0;
  font-size: 16px;
  color: #6784b4;
  font-weight: 700;

  text-align: center;
}

.title::after {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);

  content: "";
  width: 85%;
  height: 2px;

  background: #a9b6cc;
}

.title span {
  color: #093279;
  font-weight: bolder;
}

.member-container {
  height: calc(100% - 232px - 54px);
  overflow: scroll;
}
</style>