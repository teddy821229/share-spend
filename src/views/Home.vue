<template>
  <div class="main-content">
    <TopNavBar msg="首頁" />
    <div class="row">
      <div class="col-5">
        <div class="title">最新消費</div>
        <CreateConsume />
        <div class="card-container">
          <ConsumeCard
            v-for="consume in consumes"
            :key="consume.id"
            :consume="consume"
          />
          <router-link
            to="/payment"
          >
            <div class="more-consume">
              其他消費
            </div>
          </router-link>
        </div>
      </div>
      <div class="col-7">
        <div class="title">我的群組</div>
        <div class="group-container">
          <GroupCard 
            v-for="group in groups"
            :key="group.id"
            :group="group"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNavBar from "./../components/TopNavBar.vue";
import CreateConsume from './../components/CreateConsume.vue'
import ConsumeCard from "../components/ConsumeCard.vue";
import GroupCard from './../components/GroupCard.vue'

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

const dummyGroup = [
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
]

export default {
  name: "Home",
  components: {
    TopNavBar,
    CreateConsume,
    ConsumeCard,
    GroupCard,
  },
  created() {
    this.fetchConsume();
    this.fetchGroup()
  },
  data() {
    return {
      consumes: [],
      groups: []
    };
  },
  methods: {
    fetchConsume() {
      this.consumes = dummyConsumes;
    },
    fetchGroup() {
      this.groups = dummyGroup
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
.col-5{
  height: calc(100% - 54px - 100px);
}

.col-7  {
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

.add-consume, .more-consume {
  height: 80px;
  width: 90%;
  max-width: 400px;

  margin: 20px auto 0 ;

  background-color: #a9b6cc;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 80px;
  border-radius: 15px;

  cursor: pointer;
}

.more-consume  {
  margin-bottom: 20px;
}

.add-consume:hover, .more-consume:hover {
  background: #6784b4;
}

.card-container, .group-container {
  height: 100%;
  overflow: scroll;
}
</style>