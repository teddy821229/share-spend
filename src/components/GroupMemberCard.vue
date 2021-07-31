<template>
  <div
    class="member-card"
    :class="member.debtInGroup >= 0 ? 'positive' : 'negative'"
  >
    <div class="follow-container" :class="{ show: showFriend }">
      <button 
        class="btn" 
        type="button"
        @click.prevent.stop="addFriend"
        :disabled="member.isFriend"
      >
        {{ member.isFriend ? "已是好友" : "加為好友" }}
      </button>
    </div>
    <div class="member-card-container" @click.prevent.stop="showFriendButton">
      <div class="avatar-container">
        <img :src="member.avatar | defaultImage" alt="" />
      </div>
      <div class="name-container">{{ member.name }}</div>
      <div class="owed-container">{{ member.debtInGroup | moneyFilter }}</div>
    </div>
  </div>
</template>

<script>
import { moneyFilter } from "./../utils/mixins";
import { imgFilter } from './../utils/mixins'
 
export default {
  name: "GroupMemberCard",
  mixins: [moneyFilter, imgFilter],
  props: {
    initialMember: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.getMember()
  },
  data() {
    return {
      showFriend: false,
      member: {}
    };
  },
  methods: {
    getMember() {
      this.member = this.initialMember
    },
    showFriendButton() {
      this.showFriend = !this.showFriend;
    },
    addFriend() {
      //  TODO: API 串接friend ship
      this.member.isFriend = true
    }
  },
};
</script>

<style scoped>
.member-card {
  position: relative;

  height: 100px;
  width: 90%;
  max-width: 500px;

  padding: 10px 20px;
  margin: 30px auto;

  border-radius: 20px;
  box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.2);

  cursor: pointer;
}

.member-card:hover {
  transform: translateY(-2px);
}

.positive {
  background-color: #ebf8df;
  color: #769658;
}

.negative {
  background-color: #ffeae7;
  color: #d41900;
}

.member-card-container {
  display: flex;
  align-items: center;
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

  font-weight: 700;
  text-align: center;
  line-height: 50px;

  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
}

.follow-container button {
  color: #a9b6cc;
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