<template>
 <div class="group">
    <router-link to="/">
      <div class="inner-container">
        新增群組
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CreateGroup",
};
</script>

<style scoped>
.group {
  height: 200px;
  width: 400px;
  max-width: 500px;

  margin: 10px auto;

  background: #f2f6ff;

  border: 2px solid #a9b6cc;
  border-radius: 15px;
}

.group:hover {
  background: #6784b4;
  border-color: #6784b4;
}

.group .inner-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;

  font-size: 25px;
  font-weight: 700;
  color: #6784b4;
  text-align: center;
  line-height: 200px;

  cursor: pointer;
}

.group .inner-container:hover {
  color: #fff;
}

</style>