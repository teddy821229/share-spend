<template>
  <div class="main-content">
    <TopNavBar msg="記帳本" />
    <div class="row">
      <div class="col-7">
        <div class="title">消費總額</div>
        <ConsumeTimeNavPills />
        <TotalConsumeCard 
          :consumes="consumes"
        />
        <CreateConsume />
      </div>
      <div class="col-5">
        <div class="title">消費列表</div>
        <ConsumeCategoryNavPills />
        <div class="card-container">
          <ConsumeCard
            v-for="consume in consumes"
            :key="consume.id"
            :consume="consume"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNavBar from "./../components/TopNavBar.vue";
import ConsumeCard from "../components/ConsumeCard.vue";
import ConsumeCategoryNavPills from '../components/ConsumeCategoryNavPills.vue'
import ConsumeTimeNavPills from './../components/ConsumeTimeNavPills.vue'
import TotalConsumeCard from './../components/TotalConsumeCard.vue'
import CreateConsume from './../components/CreateConsume.vue'

const dummyConsumes = [
  {
    id: 1,
    category: "food",
    name: "午餐麥當勞歡樂送送送到你家哈哈哈哈",
    amount: 500,
    date: "2021/07/07",
  },
  {
    id: 2,
    category: "entertainment",
    name: "盲盒",
    amount: 700,
    date: "2021/07/03",
  },
  {
    id: 3,
    category: "life",
    name: "洗髮水",
    amount: 120,
    date: "2021/07/01",
  },
  {
    id: 4,
    category: "food",
    name: "午餐",
    amount: 261,
    date: "2021/07/02",
  },
  {
    id: 5,
    category: "life",
    name: "洗面乳",
    amount: 120,
    date: "2021/06/28",
  },
  {
    id: 6,
    category: "entertainment",
    name: "電影",
    amount: 200,
    date: "2021/06/23",
  },
  {
    id: 7,
    category: "transport",
    name: "高鐵",
    amount: 1300,
    date: "2021/06/01",
  },
  {
    id: 8,
    category: "other",
    name: "捐款",
    amount: 200,
    date: "2021/06/23",
  },
  {
    id: 9,
    category: "transport",
    name: "高鐵",
    amount: 1300,
    date: "2021/06/01",
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
    CreateConsume
  },
  created() {
    this.fetchConsume();
  },
  data() {
    return {
      consumes: [],
    };
  },
  methods: {
    fetchConsume() {
      this.consumes = dummyConsumes;
    }
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
  height: calc(100% - 54px);
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

.card-container {
  height: 100%;
  overflow: scroll;
}
</style>