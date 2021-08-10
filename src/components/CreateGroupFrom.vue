<template>
  <form class="group-form" @submit.prevent.stop="handleSubmit">
    <div class="row">
      <div class="col-12 col-md-6 left-content">
        <div class="title">基本資料</div>

        <div class="form-row image-row">
          <img :src="image | defaultImage" class="group-image" />
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

        <div class="form-row name-row">
          <label for="name">群組名稱： </label>
          <input type="text" id="name" name="name" v-model="name" />
        </div>

        <!-- <div class="form-row description-row">
            <label for="description">其他備註： </label>
            <textarea type="text" id="description" name="description" v-model="description"> </textarea>
          </div> -->
        <div class="member-list-title">成員名單：</div>
        <div class="form-row member-list-container">
          <ul class="member-list">
            <li v-for="member in members" :key="member.id" class="member">
              <div class="image-container">
                <img :src="member.avatar | defaultImage" alt="" />
              </div>
              <div class="name-container">{{ member.name }}</div>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-12 col-md-6 right-content">
        <div class="title">成員設定</div>
        <!-- TODO: Edit Member -->
        <!-- v-for friend list with checkbox -->
        <div class="friend-list-container">
          <ul class="friend-list">
            <li v-for="friend in friendList" :key="friend.id" class="friend">
              <label
                :for="'select' + friend.id"
                :class="{ selected: friend.selected }"
              >
                <ion-icon name="checkmark-circle-outline"></ion-icon>
              </label>
              <!-- use v-model to do this section!! -->
              <input
                type="checkbox"
                name="member"
                :id="'select' + friend.id"
                :value="friend.id"
                v-model="friend.selected"
                @click="handleSelect(friend)"
              />
              <img :src="friend.avatar | defaultImage" alt="" />
              <div class="name">{{ friend.name }}</div>
            </li>
          </ul>
        </div>

        <div class="button-container d-flex justify-content-end">
          <button type="submit" class="btn btn-primary submit-button">
            建立群組
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { imgFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";

const dummyUser = {
  id: 22,
  name: "買盲盒買到破產",
  account: "nomoney",
  avatar: "",
  isFriend: false,
  debtInGroup: 2469,
};

const dummyFriendList = [
  {
    id: 24,
    name: "抽不到六星",
    account: "poorgame",
    avatar: "",
    isFriend: true,
    debtInGroup: -1181,
  },
  {
    id: 26,
    name: "找不到房間的蟑螂",
    account: "whereiscockroach",
    avatar: "",
    isFriend: false,
    debtInGroup: -456,
  },
  {
    id: 28,
    name: "好想換手機",
    account: "wantiphone13",
    avatar: "",
    isFriend: true,
    debtInGroup: -536,
  },
  {
    id: 1,
    name: "找不到工作又單身",
    account: "lohanka",
    avatar: "",
    isFriend: false,
    debtInGroup: -496,
  },
  {
    id: 44,
    name: "抽不到六星",
    account: "poorgame",
    avatar: "",
    isFriend: true,
    debtInGroup: -1181,
  },
  {
    id: 46,
    name: "找不到房間的蟑螂",
    account: "whereiscockroach",
    avatar: "",
    isFriend: false,
    debtInGroup: -456,
  },
  {
    id: 48,
    name: "好想換手機",
    account: "wantiphone13",
    avatar: "",
    isFriend: true,
    debtInGroup: -536,
  },
  {
    id: 41,
    name: "找不到工作又單身",
    account: "lohanka",
    avatar: "",
    isFriend: false,
    debtInGroup: -496,
  },
  {
    id: 64,
    name: "抽不到六星",
    account: "poorgame",
    avatar: "",
    isFriend: true,
    debtInGroup: -1181,
  },
  {
    id: 66,
    name: "找不到房間的蟑螂",
    account: "whereiscockroach",
    avatar: "",
    isFriend: false,
    debtInGroup: -456,
  },
  {
    id: 68,
    name: "好想換手機",
    account: "wantiphone13",
    avatar: "",
    isFriend: true,
    debtInGroup: -536,
  },
  {
    id: 61,
    name: "找不到工作又單身",
    account: "lohanka",
    avatar: "",
    isFriend: false,
    debtInGroup: -496,
  },
  {
    id: 74,
    name: "抽不到六星",
    account: "poorgame",
    avatar: "",
    isFriend: true,
    debtInGroup: -1181,
  },
  {
    id: 76,
    name: "找不到房間的蟑螂",
    account: "whereiscockroach",
    avatar: "",
    isFriend: false,
    debtInGroup: -456,
  },
  {
    id: 78,
    name: "好想換手機",
    account: "wantiphone13",
    avatar: "",
    isFriend: true,
    debtInGroup: -536,
  },
  {
    id: 71,
    name: "找不到工作又單身",
    account: "lohanka",
    avatar: "",
    isFriend: false,
    debtInGroup: -496,
  },
];

export default {
  name: "CreateGroupForm",
  mixins: [imgFilter],
  data() {
    return {
      name: "",
      image: "",
      members: [],

      friendList: [],
      user: {},
    };
  },
  methods: {
    handleFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.image = "";
        return;
      }

      const imageURL = window.URL.createObjectURL(files[0]);
      this.image = imageURL;
    },
    fetchFriendList() {
      // this.friendList = dummyFriendList;
      dummyFriendList.map((friend) => {
        this.friendList.push({
          ...friend,
          selected: false,
        });
      });
    },
    fetchUser() {
      this.user = {
        ...this.user,
        ...dummyUser,
      };
      this.members.push(this.user);
    },
    handleSelect(user) {
      if (this.members.find((member) => member.id === user.id)) {
        this.members = this.members.filter((member) => member.id !== user.id);
        return;
      }
      this.members.push(user);
    },
    handleSubmit(e) {
      if (!this.name) {
        Toast.fire({
          icon: "warning",
          title: "請輸入群組名稱",
        });
        return;
      }

      if (this.members.length < 2) {
        Toast.fire({
          icon: "warning",
          title: "請至少選擇一位成員",
        });
        return;
      }

      const form = e.target;
      const formData = new FormData(form);
      this.$emit("after-submit", [formData, this.members]);
    },
  },
  created() {
    this.fetchFriendList();
    this.fetchUser();
  },
};
</script>

<style scoped>
form {
  height: 100%;
}

.left-content,
.right-content {
  height: 100%;
}

.title {
  position: relative;

  padding: 10px 0 20px 0;
  font-size: 16px;
  color: #6784b4;
  font-weight: 700;

  text-align: center;
}

.title::after {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);

  content: "";
  width: 85%;
  height: 2px;

  background: #a9b6cc;
}

.group-image {
  position: relative;

  width: 150px;
  height: 150px;

  margin: 10px 10px;

  object-fit: cover;
  object-position: center center;

  border-radius: 50%;
  border: 8px solid #a9b6cc;
}

.form-row {
  position: relative;

  margin: 20px;
  padding-top: 20px;
  display: flex;
  align-items: center;

  color: #6784b4;
}

.form-row label {
  margin-right: 30px;
  white-space: nowrap;
}

.form-row input,
.form-row textarea {
  width: 100%;
  height: 40px;

  padding-left: 10px;

  border-radius: 10px;
  border: 2px solid #6784b4;

  color: #6784b4;
}

.form-row textarea {
  height: 120px;
  resize: none;
}

.form-row:hover input,
.form-row:hover textarea {
  border-color: #415e8d;
}

.description-row label {
  align-self: flex-start;
}

.image-row {
  display: flex;
  align-items: center;
  justify-content: center;
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

.member-list-title {
  margin: 20px 20px 0;
  padding: 10px 0;
  display: flex;
  align-items: center;

  color: #6784b4;
}

.member-list-container {
  padding-top: 0;
  margin-top: 0;
  display: block;
  height: calc(100% - 410px);
  overflow: scroll;
}

.friend-list-container {
  height: calc(100% - 120px);
  overflow-y: scroll;
}

.member-list {
  height: 100%;
  overflow: scroll;
}

.friend-list .friend,
.member-list .member {
  position: relative;

  display: flex;
  align-items: center;

  width: 85%;
  margin: 30px auto;

  color: #6784b4;
}

.member-list .member {
  width: 100%;
  margin: 30px 10px;
}

.friend-list .friend::after,
.member-list .member::after {
  position: absolute;
  bottom: -15px;
  left: 40px;

  content: "";

  height: 2px;
  width: 90%;

  background: #e5edf8;
}

.friend-list .friend img,
.member-list .member img {
  margin: 0 20px;

  height: 50px;
  width: 50px;

  border-radius: 50%;
}

.friend-list label {
  height: 20px;
  width: 20px;

  background: #fff;

  border: 2px solid #6784b4;
  border-radius: 50%;
}

.friend-list ion-icon {
  display: none;
}

.friend-list .selected {
  position: relative;
}

.friend-list .selected ion-icon {
  position: absolute;

  display: block;

  top: -4px;
  left: -4px;

  color: #6784b4;

  font-size: 24px;
}

.friend-list input {
  display: none;
}

.submit-button {
  margin: 10px;
  background: #6784b4;
  border-color: #6784b4;
}

.submit-button:hover {
  background: #fff;
  color: #6784b4;
}
</style>