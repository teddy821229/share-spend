<template>
  <div>
    <ul class="list">
      <button
        v-for="time in times"
        :key="time.id"
        type="button"
        @click.prevent.stop="filterTime(time.id)"
        :class="{ active: select === time.id }"
      >
        <li class="time">
          {{ time.section }}
        </li>
      </button>
      <!-- <button type="button">
        <li class="time">
          其他區間
        </li>
      </button> -->
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
    section: "七天內",
  },
  {
    id: 3,
    section: "十四天內",
  },
  {
    id: 4,
    section: "一個月內",
  },
  {
    id: 5,
    section: "本季內",
  },
];

export default {
  name: "ConsumeTimeNavPills",
  data() {
    return {
      select: 1,
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
    filterTime(timeId) {
      this.select = timeId;
      this.$emit("change-time", timeId);
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

.time {
  display: inline-block;
  height: 30px;
  padding: 0 10px;

  margin: 0 ;

  border-radius: 15px;

  line-height: 30px;
  text-align: center;
  font-size: .8rem;
}

button {
  color: #6784b4;
}

.time:hover,
.active .time {
  background: #f2f6ff;
}

.list::-webkit-scrollbar {
  display: none;
}

@media screen and (min-width: 576px) {
  .time {
    height: 40px;
    padding: 0 15px;
    margin: 0 5px;
    border-radius: 15px;
    line-height: 40px;

    font-size: 1rem;
  }
}
</style>
