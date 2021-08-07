<template>
  <div class="group-consume-card" :class="consume.Category.code">
    <button
      class="btn"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#groupConsumeModal"
      @click.prevent.stop="createModalContent"
    >
      <div class="consume-category">
        <ion-icon :name="consume.Category.icon"></ion-icon>
        <div class="category-name">{{ consume.Category.name }}</div>
        <div class="time">{{ consume.date | exactTime }}</div>
      </div>
      <div class="middle-container">
        <div class="consume-title-container">
          <div class="consume-title">{{ consume.name }}</div>
        </div>

        <div class="amount"> MyDebt: {{consume.userOwed | moneyFilter}}
        </div>
      </div>

      <div class="consume-detail">
        <div class="participate-container">
          <ion-icon name="person"></ion-icon>
          <span>{{ consume.participates.length }}</span>
        </div>
        <div class="amount">{{consume.amount | moneyFilter}}</div>
      </div>
    </button>
  </div>
</template>

<script>
import { moneyFilter } from "./../utils/mixins";
import { timeFilter } from './../utils/mixins'

export default {
  name: "GroupConsumeCard",
  mixins: [moneyFilter, timeFilter],
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
.group-consume-card {
  height: 100px;
  width: 90%;
  max-width: 500px;

  margin: 20px auto;

  border: 2px solid #a9b6cc;
  border-radius: 15px;
}

.group-consume-card:hover {
  background: #f2f6ff;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.group-consume-card button {
  width: 100%;
  height: 100%;

  padding: 0;

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

.time {
  font-size: 12px;
  padding-top: 5px ;
  color: #a9b6cc;
}

/* 中間內容 */

.middle-container {
  position: relative;
  height: 100%;
  width: 60%;

  display: flex;
  flex-direction: column;

  padding: 10px 0 10px 10px;

  color: #6784b4;
}

.middle-container::before {
  position: absolute;
  left: 0;
  top: 10px;
  content: "";
  height: 80px;
  width: 2px;
  background: #a9b6cc;
}

.consume-title-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.consume-title {
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  letter-spacing: 0.05rem;
}

.amount {
  font-size: 16px;
  text-align: left;
  color: #6784b4;
}

.consume-detail {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-right: 10px;
}

.participate-container {
  height: 70%;
  padding-top: 5px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  color: #6784b4;
}

.participate-container ion-icon {
  font-size: 25px;
}

.participate-container span {
  font-size: 25px;
  padding-left: 5px;
}

/* 食物 */

.food {
  border-color: #2D2552;
}

.food:hover {
  background-color: #eaf1ff;
}

.food ion-icon {
  color: #2D2552;
}

.food .category-name,
.food .consume-title,
.food .amount,
.food .participate-container {
  color: #2D2552;
}

.food .middle-container::before {
  background: #2D2552;
}

.food .time {
  color: #5e4cac;
}

/* 娛樂 */

.entertainment {
  border-color: #3787A0;
}

.entertainment:hover {
  background-color: #ddf3fa;
}

.entertainment ion-icon {
  color: #3787A0;
}

.entertainment .category-name,
.entertainment .consume-title,
.entertainment .amount,
.entertainment .participate-container {
  color: #3787A0;
}

.entertainment .middle-container::before {
  background: #3787A0;
}

.entertainment .time {
  color: #4ab8da;
}

/* 交通 */

.transport {
  border-color: #186C6C;
}

.transport:hover {
  background-color: #e2ffff;
}

.transport ion-icon {
  color: #186C6C;
}

.transport .category-name,
.transport .consume-title,
.transport .amount,
.transport .participate-container {
  color: #186C6C;
}

.transport .middle-container::before {
  background: #186C6C;
}

.transport .time {
  color: #25a3a3
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
.life .amount,
.life .participate-container {
  color: #581047;
}

.life .middle-container::before {
  background: #581047;
}

.life .time {
  color: #961c79;
}

/* 其他用原本色調 */
</style>