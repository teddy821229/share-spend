<template>
  <div class="card">
    <router-link to="/">
      <div class="img-container"></div>
      <div class="name-container">Teddy地獄組</div>
      <div class="group-detail">
        <div class="member-container">
          <ion-icon name="person-outline"></ion-icon>
          <div class="member-count sub-title">5 位成員</div>
        </div>
        <div class="consume-container">
          <ion-icon name="receipt-outline"></ion-icon>
          <div class="consume-count sub-title">30 筆消費</div>
        </div>
        <div class="owed-container">
          <ion-icon name="wallet-outline"></ion-icon>
          <div class="owed sub-title">
            + $3,667
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ConsumeCard",
};
</script>

<style scoped>
.card {
  height: 200px;
  width: 90%;
  max-width: 500px;

  margin: 20px 0;

  border: 2px solid #a9b6cc;
  border-radius: 15px;
}

.card a {
  width: 90%;
  height: 90%;

  margin: auto auto 5px auto;

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
  width: 108px;
  height: 108px;
  border: 4px solid #a9b6cc;
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

.member-container, .consume-container, .owed-container  {
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
  justify-content: flex-end
}



.sub-title {
  padding-left: 10px;
}


</style>