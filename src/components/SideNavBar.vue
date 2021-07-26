<template>
  <div class="container nav-container">
    <ul class="nav-list">
      <template v-if="!isAuthenticated">
        <li class="nav-item">
          <router-link to="/login">
            <span class="icon">
              <ion-icon name="log-in-outline"></ion-icon>
            </span>
            <span class="title">登入</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/">
            <span class="icon">
              <ion-icon name="key-outline"></ion-icon>
            </span>
            <span class="title">註冊</span>
          </router-link>
        </li>
      </template>

      <template v-else>
        <li class="nav-item">
          <router-link to="/home">
            <span class="icon">
              <ion-icon name="home-outline"></ion-icon>
            </span>
            <span class="title">首頁</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/payment">
            <span class="icon">
              <ion-icon name="wallet-outline"></ion-icon>
            </span>
            <span class="title">記帳本</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/group">
            <span class="icon">
              <ion-icon name="people-outline"></ion-icon>
            </span>
            <span class="title">分帳群組</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/setting">
            <span class="icon">
              <ion-icon name="settings-outline"></ion-icon>
            </span>
            <span class="title">設定</span>
          </router-link>
        </li>
        <li class="nav-item logout">
          <button
            type="button"
          >
            <span class="icon">
              <ion-icon name="log-out-outline"></ion-icon>
            </span>
            <span class="title">登出</span>
          </button>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideNavBar",
  data() {
    return {
      isAuthenticated: false,
    };
  },
};
</script>

<style scoped>
.nav-container {
  position: relative;
  background: #a9b6cc;
  border-radius: 10px;
  max-width: 250px;

  padding-top: 60px;
  padding-right: 0;
  padding-left: 20px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
}

.nav-item {
  height: 60px;
}

a, button {
  padding-left: 20px;
  height: 100%;
  display: flex;
  align-items: center;
}

.nav-item {
  display: block;
  margin-bottom: 10px;
}

.nav-item:hover a, .nav-item:hover button {
  background: #fff;
  border-radius: 10px 0 0 10px;
}

.nav-item .active {
  background: #fff;
  border-radius: 10px 0 0 10px;
}

.logout {
  width: calc(100% - 20px);
  position: absolute;
  bottom: 20px;
}

button {
  width: 100%;
}

.nav-item span {
  color: #fff;
  font-weight: 700;
}
.nav-item:hover span {
  color: #a9b6cc;
}

.nav-item .active span {
  color: #a9b6cc;
}

.nav-item .icon {
  height: 60px;
  line-height: 68px;
}

.nav-item .icon ion-icon {
  height: 20px;
  width: 20px;
}

.nav-item .title {
  display: none;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
}
@media screen and (min-width: 768px) {
  .nav-item .title {
    display: block;
    height: 60px;
    line-height: 60px;
    margin-left: 20px;
  }
}
</style>