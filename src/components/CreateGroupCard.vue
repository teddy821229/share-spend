<template>
  <div class="outter">
    <div class="group">
      <router-link to="/groups/create">
        <div class="inner-container">新增群組</div>
      </router-link>
    </div>
    <div class="small-group">
      <router-link to="/groups/create">
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateGroup",
};
</script>

<style scoped>

.group {
  display: none;
  height: 200px;
  width: 450px;
  max-width: 500px;

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

.small-group a {
  position: absolute;
  bottom: 20px;
  right: 0px;

  width: 40px;
  height: 40px;

  background: #6784b4;
  border-radius: 50%;

  text-align: center;
  line-height: 35px;
}

.small-group a::after {
  content: "+";
  font-size: 30px;
  color: #fff;

}

@media screen and (min-width: 576px) {
  .outter {
    margin: 10px auto;
  }

  .group {
    display: block;
  }
  .small-group {
    display: none;
  }
}

</style>