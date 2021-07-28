<template>
  <div>
    <ul class="list">
      <router-link :to="{ name: 'payment' }">
        <li class="category">全部</li>
      </router-link>
      <router-link
        v-for="category in categories"
        :key="category.id"
        :to="{ name: 'payment', query: { categoryId: category.id } }"
      >
        <li class="category">
          {{ category.name }}
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
const dummyCategories = [
  {
    id: 1,
    code: "food",
    name: "食物",
  },
  {
    id: 2,
    code: "entertainment",
    name: "娛樂",
  },
  {
    id: 3,
    code: "transport",
    name: "交通",
  },
  {
    id: 4,
    code: "life",
    name: "生活",
  },
  {
    id: 5,
    code: "other",
    name: "其他",
  },
];

export default {
  name: "ConsumeCategoryNavPills",
  data() {
    return {
      categories: [],
    };
  },
  created() {
    this.fetchCategory();
  },
  methods: {
    fetchCategory() {
      this.categories = dummyCategories;
    },
  },
};
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
  padding: 0 20px;

  margin: 0 5px;

  border-radius: 15px;

  line-height: 40px;
  text-align: center;
}

 a {
  color: #6784b4;
}

.category:hover, .active .category {
  background: #f2f6ff;
}

.list::-webkit-scrollbar {
  display: none;
}
</style>
