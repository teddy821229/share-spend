<template>
  <div class="main-content">
    <TopNavBar msg="好友設定" :show="true" />
    <div class="content-container">
      <FriendsCard
        v-for="friend in friends"
        :key="friend.id"
        :initial-friend="friend"
        @after-click-delete="afterClickDelete"
      />
    </div>
  </div>
</template>

<script>
import TopNavBar from "./../components/TopNavBar.vue";
import FriendsCard from "./../components/FriendsCard.vue";


const dummyFriend = [
  {
    id: 24,
    name: "抽不到六星",
    account: "poorgame",
    avatar: "",
    isFriend: true,
    debt: 0,
  },
  {
    id: 26,
    name: "找不到房間的蟑螂",
    account: "whereiscockroach",
    avatar: "",
    isFriend: true,
    debt: 0,
  },
  {
    id: 28,
    name: "好想換手機",
    account: "wantiphone13",
    avatar: "",
    isFriend: true,
    debt: 0,
  },
  {
    id: 1,
    name: "找不到工作又單身",
    account: "lohanka",
    avatar: "",
    isFriend: true,
    debt: 0,
  },
  {
    id: 241,
    name: "抽不到六星",
    account: "poorgame",
    avatar: "",
    isFriend: true,
    debt: 0,
  },
  {
    id: 261,
    name: "找不到房間的蟑螂",
    account: "whereiscockroach",
    avatar: "",
    isFriend: true,
    debt: 0,
  },
  {
    id: 281,
    name: "好想換手機",
    account: "wantiphone13",
    avatar: "",
    isFriend: true,
    debt: 0,
  },
  {
    id: 11,
    name: "找不到工作又單身",
    account: "lohanka",
    avatar: "",
    isFriend: true,
    debt: 0,
  },
  {
    id: 242,
    name: "抽不到六星",
    account: "poorgame",
    avatar: "",
    isFriend: true,
    debt: 0,
  },
  {
    id: 262,
    name: "找不到房間的蟑螂",
    account: "whereiscockroach",
    avatar: "",
    isFriend: true,
    debt: 0,
  },
  {
    id: 282,
    name: "好想換手機",
    account: "wantiphone13",
    avatar: "",
    isFriend: true,
    debt: 0,
  },
  {
    id: 12,
    name: "找不到工作又單身",
    account: "lohanka",
    avatar: "",
    isFriend: true,
    debt: 0,
  },
];

export default {
  name: "Friends",
  components: {
    TopNavBar,
    FriendsCard,
  },
  data() {
    return {
      friends: [],
    };
  },
  created() {
    this.fetchFriend()
  },
  methods: {
    fetchFriend() {
      dummyFriend.forEach((data) => {
        const { id, name, account, avatar, isFriend, debt } = data;
        this.friends.push({
          id,
          name,
          account,
          avatar,
          isFriend,
          debt,
        });
      });
    },
    afterClickDelete(id) {
      this.friends = this.friends.filter(friend => friend.id !== id)

    }
  },
};
</script>

<style scoped>
.main-content {
  position: relative;

  padding-bottom: 20px;

  height: 100%;
  width: 100%;
}
.content-container {
  height: calc(100% - 100px);
  overflow: scroll;
  display: flex;
  flex-flow: row wrap;

  /* display: grid;

  grid-template-columns: 1fr 1fr 1fr 1fr ;
  grid-auto-flow: row;
  grid-gap: 20px 0; */
}
</style>