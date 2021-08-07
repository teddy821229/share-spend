<template>
  <div class="main-content">
    <TopNavBar msg="群組詳細資料" :show="true" />
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
            :initial-member="member"
          />
        </div>
      </div>
      <div class="col-6">
        <div class="title">
          群組消費列表 <span>{{ group.Consumes.length }} 筆</span>
        </div>
        <div class="consume-container">
          <GroupConsumeCard
            v-for="consume in group.Consumes"
            :key="consume.id"
            :consume="consume"
            @after-click-button="afterClickButton"
          />
        </div>
      </div>
    </div>
    <GroupConsumeModal
      :modal-content="modalContent"
      :member-list="group.Members"
      @after-save-change="afterSaveChange"
      @after-delete="afterDelete"
    />
  </div>
</template>

<script>
import TopNavBar from "./../components/TopNavBar.vue";
import GroupCardInDetail from "./../components/GroupCardInDetail.vue";
import GroupMemberCard from "./../components/GroupMemberCard.vue";
import GroupConsumeCard from "./../components/GroupConsumeCard.vue";
import GroupConsumeModal from "./../components/GroupConsumeModal.vue";

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
      debtInGroup: 0,
    },
    {
      id: 24,
      name: "抽不到六星",
      account: "poorgame",
      avatar: "",
      isFriend: true,
      debtInGroup: 0,
    },
    {
      id: 26,
      name: "找不到房間的蟑螂",
      account: "whereiscockroach",
      avatar: "",
      isFriend: false,
      debtInGroup: 0,
    },
    {
      id: 28,
      name: "好想換手機",
      account: "wantiphone13",
      avatar: "",
      isFriend: true,
      debtInGroup: 0,
    },
    {
      id: 1,
      name: "找不到工作又單身",
      account: "lohanka",
      avatar: "",
      isFriend: false,
      debtInGroup: 0,
    },
  ],
  Consumes: [
    {
      id: 1,
      Category: {
        id: 1,
        code: "food",
        icon: "fast-food-outline",
        name: "食物",
      },
      name: "午餐麥當勞歡樂送送送到你家哈哈哈哈",
      amount: 500,
      userOwed: -200,
      participates: [
        {
          id: 22,
          name: "買盲盒買到破產",
          account: "nomoney",
          avatar: "",
          share: 200,
          pay: 0,
          debt: -200,
        },
        {
          id: 24,
          name: "抽不到六星",
          account: "poorgame",
          avatar: "",
          share: 150,
          pay: 0,
          debt: -150,
        },
        {
          id: 26,
          name: "找不到房間的蟑螂",
          account: "whereiscockroach",
          avatar: "",
          share: 150,
          pay: 500,
          debt: 150,
        },
      ],
      date: "2021/07/07",
    },
    {
      id: 2,
      Category: {
        id: 2,
        code: "entertainment",
        icon: "game-controller-outline",
        name: "娛樂",
      },
      name: "盲盒",
      amount: 700,
      userOwed: 300,
      participates: [
        {
          id: 22,
          name: "買盲盒買到破產",
          account: "nomoney",
          avatar: "",
          share: 400,
          pay: 700,
          debt: 300,
        },
        {
          id: 24,
          name: "抽不到六星",
          account: "poorgame",
          avatar: "",
          share: 300,
          pay: 0,
          debt: -300,
        },
      ],
      date: "2021/07/03",
    },
    {
      id: 3,
      Category: {
        id: 1,
        code: "food",
        icon: "fast-food-outline",
        name: "食物",
      },
      name: "海底撈",
      amount: 1680,
      userOwed: 1344,
      participates: [
        {
          id: 26,
          name: "找不到房間的蟑螂",
          account: "whereiscockroach",
          avatar: "",
          share: 336,
          pay: 0,
          debt: -336,
        },
        {
          id: 28,
          name: "好想換手機",
          account: "wantiphone13",
          avatar: "",
          share: 336,
          pay: 0,
          debt: -336,
        },
        {
          id: 22,
          name: "買盲盒買到破產",
          account: "nomoney",
          avatar: "",
          share: 336,
          pay: 1680,
          debt: 1344,
        },
        {
          id: 24,
          name: "抽不到六星",
          account: "poorgame",
          avatar: "",
          share: 336,
          pay: 0,
          debt: -336,
        },
        {
          id: 1,
          name: "找不到工作又單身",
          account: "lohanka",
          avatar: "",
          share: 336,
          pay: 0,
          debt: -336,
        },
      ],
      date: "2021/07/01",
    },
    {
      id: 4,
      Category: {
        id: 1,
        code: "food",
        icon: "fast-food-outline",
        name: "食物",
      },
      name: "鹹酥雞",
      amount: 335,
      userOwed: -180,
      participates: [
        {
          id: 22,
          name: "買盲盒買到破產",
          account: "nomoney",
          avatar: "",
          share: 180,
          pay: 0,
          debt: -180,
        },
        {
          id: 24,
          name: "抽不到六星",
          account: "poorgame",
          avatar: "",
          share: 155,
          pay: 335,
          debt: 180,
        },
      ],
      date: "2021/07/02",
    },
    {
      id: 5,
      Category: {
        id: 4,
        code: "life",
        icon: "cafe-outline",
        name: "生活",
      },
      name: "門票",
      amount: 1000,
      userOwed: 800,
      participates: [
        {
          id: 26,
          name: "找不到房間的蟑螂",
          account: "whereiscockroach",
          avatar: "",
          share: 200,
          pay: 0,
          debt: -200,
        },
        {
          id: 28,
          name: "好想換手機",
          account: "wantiphone13",
          avatar: "",
          share: 200,
          pay: 0,
          debt: -200,
        },
        {
          id: 22,
          name: "買盲盒買到破產",
          account: "nomoney",
          avatar: "",
          share: 200,
          pay: 1000,
          debt: 800,
        },
        {
          id: 24,
          name: "抽不到六星",
          account: "poorgame",
          avatar: "",
          share: 200,
          pay: 0,
          debt: -200,
        },
        {
          id: 1,
          name: "找不到工作又單身",
          account: "lohanka",
          avatar: "",
          share: 200,
          pay: 0,
          debt: -200,
        },
      ],
      date: "2021/06/28",
    },
    {
      id: 6,
      Category: {
        id: 2,
        code: "entertainment",
        icon: "game-controller-outline",
        name: "娛樂",
      },
      name: "電影",
      amount: 440,
      userOwed: -220,
      participates: [
        {
          id: 22,
          name: "買盲盒買到破產",
          account: "nomoney",
          avatar: "",
          share: 220,
          pay: 0,
          debt: -220,
        },
        {
          id: 24,
          name: "抽不到六星",
          account: "poorgame",
          avatar: "",
          share: 220,
          pay: 440,
          debt: 220,
        },
      ],
      date: "2021/06/23",
    },
    {
      id: 7,
      Category: {
        id: 3,
        code: "transport",
        icon: "train-outline",
        name: "交通",
      },
      name: "高鐵",
      amount: 1300,
      userOwed: 1300,
      participates: [
        {
          id: 22,
          name: "買盲盒買到破產",
          account: "nomoney",
          avatar: "",
          share: 0,
          pay: 1300,
          debt: 1300,
        },
        {
          id: 24,
          name: "抽不到六星",
          account: "poorgame",
          avatar: "",
          share: 1300,
          pay: 0,
          debt: -1300,
        },
      ],
      date: "2021/06/01",
    },
    {
      id: 8,
      Category: {
        id: 5,
        code: "other",
        icon: "cash-outline",
        name: "其他",
      },
      name: "捐款",
      amount: 210,
      userOwed: 0,
      participates: [
        {
          id: 26,
          name: "找不到房間的蟑螂",
          account: "whereiscockroach",
          avatar: "",
          share: 70,
          pay: 0,
          debt: -70,
        },
        {
          id: 24,
          name: "抽不到六星",
          account: "poorgame",
          avatar: "",
          share: 70,
          pay: 100,
          debt: 30,
        },
        {
          id: 1,
          name: "找不到工作又單身",
          account: "lohanka",
          avatar: "",
          share: 70,
          pay: 110,
          debt: 40,
        },
      ],
      date: "2021/06/23",
    },
    {
      id: 9,
      Category: {
        id: 3,
        code: "transport",
        icon: "train-outline",
        name: "交通",
      },
      name: "高鐵",
      amount: 1300,
      userOwed: -675,
      participates: [
        {
          id: 22,
          name: "買盲盒買到破產",
          account: "nomoney",
          avatar: "",
          share: 675,
          pay: 0,
          debt: -675,
        },
        {
          id: 24,
          name: "抽不到六星",
          account: "poorgame",
          avatar: "",
          share: 0,
          pay: 675,
          debt: 675,
        },
      ],
      date: "2021/06/01",
    },
  ],
  // userOwed: 2469,
  updatedDate: "2021/07/02",
};

export default {
  name: "GroupDetail",
  components: {
    TopNavBar,
    GroupCardInDetail,
    GroupMemberCard,
    GroupConsumeCard,
    GroupConsumeModal,
  },
  data() {
    return {
      group: {
        id: -1,
        name: "",
        image: "",
        Members: [],
        Consumes: [],
        userOwed: 0,
      },
      modalContent: {},
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
      this.getGroupDebt();
    },
    afterClickButton(data) {
      this.modalContent = {
        ...this.modalContent,
        ...data,
      };
    },
    afterSaveChange(data) {
      this.group.Consumes = this.group.Consumes.map((consume) => {
        if (consume.id === data.id) {
          return {
            ...consume,
            ...data,
          };
        } else {
          return consume;
        }
      });
      this.getGroupDebt();
    },
    afterDelete(data) {
      this.group.Consumes = this.group.Consumes.filter(
        (consume) => consume.id !== data.id
      );
      this.getGroupDebt();
    },
    getGroupDebt() {
      // reset
      this.group.Members.forEach((member) => (member.debtInGroup = 0));
      //  count
      this.group.Consumes.forEach((consume) => {
        consume.participates.forEach((participate) => {
          this.group.Members.map((member) => {
            if (participate.id === member.id) {
              member.debtInGroup += participate.debt;
            }
          });
        });
      });
      this.getUserDebt();
    },
    getUserDebt() {
      this.group.Members.map((member) => {
        if (
          member.id === 22 // currentUser.id//
        ) {
          this.group.userOwed = member.debtInGroup;
        }
      });
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

.consume-container {
  height: calc(100% - 54px);
  overflow: scroll;
}
</style>