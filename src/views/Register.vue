<template>
  <div class="register-container">
    <div class="register-stepper">
      <div class="step-container h-100 d-flex">
        <div
          class="step"
          :class="{ complete: step > 0, now: step === 0, undone: step < 0 }"
        >
          <div class="step-title"><span>建立帳號</span></div>
        </div>
        <div
          class="step"
          :class="{ complete: step > 1, now: step === 1, undone: step < 1 }"
        >
          <div class="step-title"><span>基本資料</span></div>
        </div>
        <div
          class="step"
          :class="{ complete: step > 2, now: step === 2, undone: step < 2 }"
        >
          <div class="step-title"><span>完成註冊</span></div>
        </div>
      </div>
    </div>
    <div class="register d-flex align-items-center justify-content-center">
      <form class="login-form">
        <div class="register-title">註冊</div>
        <template v-if="step === 0">
          <div class="row g-3 align-items-center">
            <div class="col-auto input-title">
              <label for="account" class="col-form-label">帳號*</label>
            </div>
            <div class="col-auto input-container">
              <input
                type="text"
                name="account"
                id="account"
                v-model="user.account"
                required
              />
            </div>
          </div>

          <div class="row g-3 align-items-center">
            <div class="col-auto input-title">
              <label for="password" class="col-form-label">密碼*</label>
            </div>
            <div class="col-auto input-container">
              <input
                type="password"
                name="password"
                id="password"
                v-model="user.password"
                required
              />
            </div>
          </div>

          <div class="row g-3 align-items-center">
            <div class="col-auto input-title">
              <label for="password-confirm" class="col-form-label"
                >密碼確認*</label
              >
            </div>
            <div class="col-auto input-container">
              <input
                type="password"
                name="password-confirm"
                id="password-confirm"
                v-model="passwordConfirm"
                required
              />
            </div>
          </div>
        </template>
        <template v-else-if="step === 1">
          <div class="row g-3 align-items-center">
            <div class="col-auto input-title">
              <label for="name" class="col-form-label">名稱*</label>
            </div>
            <div class="col-auto input-container">
              <input type="text" name="name" id="name" v-model="user.name" />
            </div>
          </div>

          <div class="row g-3 align-items-center">
            <div class="col-auto input-title">
              <label for="email" class="col-form-label">信箱*</label>
            </div>
            <div class="col-auto input-container">
              <input
                type="email"
                name="email"
                id="email"
                v-model="user.email"
              />
            </div>
          </div>

          <div class="row g-3 align-items-center">
            <div class="col-auto input-title">
              <label for="name" class="col-form-label mb-4">電話</label>
            </div>
            <div class="col-auto input-container">
              <input type="text" name="phone" id="phone" v-model="user.phone" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="congrate">
            註冊完成！恭喜你！
            <br />
            現在可以開始使用我們的服務了 
            <br />
            {{ user.name }}
          </div>
        </template>
        <div class="note" v-show="step !== 2">標示為*的為必填項目！</div>

        <div class="submit-button">
          <template v-if="step === 0">
            <button class="btn btn-next" @click.prevent.stop="addStep">
              下一步
            </button>
          </template>

          <template v-else-if="step === 1">
            <button class="btn btn-previos mb-4" @click.prevent.stop="preStep">
              上一步
            </button>
            <button class="btn" @click.prevent.stop="addStep">註冊</button>
          </template>
          <template v-else>
            <button class="btn" @click.prevent.stop="$router.push('/login')">
              返回登入頁面
            </button>
          </template>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
export default {
  name: "Register",
  data() {
    return {
      step: 0,
      user: {
        account: "",
        email: "",
        password: "",
        avatar: "",
        name: "",
        phone: "",
      },

      passwordConfirm: "",
    };
  },
  methods: {
    addStep() {
      if (this.step === 0) {
        if (!this.user.account.trim()) {
          Toast.fire({
            icon: "warning",
            title: "請輸入帳號",
          });
          return;
        }
        if (this.user.password !== this.passwordConfirm) {
          Toast.fire({
            icon: "warning",
            title: "密碼不相同，請再次確認。",
          });
          return;
        }
        this.step += 1;
        return
      }
      if (this.step === 1) {
         if (!this.user.name.trim()) {
          Toast.fire({
            icon: "warning",
            title: "請輸入名稱",
          });
          return;
        }

        if (!this.user.email.trim()) {
          Toast.fire({
            icon: "warning",
            title: "請輸入信箱",
          });
          return;
        }
        this.step += 1
      }
    },
    preStep() {
      this.step -= 1;
    },
  },
};
</script>

<style scoped>
.register-container {
  width: 100%;
  height: clac(100% - 40px);
  padding-top: 40px;
}

.register-stepper {
  height: 15%;
  border-bottom: 2px solid #6784b4;
  padding: 20px 0 40px;
  margin-bottom: 50px;
}

.step {
  position: relative;
  flex-grow: 1;

  display: flex;
  align-items: center;
  justify-content: center;
}

.step-title {
  position: relative;
  padding-left: 30px;
  font-size: 12px;
  line-height: 26px;
}

.step:nth-child(1n) .step-title::before {
  position: absolute;
  left: -20px;
  text-align: center;
  line-height: 26px;

  display: inline-block;
  width: 30px;
  height: 30px;

  border-radius: 50%;

  transform: translateY(-3px);
}

.complete:nth-child(1n) .step-title::before,
.undone:nth-child(1n) .step-title::before {
  border: 2px solid #a9b6cc;
}

.now:nth-child(1n) .step-title::before {
  border: 2px solid #6784b4;
}

.step:nth-child(1) .step-title::before {
  content: "1";
}

.step:nth-child(2) .step-title::before {
  content: "2";
}

.step:nth-child(3) .step-title::before {
  content: "3";
}

.complete:nth-child(1n) .step-title::before {
  content: "\2714";
  background: #a9b6cc;
}

.step:nth-child(1n):after {
  content: "";
  position: absolute;
  top: calc(50% - 1.5px);
  left: calc(50% + 67px);
  right: calc(-40% + 67px);
  height: 3px;
}

.step:last-child::after {
  height: 0px;
}

.complete:nth-child(1n):after,
.now:nth-child(1n):after {
  background: #6784b4;
}

.undone:nth-child(1n):after {
  background: #a9b6cc;
}

.now .step-title {
  color: #6784b4;
  font-weight: 700;
}

.complete .step-title {
  color: #6784b4;
}

.undone .step-title {
  color: #a9b6cc;
}

/* stepper end */

/* bottom content */

.register {
  height: calc(75% - 80px);
}

.register-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 700;
  color: #6784b4;

}

.row {
  width: 350px;
  margin-bottom: 30px;
  display: flex;
}

.input-title {
  width: 100px;
}

label {
  color: #a9b6cc;
}

.input-container {
  flex-grow: 1;
}

input {
  height: 40px;
  width: 100%;
  padding-left: 10px;

  border-radius: 10px;
  border: 2px solid #d8e3f5;

  color: #6784b4;
}

input:focus,
input:hover {
  border-color: #a9b6cc;
}

.input-image input {
  border: none;
}

.note {
  font-size: 14px;
  padding-left: 20px;
  color: #a9b6cc;
}

.congrate {
  width: 400px;
  font-size: 20px;
  font-weight: 700;
  color: #6784b4;
  line-height: 3rem;
  text-align: center;

}

.submit-button {
  position: relative;
  width: 60%;
  padding-top: 40px;
  margin: 0 auto;
}

.submit-button::before {
  position: absolute;
  content: "";
  background-color: #a9b6cc;
  height: 2px;
  width: 150%;
  transform: translateX(-50%);
  left: 50%;
  top: 10px;
}

.submit-button button {
  width: 100%;

  border-radius: 10px;

  color: #fff;
  background: #a9b6cc;
}

.submit-button .btn-previos {
  background: #fff;
  color: #6784b4;
  border: 1px solid #6784b4;
}

@media screen and (min-width: 576px) {
  .step-title span {
    font-size: 16px;
  }

  .row {
    width: 400px;
  }
}
</style>