<template>
  <div class="card" :class="consume.category">
    <router-link :to="{ name: 'consume', params: { id: consume.id } }">
      <div class="consume-category">
        <ion-icon name="cash-outline"></ion-icon>
        <div class="category-name">{{ consume.category | categoryToChinese}}</div>
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
  },

  filters: {
    categoryToChinese(category) {
      const table = {
        'food': '食物',
        'entertainment': '娛樂',
        'transport': '交通',
        'life': '生活',
        'other': '其他'
      }
      return table[category]
    }
  }
};
</script>

<style scoped>
.card {
  height: 80px;
  width: 90%;
  max-width: 400px;

  margin: 20px auto;

  border: 1px solid #a9b6cc;
  border-radius: 15px;
}

.card:hover {
  background: #f2f6ff;
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

/* 食物 */

/* 生活 */

/* 娛樂 */

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
</style>