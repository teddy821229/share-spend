<template>
  <div class="group-card">
    <div class="img-container">
      <img :src="group.image | defaultImage" alt="" />
    </div>

    <div class="group-detail">
      <div class="name-container">{{ group.name }}</div>
      <div class="owed-container">{{ group.userOwed | moneyFilter}}</div>
      <div class="updated-container">最後更新: {{group.updatedDate}}</div>
    </div>
  </div>
</template>

<script>
import { moneyFilter } from './../utils/mixins'

export default {
  name: "ConsumeCard",
  mixins: [moneyFilter],
  props: {
    group: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  filters: {
    defaultImage(image) {
      return image || require("./../assets/image/avatarExample.jpeg");
    },
  },
};
</script>

<style scoped>
.group-card {
  width: 90%;
  max-width: 500px;

  margin: 20px auto;

  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
  border-radius: 20px;

  display: flex;
}

.img-container {
  margin: 40px 0 40px 40px;
}

.img-container img {
  object-fit: cover;
  object-position: center center;
  width: 112px;
  height: 112px;
  border: 6px solid #a9b6cc;
  border-radius: 50%;
}

.group-detail {
  flex-grow: 1;

  text-align: center;
  margin: 30px 0 20px;

  color: #6784b4;
}

.name-container {
  line-height: 30px;

  font-size: 16px;
}

.owed-container {
  margin: 10px 0  20px;
  font-size: 40px;
  font-weight: 700;
}

.updated-container {
  font-size: 14px;
}
</style>