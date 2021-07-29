<template>
  <div class="main-content">
    <TopNavBar :msg="group.name" :show="true" />
    <div class="row">
      <div class="col-6">
        <GroupCardInDetail 
          :group="group"
        />
        <div class="title">
          群組成員 <span>{{group.Member.length}}人</span>
        </div>
        
        <!-- TODO: Group Member Detail -->
      </div>
      <div class="col-6">
        <div class="title">
          群組消費列表 <span>{{group.Consume.length}} 筆</span>
        </div>
        <!-- TODO: Group Conusumes -->
      </div>
    </div>
  </div>
</template>

<script>
import TopNavBar from "./../components/TopNavBar.vue";
import GroupCardInDetail from './../components/GroupCardInDetail.vue'

const dummyGroup = {
    id: 1,
    name: '地獄小組',
    image: '',
    Member: [
      {
        id: 22,
        name: '買盲盒買到破產',
        account: 'nomoney',
        avatar: '',
        debtInGroup: '',
      },
      {
        id: 24,
        name: '抽不到六星',
        account: 'poorgame',
        avatar: '',
        debtInGroup: '',
      },
      {
        id: 26,
        name: '找不到工作又單身',
        account: 'lohanka',
        avatar: '',
        debtInGroup: '',
      },
      {
        id: 28,
        name: '好想換手機',
        account: 'wantiphone13',
        avatar: '',
        debtInGroup: '',
      },
      {
        id: 1,
        name: 'Teddy',
        account: 'teddy1993',
        avatar: '',
        debtInGroup: '',
      }
    ],
    Consume: [],
    userOwed: "+ 3,667",
    updatedDate: '2021/07/02'
  }

export default {
  name: "GroupDetail",
  components: {
    TopNavBar,
    GroupCardInDetail
  },
  data() {
    return {
      group: {
        id: -1,
        name: '',
        image: '',
        memberCount: 0,
        consumeCount: 0,
        userOwed: ''
      }
    }
  },
  created() {
    this.fetchGroup()
  },
  methods: {
    fetchGroup() {
      this.group = {
        ...this.group,
        ...dummyGroup
      }
    }
  }
};
</script>

<style scoped>
.main-content {
  height: 100%;
  width: 100%;
}

.row  {
  height: calc(100% - 100px);
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
</style>