<template>
  <div class="main-content">
    <TopNavBar msg="首頁" />
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="title">最新 10 筆消費</div>
        <div class="left-container">
          <CreateConsume @after-create-new-consume="afterCreateNewConsume" />
          <div class="card-container">
            <ConsumeCard
              v-for="consume in consumes"
              :key="consume.id"
              :consume="consume"
              @after-click-button="afterClickButton"
            />
            <!-- <router-link to="/payment">
              <div class="more-consume">其他消費</div>
            </router-link> -->
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="title">我的群組</div>
        <div class="group-container">
          <GroupCard v-for="group in groups" :key="group.id" :group="group" />
        </div>
      </div>
    </div>
    <ConsumeModal
      :modal-content="modalContent"
      @after-save-change="afterSaveChange"
      @after-delete="afterDelete"
    />
  </div>
</template>

<script>
import TopNavBar from "./../components/TopNavBar.vue";
import CreateConsume from "./../components/CreateConsume.vue";
import ConsumeCard from "../components/ConsumeCard.vue";
import GroupCard from "./../components/GroupCard.vue";
import ConsumeModal from "./../components/ConsumeModal.vue";

const dummyConsumes = [
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
    date: new Date(2021, 7, 2),
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
    date: new Date(2021, 6, 28),
  },
  {
    id: 3,
    Category: {
      id: 4,
      code: "life",
      icon: "cafe-outline",
      name: "生活",
    },
    name: "洗髮水",
    amount: 120,
    date: new Date(2021, 6, 1),
  },
  {
    id: 4,
    Category: {
      id: 1,
      code: "food",
      icon: "fast-food-outline",
      name: "食物",
    },
    name: "午餐",
    amount: 261,
    date: new Date(2021, 6, 2),
  },
  {
    id: 5,
    Category: {
      id: 4,
      code: "life",
      icon: "cafe-outline",
      name: "生活",
    },
    name: "洗面乳",
    amount: 120,
    date: new Date(2021, 5, 28),
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
    amount: 200,
    date: new Date(2021, 6, 5),
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
    date: new Date(2021, 5, 4),
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
    amount: 200,
    date: new Date(2021, 5, 23),
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
    date: new Date(2021, 5, 1),
  },
  {
    id: 10,
    Category: {
      id: 2,
      code: "entertainment",
      icon: "game-controller-outline",
      name: "娛樂",
    },
    name: "線上抽盒機",
    amount: 1300,
    date: new Date(2021, 6, 13),
  },
];

const dummyGroups = [
  {
    id: 1,
    name: "地獄小組",
    image: "",
    memberCount: 5,
    consumeCount: 21,
    userOwed: "+ 3,667",
    // updatedDate: 作為排序依據
  },
  {
    id: 2,
    name: "智障小組",
    image: "",
    memberCount: 3,
    consumeCount: 11,
    userOwed: "+ 163",
  },
  {
    id: 3,
    name: "翻車小組",
    image: "",
    memberCount: 8,
    consumeCount: 44,
    userOwed: "- 2,597",
  },
  {
    id: 4,
    name: "後援會",
    image: "",
    memberCount: 11,
    consumeCount: 56,
    userOwed: "- 4,611",
  },
  {
    id: 5,
    name: "全民趴體",
    image: "",
    memberCount: 3,
    consumeCount: 9,
    userOwed: "+ 503",
  },
];

export default {
  name: "Home",
  components: {
    TopNavBar,
    CreateConsume,
    ConsumeCard,
    GroupCard,
    ConsumeModal,
  },

  created() {
    this.fetchConsume();
    this.fetchGroup();
  },
  data() {
    return {
      consumes: [],
      groups: [],
      modalContent: {},
    };
  },
  methods: {
    fetchConsume() {
      this.consumes = dummyConsumes;
      this.consumes.sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      });
    },
    fetchGroup() {
      this.groups = dummyGroups;
    },
    afterClickButton(data) {
      this.modalContent = {
        ...this.modalContent,
        ...data,
      };
    },
    afterSaveChange(data) {
      console.log("data", data);
      this.consumes = this.consumes.map((consume) => {
        if (consume.id === data.id) {
          console.log("consume", consume);
          return {
            ...consume,
            ...data,
          };
        } else {
          return consume;
        }
      });
    },
    afterCreateNewConsume(data) {
      this.consumes.unshift(data);
      this.consumes.pop();
    },
    afterDelete(data) {
      this.consumes = this.consumes.filter((consume) => consume.id !== data.id);
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
  overflow: scroll;
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

.add-consume,
.more-consume {
  height: 80px;
  width: 90%;
  max-width: 400px;

  margin: 20px auto 0;

  background-color: #a9b6cc;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 80px;
  border-radius: 15px;

  cursor: pointer;
}

.more-consume {
  margin-bottom: 20px;
}

.add-consume:hover,
.more-consume:hover {
  background: #6784b4;
}

.group {
  margin: 30px auto;
}

@media screen and (min-width: 768px) {
  .col-lg-6 {
    height: 100%;
  }
  .left-container {
    height: calc(100% - 54px - 110px);
  }

  .card-container {
    height: 100%;
    overflow: scroll;
  }

  .group-container {
    height: calc(100% - 54px);
    overflow: scroll;
  }
}
</style>