<template>
  <div>
    <ul class="list">
      <li class="category">
        <router-link
          :to="{name: 'payment'}"
        >
          全部
        </router-link>
      </li>
      <li
        v-for="category in categories"
        :key="category.id"
        class="category"
      >
        <router-link
          :to="{ name: 'payment', query: { categoryId: category.id }}"
        >
          {{category.name}}
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
const dummyCategories= [
  {
    id: 1,
    code: 'food',
    name: '食物',
  },
  {
    id:2,
    code: 'entertainment',
    name: '娛樂'
  },
  {
    id:3,
    code: 'transport',
    name: '交通'
  },
  {
    id:4,
    code: 'life',
    name: '生活'
  },
  {
    id:5,
    code: 'other',
    name: '其他'
  }

]

export default {
  name: 'ConsumeNavPills',
  data() {
    return {
      categories: []
    }
  },
  created() {
    this.fetchCategory()
  },
  methods: {
    fetchCategory() {
      this.categories = dummyCategories
    },
  }

}
</script>

<style scoped>

  .list {
    position: relative;

    width: 90%;
    height: auto;
    margin: 10px auto 0;
    white-space: nowrap;
    overflow: scroll;
  }

  /* .list::after {
    position: absolute;
    right: -25px;

    content: "";
    height: 100%;
    width: 50px;

    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #ddd 100%);
  } */

  .category {
    display: inline-block;
    height: 40px;
    width: 60px;

    margin: 0 5px ;

    border-radius: 15px;

    line-height: 40px;
    text-align: center;
  }


  .category a {
    color: #6784b4;
  }

  .category:hover {
    background: #f2f6ff;
  }

  .list::-webkit-scrollbar {
    display: none;
  }

</style>
