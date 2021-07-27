<template>
  <div class="main-content">
    <TopNavBar 
      msg="首頁"
    />
    <div class="row">
      <div class="col-5">
        <div class="title">
          最新消費
        </div>
        <ConsumeCard 
          v-for="consume in consumes"
          :key="consume.id"
          :consume="consume"
        />
      </div>
      <div class="col-7">
        <div class="title">
          分帳群組
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import TopNavBar from './../components/TopNavBar.vue'
import ConsumeCard from '../components/ConsumeCard.vue'

const dummyConsumes = [
  {
    id: 1,
    category: 'food',
    name: '午餐麥當勞歡樂送送送到你家哈哈哈哈',
    amount: 500,
    date: '2021/07/07'
  },
  {
    id: 2,
    category: 'entertainment',
    name: '盲盒',
    amount: 700,
    date: '2021/07/03'
  },
  {
    id: 3,
    category: 'life',
    name: '洗髮水',
    amount: 120,
    date: '2021/07/01'
  },

]

export default {
  name: "Home",
  components: {
    TopNavBar,
    ConsumeCard
  },
  created() {
    this.fetchConsume()
  },
  data() {
    return {
      consumes: []
    }
  },
  methods: {
    fetchConsume() {
      this.consumes = dummyConsumes
    }
  }
  
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

  .title {
    position: relative;

    padding: 10px 0 20px 0;
    margin-bottom: 30px;
    font-size: 16px;
    color: #6784b4;
    font-weight: 700;
  }

  .title::after {
    position: absolute;
    left: 0;
    bottom: 0;

    content: '';
    width: 85%;
    height: 2px;

    background: #a9b6cc;
  }
</style>