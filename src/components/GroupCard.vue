<template>
  <div class="group">
    <router-link :to="{ name: 'group', params: { id: group.id } }">
      <div class="img-container">
        <img :src="group.image | defaultImage" alt="" />
      </div>
      <div class="name-container">{{ group.name }}</div>
      <div class="group-detail">
        <div class="member-container">
          <ion-icon name="person-outline"></ion-icon>
          <div class="member-count sub-title">
            {{ group.memberCount }} 位成員
          </div>
        </div>
        <div class="consume-container">
          <ion-icon name="receipt-outline"></ion-icon>
          <div class="consume-count sub-title">
            {{ group.consumeCount }} 筆消費
          </div>
        </div>
        <div class="owed-container">
          <ion-icon name="wallet-outline"></ion-icon>
          <div class="owed sub-title">$ {{ group.userOwed }}</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "GroupCard",
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
      return image || require("./../assets/image/defaultTeam.gif");
    },
  },
};
</script>

<style scoped>
.group {
  height: 200px;
  width: 90%;
  max-width: 500px;

  margin: 10px auto;

  border: 2px solid #a9b6cc;
  border-radius: 15px;
}

.group:hover {
  background: #f2f6ff;
}

.group a {
  width: 90%;
  height: 90%;
  margin: 10px auto;

  display: grid;
  grid-template-columns: 4fr 6fr;
  grid-template-rows: 7fr 3fr;
  align-items: center;

  cursor: pointer;
}

.img-container {
  grid-column: 1/2;
  grid-row: 1/2;
  justify-self: center;
}

.img-container img {
  object-fit: cover;
  object-position: center center;
  width: 112px;
  height: 112px;
  border: 6px solid #a9b6cc;
  border-radius: 50%;
}

.name-container {
  grid-column: 2/3;
  grid-row: 1/2;

  color: #6784b4;
  font-size: 30px;
}

.group-detail {
  grid-column: 1/3;
  grid-row: 2/3;
  height: 30%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  font-size: 18px;
  color: #6784b4;
}

.member-container,
.consume-container,
.owed-container {
  display: flex;
  align-items: center;
}

ion-icon {
  font-size: 20px;
}

.consume-container {
  justify-content: center;
}

.owed-container {
  justify-content: flex-end;
}

.sub-title {
  padding-left: 10px;
}
</style>