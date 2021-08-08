<template>
  <div>
    <ul class="list">
      <li class="category" v-for="category in categories" :key="category.id" :class="{active: select === category.id}">
        <button type="button" @click.prevent.stop="filterCategory(category.id)">
          {{ category.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
const dummyCategories = [
  {
    id: 0,
    code: "all",
    name: "全部",
  },
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
      select: 0
    };
  },
  created() {
    this.fetchCategory();
  },
  methods: {
    fetchCategory() {
      this.categories = dummyCategories;
    },
    filterCategory(categoryId) {
      this.select = categoryId
      this.$emit("change-category", categoryId);
    },
  },
};
</script>

<style scoped>
.list {
  position: relative;

  width: 90%;
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
  height: 30px;
  padding: 0 10px;

  margin: 0 ;

  border-radius: 15px;

  line-height: 30px;
  text-align: center;
  font-size: 0.8rem;
}

button {
  color: #6784b4;
}

.category:hover,
.active  {
  background: #f2f6ff;
}

.list::-webkit-scrollbar {
  display: none;
}

@media screen and (min-width: 576px) {
  .category {
    height: 40px;
    padding: 0 15px;
    margin: 0 5px;
    border-radius: 15px;
    line-height: 40px;

    font-size: 1rem;
  }
}
</style>
