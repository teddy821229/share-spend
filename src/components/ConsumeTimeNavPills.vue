<template>
  <div>
    <ul class="list">
      <router-link
        v-for="time in times"
        :key="time.id"
        :to="{ name: 'payment', query: { timeSection: time.id } }"
      >
        <li class="time">
          {{ time.section }}
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
const dummyTimes = [
  {
    id: 1,
    section: "本日",
  },
  {
    id: 2,
    section: "本週",
  },
  {
    id: 3,
    section: "上週",
  },
  {
    id: 4,
    section: "本月",
  },
  {
    id: 5,
    section: "上個月",
  },
  {
    id: 6,
    section: "其他區間",
  },
];

export default {
  name: "ConsumeTimeNavPills",
  data() {
    return {
      times: [],
    };
  },
  created() {
    this.fetchTimes();
  },
  methods: {
    fetchTimes() {
      this.times = dummyTimes;
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

.time {
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

.time:hover, .active .time {
  background: #f2f6ff;
}


.time::-webkit-scrollbar {
  display: none;
}
</style>
