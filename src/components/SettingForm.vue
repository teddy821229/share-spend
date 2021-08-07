<template>
  <div class="container">
    <form>
      <div class="form-row image-row">
        <img :src="avatar | defaultImage" class="image" />
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
        <input type="text" name="account" id="account" />
      </div>

      <div class="form-row normal-row">
        <label for="password">密碼：</label>
        <input type="password" name="password" id="password" />
      </div>

      <div class="form-row normal-row">
        <label for="email">信箱：</label>
        <input type="email" name="email" id="email" />
      </div>

      <div class="form-row normal-row">
        <label for="name">名稱：</label>
        <input type="text" name="name" id="name" />
      </div>

      <div class="form-row normal-row">
        <label for="phone">電話：</label>
        <input type="tetx" name="phone" id="phone" />
      </div>

      <div class="button-container">
        <button class="btn btn-light">
          取消
        </button>
        <button class="btn btn-primary">
          確認修改
        </button>
      </div>

    </form>
  </div>
</template>

<script>
import { imgFilter } from './../utils/mixins'

export default {
  name: "SettingForm",
  mixins: [imgFilter],
  data() {
    return {
      name: '',
      account: '',
      password: '',
      email: '',
      avatar: '',
      dataCached: {
        name: "",
        account: "",
        password: "",
        email: '',
        avatar: '',
      }
    }
  },
  methods: {
    handleFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.avatar = "";
        return;
      }

      const imageURL = window.URL.createObjectURL(files[0]);
      this.avatar = imageURL;
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 80%;

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
  max-width: 500px;
  height: 40px;

  border: 2px solid #a9b6cc;
  border-radius: 15px;
  padding-left: 15px;
}

.image-row {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
}

.image-row img{
  width: 160px;
  height: 160px;
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

</style>