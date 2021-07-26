<template>
  <div class="login d-flex align-items-center justify-content-center">
    <form 
      class="login-form"
      @submit.prevent.stop="signIn"
    >
      <div class="login-title">登入</div>
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label for="account" class="col-form-label">帳號</label>
        </div>
        <div class="col-auto">
          <input
            type="text"
            name="account"
            id="account"
            v-model="account"
            required
          />
        </div>
      </div>

      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label for="password" class="col-form-label">密碼</label>
        </div>
        <div class="col-auto">
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
            required
          />
        </div>
      </div>

      <div class="submit-button">
        <button class="btn">登入</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from './../utils/helpers'

const dummyUser = {
  id: 1,
  name: 'Teddy',
  account: 'teddy1993',
  password: '21506qoo'
}

export default {
  name: "Login",
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      if(this.account !== dummyUser.account) {
        Toast.fire({
          icon: 'error',
          title: '您輸入的帳號不存在'
        })
        return
      }

      if(this.password !== dummyUser.password) {
        Toast.fire({
          icon: 'error',
          title: '密碼錯誤，請重新檢查。'
        })
        return
      }
      this.$store.commit('setCurrentUser', dummyUser)
      
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
}
.login-form {
  transform: translateY(-50%);
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 700;
  color: #6784b4;
  transform: translateX(20px);
}

.row {
  margin-bottom: 30px;
}

label {
  color: #a9b6cc;
}

input {
  width: 400px;
  height: 40px;

  padding-left: 10px;

  border-radius: 10px;
  border: 2px solid #d8e3f5;

  color: #6784b4;
}

input:focus,
input:hover {
  border-color: #a9b6cc;
}

.submit-button {
  width: 80%;
  margin: 0 auto;
  transform: translateX(20px);
}

.submit-button button {
  width: 100%;

  border-radius: 10px;

  color: #fff;
  background: #a9b6cc;
}
</style>