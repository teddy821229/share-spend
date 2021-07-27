<template>
  <div class="tab">
    <div class="tab-back">
      <button 
        class="btn back-btn"
        v-show="show"
      >
        <ion-icon name="arrow-back-outline"></ion-icon>
      </button>
    </div>
    <div class="tab-title">
      {{ msg }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNavBar",
  props: {
    msg: {
      type: String,
    },
    show: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style scoped>
.tab {
  height: 80px;

  position: relative;

  display: flex;
  justify-content: center;

  margin-bottom: 20px;
  border-bottom: 2px solid #a9b6cc;
}

.tab .tab-back {
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translateY(calc(-50% + 4px));
}

.tab .tab-back .back-btn ion-icon{
  font-size: 25px;
  color: #6784b4;
}

.tab .tab-title {
  text-align: center;
  line-height: 80px;
  color: #6784b4;
  font-size: 20px;
  font-weight: 700;
}
</style>