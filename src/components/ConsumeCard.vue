<template>
  <div class="personal-consume-card" :class="consume.Category.code">
    <button
      class="btn"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#consumeModal"
      @click.prevent.stop="createModalContent"
    >
      <div class="consume-category">
        <ion-icon name="cash-outline"></ion-icon>
        <div class="category-name">{{ consume.Category.name }}</div>
      </div>
      <div class="consume-title">{{ consume.name }}</div>
      <div class="consume-detail">
        <div class="amount">${{ consume.amount }}</div>
        <div class="time">{{ consume.date | exactTime }}</div>
      </div>
    </button>
  </div>
</template>

<script>
import { timeFilter } from './../utils/mixins'

export default {
  name: "ConsumeCard",
  mixins: [timeFilter],
  props: {
    consume: {
      type: Object,
      required: true,
    },
  },
  methods: {
    createModalContent() {
      this.$emit('after-click-button', this.consume)
    }
  }
};
</script>

<style scoped>
.personal-consume-card {
  height: 80px;
  width: 90%;
  max-width: 450px;

  margin: 20px auto;

  border: 2px solid #a9b6cc;
  border-radius: 15px;
}

.personal-consume-card:hover {
  background: #f2f6ff;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.personal-consume-card button {
  width: 100%;
  height: 100%;

  padding: 0 ;

  display: flex;
  flex-direction: row;
  align-items: center;

  cursor: pointer;
  box-shadow: none;
  border: none;
}
/* 類別 */
.consume-category {
  width: 20%;
  padding-left: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.consume-category ion-icon {
  font-size: 40px;
  color: #6784b4;
}

.category-name {
  font-size: 12px;
  margin-top: 5px;
  word-break: break-all;
  text-align: center;
  color: #6784b4;
}

.consume-title {
  position: relative;
  display: flex;
  align-items: center;

  width: 50%;
  height: 100%;
  padding-left: 10px;

  font-size: 18px;
  font-weight: 700;
  text-align: left;
  letter-spacing: 0.05rem;
  color: #6784b4;
}

.consume-title::before {
  position: absolute;
  left: 0;
  top: 10px;
  content: "";
  height: 60px;
  width: 2px;
  background: #a9b6cc;
}

.consume-detail {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.consume-detail .amount {
  font-size: 22px;
  font-weight: 700;
  color: #6784b4;
}

.consume-detail .time {
  font-size: 12px;
  color: #a9b6cc;
}

/* 食物 */

.food {
  border-color: #2d2552;
}

.food:hover {
  background-color: #eaf1ff;
}

.food ion-icon {
  color: #2d2552;
}

.food .category-name,
.food .consume-title,
.food .amount {
  color: #2d2552;
}

.food .consume-title::before {
  background: #2d2552;
}

.food .time {
  color: #5e4cac;
}

/* 娛樂 */

.entertainment {
  border-color: #3787a0;
}

.entertainment:hover {
  background-color: #ddf3fa;
}

.entertainment ion-icon {
  color: #3787a0;
}

.entertainment .category-name,
.entertainment .consume-title,
.entertainment .amount {
  color: #3787a0;
}

.entertainment .consume-title::before {
  background: #3787a0;
}

.entertainment .time {
  color: #4ab8da;
}

/* 交通 */

.transport {
  border-color: #186c6c;
}

.transport:hover {
  background-color: #e2ffff;
}

.transport ion-icon {
  color: #186c6c;
}

.transport .category-name,
.transport .consume-title,
.transport .amount {
  color: #186c6c;
}

.transport .consume-title::before {
  background: #186c6c;
}

.transport .time {
  color: #25a3a3;
}

/* 生活 */

.life {
  border-color: #581047;
}

.life:hover {
  background-color: #ffe4f9;
}

.life ion-icon {
  color: #581047;
}

.life .category-name,
.life .consume-title,
.life .amount {
  color: #581047;
}

.life .consume-title::before {
  background: #581047;
}

.life .time {
  color: #961c79;
}

/* 其他用原本色調 */
</style>