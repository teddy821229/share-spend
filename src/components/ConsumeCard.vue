<template>
  <div class="card" :class="consume.Category.code">
    <router-link :to="{ name: 'consume', params: { id: consume.id } }">
      <div class="consume-category">
        <ion-icon name="cash-outline"></ion-icon>
        <div class="category-name">{{ consume.Category.name }}</div>
      </div>
      <div class="consume-title">{{ consume.name }}</div>
      <div class="consume-detail">
        <div class="amount">${{ consume.amount }}</div>
        <div class="time">{{ consume.date }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ConsumeCard",
  props: {
    consume: {
      type: Object,
      required: true,
    },
  }
};
</script>

<style scoped>
.card {
  height: 80px;
  width: 90%;
  max-width: 450px;

  margin: 20px auto;

  border: 2px solid #a9b6cc;
  border-radius: 15px;
}

.card:hover {
  background: #f2f6ff;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.card a {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;

  cursor: pointer;
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
  padding-left: 10px;

  font-size: 18px;
  font-weight: 700;
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
  border-color: #BB2020;
}

.food:hover {
  background-color: #fddddd;
}

.food ion-icon {
  color: #BB2020;
}

.food .category-name, .food .consume-title, .food .amount {
  color: #BB2020;
}

.food .consume-title::before {
  background:#BB2020;
}

.food .time {
  color: #f37474;
}

/* 娛樂 */

.entertainment {
  border-color: #D9AA1E;
}

.entertainment:hover {
  background-color: #fff8e4;
}

.entertainment ion-icon {
  color: #D9AA1E;
}

.entertainment .category-name, .entertainment .consume-title, .entertainment .amount {
  color: #D9AA1E;
}

.entertainment .consume-title::before {
  background:#D9AA1E;
}

.entertainment .time {
  color: #e7d291;
}


/* 交通 */

.transport {
  border-color: #3EB595;
}

.transport:hover {
  background-color: #effffa;
}

.transport ion-icon {
  color: #3EB595;
}

.transport .category-name, .transport .consume-title, .transport .amount {
  color: #3EB595;
}

.transport .consume-title::before {
  background:#3EB595;
}

.transport .time {
  color: #7abdab;
}

/* 生活 */

.life {
  border-color: #ED7A4D;
}

.life:hover {
  background-color: #fde8df;
}

.life ion-icon {
  color: #ED7A4D;
}

.life .category-name, .life .consume-title, .life .amount {
  color: #ED7A4D;
}

.life .consume-title::before {
  background:#ED7A4D;
}

.life .time {
  color: #f09a78;
}


/* 其他用原本色調 */
</style>