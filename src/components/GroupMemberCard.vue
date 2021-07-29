<template>
  <div
    class="member-card"
    :class="member.debtInGroup > 0 ? 'positive' : 'negative'"
    @click.prevent.stop="showFriendButton"
  >
    <div 
      class="follow-container"
      :class="{show: showFriend}"
    >{{ member.isFriend ? '已是好友' : '加為好友'}}</div>
    <div class="avatar-container">
      <img :src="member.avatar | defaultImage" alt="" />
    </div>
    <div class="name-container">{{ member.name }}</div>
    <div class="owed-container">{{ member.debtInGroup | moneyFilter }}</div>
  </div>
</template>

<script>
import { moneyFilter } from './../utils/mixins'

export default {
  name: "GroupMemberCard",
  mixins: [moneyFilter],
  props: {
    member: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showFriend: false
    }
  },
  methods: {
    showFriendButton() {
      this.showFriend = !this.showFriend
    }
  },
  filters: {
    defaultImage(image) {
      return image || require("./../assets/image/avatarExample.jpeg");
    }
  },
};
</script>

<style scoped>
.member-card {
  position: relative;

  height: 100px;
  width: 100%;
  max-width: 500px;

  display: flex;
  align-items: center;

  padding: 10px 20px;
  margin: 30px auto;

  border-radius: 20px;
  box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.2);
  
  cursor: pointer;
}

.member-card:hover {
  transform: translateY(-5px);
}


.positive {
  background-color: #ebf8df;
  color: #769658;
}

.negative {
  background-color: #ffeae7;
  color: #d41900;
}

.follow-container {
  position: absolute;
  left: 100px;
  top: -20px;

  width: 100px;
  height: 50px;

  border-radius: 10px;
  background: #eff0f1;
  display: none;

  color: #a9b6cc;
  font-weight: 700; 
  text-align: center;
  line-height: 50px;

  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
}

.show {
  display: block;
}

.avatar-container {
  flex-grow: 0;
  margin: 0 20px 0 0;
}

.avatar-container img {
  height: 78px;
  width: 78px;

  border-radius: 50%;
  border: 4px solid #fff;
}

.name-container {
  flex-grow: 1;

  font-size: 18px;

  color: #666;
}

.owed-container {
  flex-grow: 1;

  text-align: right;

  font-weight: 700;
}
</style>