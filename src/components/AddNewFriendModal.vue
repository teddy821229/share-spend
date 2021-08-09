<template>
  <div class="modal-container">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn add-friend"
      data-bs-toggle="modal"
      data-bs-target="#addFriendModal"
    >
      新增好友
    </button>
    <button
      type="button"
      class="btn small-add-friend"
      data-bs-toggle="modal"
      data-bs-target="#addFriendModal"
    >+
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addFriendModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">新增好友</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent.stop="searchUser">
              <div class="form-row">
                <label for="keyword">搜尋使用者：</label>
                <input
                  type="text"
                  class="search-input"
                  id="keyword"
                  v-model="keyword"
                />
              </div>

              <div class="form-row button-container">
                <button type="submit" class="btn btn-primary">
                  搜尋使用者
                </button>
              </div>
            </form>
            <template v-if="user.id">
              <div class="user-container">
                <div class="image-container">
                  <img :src="user.image | defaultImage" alt="" />
                </div>
                <div class="detail-container">
                  <div class="name">{{ user.name }}</div>
                  <div class="account">{{ user.account }}</div>
                </div>
                <button 
                  class="btn friend-button add-button" 
                  v-if="!user.isFriend"
                  @click.prevent.stop="addFriend"
                >
                  <ion-icon name="person-add-outline"></ion-icon>
                  <p>新增好友</p>
                </button>
                <button 
                  class="btn friend-button delete-button" 
                  v-else
                  @click.prevent.stop="deleteFriend"
                > 
                  <ion-icon name="person-add-outline"></ion-icon>
                  <p>刪除好友</p>
                </button>
              </div>
            </template>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-complete"
              data-bs-dismiss="modal"
            >
              完成
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgFilter } from "./../utils/mixins";

const dummyUser = {
  id: "99",
  account: "Teddy0323",
  name: "Tebby",
  avatar: "",
  email: "teddy@mail.com",
  phone: "0952971229",
  isFriend: false,
};

export default {
  name: "AddNewFriendModal",
  mixins: [imgFilter],
  data() {
    return {
      keyword: "",
      user: {
        id: "",
        account: "",
        name: "",
        avatar: "",
        phone: "",
        isFriend: false,
      },
    };
  },
  methods: {
    searchUser() {
      if (
        this.keyword === dummyUser.account ||
        this.keyword === dummyUser.phone ||
        this.keyword === dummyUser.email
      ) {
        this.user = {
          ...this.user,
          ...dummyUser
        };
        return;
      }
    },
    addFriend() {
      this.user.isFriend = true
      this.$emit('after-add-friend', this.user)
    },
    deleteFriend() {
      this.user.isFriend = false
      this.$emit('after-delete-friend', this.user)
    }
  },
};
</script>

<style scoped>
.small-add-friend {
  position: absolute;
  bottom: 30px;
  right: 10px;
  z-index: 1;

  height: 40px;
  width: 40px;

  background: #4b6a9c;
  border-radius: 50%;

  color: #fff;
  font-size: 20px;
  line-height: 10px;
}

.add-friend {
  display: none;
}

.modal-title {
  color: #4b6a9c;
}

.form-row {
  display: flex;
  align-items: center;
}

label {
  white-space: nowrap;
  padding-right: 10px;

  color: #4b6a9c;
}

input {
  flex-grow: 1;
  height: 40px;

  padding-left: 15px;

  border: 1px solid #a9b6cc;
  border-radius: 20px;

  color: #4b6a9c;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: center;

  padding-top: 20px;
}

.button-container button {
  padding: 5px 20px;
  border-radius: 10px;
  width: 40%;
  background: #a9b6cc;
  border: 1px solid #a9b6cc;

  margin-bottom: 40px;
}

.user-container {
  position: relative;
  display: flex;
  flex-flow: column;

  align-items: center;
}

.user-container::after {
  position: absolute;
  top: -20px;

  content: "";
  height: 2px;
  width: 80%;

  background: #a9b6cc;
}

.image-container {
  padding: 10px 0;
}

.image-container img {
  width: 128px;
  height: 128px;

  border-radius: 50%;
  border: 4px solid #a9b6cc;
}

.detail-container {
  text-align: center;
  color: #4b6a9c;
  padding: 0 0 20px;
}

.name {
  padding: 10px 0;
  font-size: 26px;
  font-weight: 700;
}

.account {
  font-size: 14px;
}

.friend-button {
  display: flex;
  align-items: center;

  margin: 10px;

  color: #4b6a9c;

  border-radius: 10px;
  border: 2px solid #a9b6cc;

  font-size: 18px;
}

.friend-button:hover {
  color: #fff;
  background: #a9b6cc;
}

.delete-button {
  color: #fff;
  background: #a9b6cc;
}

.delete-button:hover {
  color: #a9b6cc;
  background: #fff;
}

.friend-button  p {
  padding-left: 10px;
}

.btn-complete {
  color: #a9b6cc;
  background: #fff;
  border-color: #a9b6cc;
}

@media screen and (min-width: 576px) {
  .small-add-friend {
    display: none;
  }
  
  .add-friend {
    width: 250px;
    height: 300px;
    padding: 20px;
    margin: 20px 10px;

    display: flex;
    flex-direction: column;
    align-items: center;

    border: 2px solid #a9b6cc;
    border-radius: 20px;

    color: #a9b6cc;
    font-size: 30px;
    font-weight: 700;

    line-height: 256px;
  }

  .add-friend:hover {
    background: #a9b6cc;
    color: #fff;
  }
}
</style>