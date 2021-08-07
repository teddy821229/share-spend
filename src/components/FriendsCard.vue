<template>
  <div class="card">
    <div class="avatar-container">
      <img :src="friend.avatar | defaultImage" alt="" />
    </div>
    <div class="name">{{ friend.name }}</div>
    <div class="account">{{ friend.account }}</div>

    <button 
      class="btn"
      @click.prevent.stop="handleClick"
    >
      <ion-icon name="person-remove-outline"></ion-icon>
      <p>刪除好友</p>
    </button>

    <!-- <div class="debt">{{friend.debt | moneyFilter}}</div> -->
  </div>
</template>

<script>
import { imgFilter } from "./../utils/mixins";
import { moneyFilter } from "./../utils/mixins";
import { Toast } from './../utils/helpers'

export default {
  name: "FriendsCard",
  mixins: [imgFilter, moneyFilter],
  props: {
    initialFriend: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.fetchFriend();
  },
  data() {
    return {
      friend: {
        id: -1,
        name: "",
        account: "",
        avatar: "",
        isFriend: false,
        debt: 0,
      },
    };
  },
  methods: {
    fetchFriend() {
      this.friend = {
        ...this.friend,
        ...this.initialFriend,
      };
    },
    handleClick() {
      Toast.fire({
        position: 'center',
        icon: 'warning',
        title: '確定要刪除嗎？',

        showConfirmButton: true,
        confirmButtonText: '確認',

        showDenyButton: true,
        denyButtonText: '取消',

        timer: undefined
      }).then(res => {
        if(res.isConfirmed) {
          this.deleteFriend()
        }
      })
    },
    deleteFriend() {
      this.$emit('after-click-delete', this.friend.id)
    }
  },
};
</script>

<style scoped>
.card {
  width: 250px;
  height: 300px;
  padding: 20px;
  margin: 20px 10px;

  display: flex;
  align-items: center;

  border: 2px solid #a9b6cc;
  border-radius: 20px;
}

.avatar-container {
  padding-bottom: 10px;
}

.avatar-container img {
  width: 120px;
  height: 120px;

  border-radius: 50%;
  border: 4px solid #a9b6cc;
}

.account,
.name,
button {
  padding-top: 5px;
  color: #4b6a9c;
}

.name {
  font-size: 20px;
  font-weight: 700;
}
/* 
.debt {
  font-size: 30px;
} */

button {
  display: flex;
  align-items: center;
  margin-top: 10px;
  
  border: 2px solid #a9b6cc;
}

button:hover {
  color: #fff;
  background: #4b6a9c;
}

ion-icon {
  position: relative;
  font-size: 20px;
  padding-top: 10px;
  padding-right: 5px;
  transform: translateY(-5px);
}

</style>