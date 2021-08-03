<template>
  <div class="main-content">
    <TopNavBar msg="記帳本" />
    <div class="row">
      <div class="col-7">
        <div class="title">消費總額</div>
        <ConsumeTimeNavPills @change-time="changeTime" />
        <div class="left-content-container">
          <TotalConsumeCard :consumes="filteredConsume" />
          <CreateConsume />
        </div>
      </div>
      <div class="col-5">
        <div class="title">消費列表</div>
        <ConsumeCategoryNavPills @change-category="changeCategory" />
        <div class="card-container">
          <ConsumeCard
            v-for="consume in filteredConsume"
            :key="consume.id"
            :consume="consume"
            @after-click-button="afterClickButton"
          />
        </div>
      </div>
    </div>
    <ConsumeModal 
      :modal-content="modalContent" 
      @after-save-change="afterSaveChange"
    />
  </div>
</template>

<script>
import TopNavBar from "./../components/TopNavBar.vue";
import ConsumeCard from "../components/ConsumeCard.vue";
import ConsumeCategoryNavPills from "../components/ConsumeCategoryNavPills.vue";
import ConsumeTimeNavPills from "./../components/ConsumeTimeNavPills.vue";
import TotalConsumeCard from "./../components/TotalConsumeCard.vue";
import CreateConsume from "./../components/CreateConsume.vue";
import ConsumeModal from "./../components/ConsumeModal.vue";

const dummyConsumes = [
  {
    id: 1,
    Category: {
      id: 1,
      code: "food",
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
      name: "交通",
    },
    name: "高鐵",
    amount: 1300,
    date: new Date(2021, 5, 1),
  },
];

export default {
  name: "Payment",
  components: {
    TopNavBar,
    ConsumeCard,
    ConsumeCategoryNavPills,
    ConsumeTimeNavPills,
    TotalConsumeCard,
    CreateConsume,
    ConsumeModal,
  },
  created() {
    this.fetchConsume();
  },
  data() {
    return {
      consumes: [],
      modalContent: {},
      categoryFilter: 0,
      timeFilter: 1,
    };
  },
  methods: {
    fetchConsume() {
      this.consumes = dummyConsumes;
      this.consumes.sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      });
    },
    afterClickButton(data) {
      this.modalContent = {
        ...this.modalContent,
        ...data,
      };
    },
    changeCategory(categoryId) {
      this.categoryFilter = categoryId;
    },
    changeTime(timeId) {
      this.timeFilter = timeId;
    },
    afterSaveChange(data) {
      console.log('data',data);
      this.consumes = this.consumes.map(consume => {
        if(consume.id === data.id) {
          console.log('consume',consume);
          return {
            ...consume,
            ...data
          }
        } else {
          return consume
        }

      })
    }
  },
  computed: {
    filteredConsume() {
      if (this.categoryFilter === 0) {
        return this.filteredTime;
      }
      return this.filteredTime.filter(
        (consume) => consume.Category.id === this.categoryFilter
      );
    },
    filteredTime() {
      const now = new Date();
      const day = 86400000;
      const week = day * 7;
      const twoWeek = day * 14
      const month = day * 30
      const season = month * 3

      const list = {
        1: day,
        2: week,
        3: twoWeek,
        4: month,
        5: season

      }

      // Today filter
      
        return this.consumes.filter((consume) => {
          return now.getTime() - consume.date.getTime() <= list[this.timeFilter];
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
.col-5 {
  height: calc(100% - 54px - 50px);
}

.col-7 {
  height: calc(100% - 54px - 50px);
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

.card-container,
.left-content-container {
  height: 100%;
  overflow: scroll;
}
</style>