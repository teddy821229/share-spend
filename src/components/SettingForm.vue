<template>
  <div class="container">
    <form @submit.prevent.stop="handleSubmit">
      <div class="form-row image-row">
        <img :src="user.avatar | defaultImage" class="image" />
        <label for="image">
          <ion-icon name="image-outline"></ion-icon>選擇照片
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          @change="handleFileChange"
        />
      </div>

      <div class="form-row normal-row">
        <label for="account">帳號：</label>
        <input type="text" name="account" id="account" v-model="user.account" />
      </div>

      <div class="form-row normal-row">
        <label for="password">密碼：</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="user.password"
        />
      </div>

      <div class="form-row normal-row">
        <label for="email">信箱：</label>
        <input type="email" name="email" id="email" v-model="user.email" />
      </div>

      <div class="form-row normal-row">
        <label for="name">名稱：</label>
        <input type="text" name="name" id="name" v-model="user.name" />
      </div>

      <div class="form-row normal-row">
        <label for="phone">電話：</label>
        <input
          type="tetx"
          name="phone"
          id="phone"
          maxlength="10"
          v-model="user.phone"
        />
      </div>

      <div class="button-container">
        <button
          type="button"
          class="btn btn-light"
          @click.prevent.stop="cancelEdit"
        >
          取消
        </button>
        <button type="submit" class="btn btn-primary">確認修改</button>
      </div>
    </form>
  </div>
</template>

<script>
import { imgFilter } from "./../utils/mixins";

export default {
  name: "SettingForm",
  mixins: [imgFilter],
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.fetchUser();
  },
  data() {
    return {
      user: {
        id: -1,
        name: "",
        account: "",
        password: "",
        email: "",
        avatar: "",
        phone: "",
      },
      dataCached: {
        id: -1,
        name: "",
        account: "",
        password: "",
        email: "",
        avatar: "",
        phone: "",
      },
    };
  },
  methods: {
    handleFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.user.avatar = "";
        return;
      }

      const imageURL = window.URL.createObjectURL(files[0]);
      this.user.avatar = imageURL;
    },
    fetchUser() {
      const { id, name, account, password, email, avatar, phone } =
        this.initialUser;
      this.user = {
        ...this.user,
        id,
        name,
        account,
        password,
        email,
        avatar,
        phone,
      };
      this.dataCached = {
        ...this.dataCached,
        ...this.user,
      };
    },
    handleSubmit() {
      localStorage.setItem("currentUser", JSON.stringify(this.user));
      this.$store.commit("setCurrentUser", this.user);
    },
    cancelEdit() {
      this.user = {
        ...this.user,
        ...this.dataCached,
      };
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;

  overflow: scroll;
}

.form-row {
  margin: 30px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

label {
  padding-right: 20px;
  white-space: nowrap;

  font-size: 16px;
  font-weight: 700;

  color: #6784b4;
}

input {
  width: 100%;
  max-width: 400px;
  height: 30px;

  border: 2px solid #a9b6cc;
  border-radius: 10px;
  padding-left: 10px;
  font-size: 0.8rem;

  color: #6784b4;
}

.image-row {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
}

.image-row img {
  object-fit: cover;
  object-position: center center;
  
  width: 104px;
  height: 104px;
  border-radius: 50%;
  border: 2px solid #a9b6cc;
}

.image-row label {
  margin: 0 0 0 30px;
  height: 40px;
  padding: 5px 10px;
  display: flex;
  align-items: center;

  border-radius: 10px;
  border: 1px solid #6784b4;

  cursor: pointer;
}

.image-row ion-icon {
  margin-right: 10px;
  font-size: 20px;
}

.image-row input {
  display: none;
}

.image-row label:hover {
  background-color: #f1f6fd;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
}

.btn {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 700;
}

.btn-light {
  border: 2px solid #a9b6cc;
  color: #3c6099;
}
@media screen and (min-width: 576px) {
  .container {
    width: 80%;
  }

  .image-row img {
    width: 154px;
    height: 154px;
  }
  .image-row label {
    margin: 0 0 0 30px;
    height: 40px;
    padding: 5px 10px;
    display: flex;
    align-items: center;

    border-radius: 10px;
    border: 1px solid #6784b4;

    cursor: pointer;
  }

  input {
    height: 40px;
    border-radius: 15px;

    font-size: 1rem;
  }
}
</style>