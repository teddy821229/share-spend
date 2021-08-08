<template>
  <div class="button-container">
    <button
      type="button"
      class="btn add-consume"
      data-bs-toggle="modal"
      data-bs-target="#createGroupConsumeModal"
    >
      新增消費
    </button>

    <button
      type="button"
      class="small-add-consume"
      data-bs-toggle="modal"
      data-bs-target="#createGroupConsumeModal"
    >
    </button>
    <!-- Modal -->
    <div
      class="modal fade consume-modal"
      id="createGroupConsumeModal"
      ref="createGroupConsumeModal"
      tabindex="-1"
      aria-labelledby="groupConsumeModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header d-block">
            <h5 class="modal-title text-center" id="createGroupConsumeModal">
              消費明細
            </h5>
          </div>
          <div class="modal-body">
            <form class="consume-form" @submit.prevent.stop="handleSubmit">
              <div class="content-line form-row d-flex">
                <div class="row-title">消費名稱：</div>
                <input
                  type="text"
                  name="name"
                  v-model="content.name"
                  placeholder="請輸入消費名稱"
                />
              </div>

              <div class="content-line form-row d-flex">
                <div class="row-title">類別：</div>
                <select
                  name="category"
                  v-model="content.Category"
                  :class="{ default: content.Category.id === 0 }"
                >
                  <option
                    v-for="category in categoryList"
                    :key="category.id"
                    :value="category"
                    :selected="category.id === content.Category.id"
                    :disabled="category.id === 0"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>

              <div class="content-line form-row d-flex">
                <div class="row-title">總金額：</div>
                <input
                  type="number"
                  name="amount"
                  v-model.number="content.amount"
                  placeholder="請輸入金額"
                />
              </div>

              <div class="content-line form-row d-flex">
                <div class="row-title">時間：</div>
                <input type="date" name="date" v-model="content.date" />
              </div>

              <!-- <div class="content-line form-row d-flex">
                <div class="row-title">備註：</div>
                <input
                  type="text"
                  name="description"
                  v-model="content.description"
                  placeholder="非必填"
                />
              </div> -->

              <div class="content-line pay-container">
                <div class="title pay-title">
                  誰付的：<span>{{ totalPay }}</span>
                </div>

                <ul class="pay-list">
                  <li
                    class="payment"
                    v-for="participate in paylist"
                    :key="participate.id"
                  >
                    <div class="img-container">
                      <img :src="participate.avatar | defaultImage" alt="" />
                    </div>
                    <div class="payment-detail">{{ participate.name }} :</div>
                    <input type="number" v-model.number="participate.pay" />
                  </li>
                </ul>
                <select id="selectCreatePay" @change="pushPayInParticipate">
                  <option value="0" disabled selected>新增成員</option>
                  <option
                    v-for="member in unselectPayList"
                    :key="member.id"
                    :value="member.id"
                  >
                    {{ member.name }}
                  </option>
                </select>
              </div>

              <div class="content-line share-container">
                <div class="title share-title">
                  幫誰付：
                  <span>{{ totalShare }}</span>
                </div>
                <!-- add editing with input  -->
                <ul class="share-list">
                  <li
                    class="share"
                    v-for="participate in sharelist"
                    :key="participate.id"
                  >
                    <div class="img-container">
                      <img :src="participate.avatar | defaultImage" alt="" />
                    </div>
                    <div class="share-detail">{{ participate.name }} :</div>
                    <!-- v-model 修飾符號 -->
                    <input type="number" v-model.number="participate.share" />
                  </li>
                </ul>
                <select id="selectCreateShare" @change="pushShareInParticipate">
                  <option value="0" disabled selected>新增成員</option>
                  <option
                    v-for="member in unselectShareList"
                    :key="member.id"
                    :value="member.id"
                  >
                    {{ member.name }}
                  </option>
                </select>
              </div>

              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">新增</button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  @click.prevent.stop="handleModalClose"
                >
                  關閉
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";
import { Modal } from "bootstrap";
import { v4 as uuidv4 } from "uuid";

import moment from "moment";

export default {
  name: "createGroupConsume",
  mixins: [imgFilter],
  props: {
    memberList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      content: {
        id: -1,
        Category: {
          id: 0,
          code: "none",
          icon: "",
          name: "請選擇類別",
        },
        name: "",
        amount: "",
        userOwed: 0,
        participates: [],
        date: moment(new Date()).format("YYYY-MM-DD"),
      },
      categoryList: [
        {
          id: 0,
          code: "none",
          icon: "",
          name: "請選擇類別",
        },
        {
          id: 1,
          code: "food",
          icon: "fast-food-outline",
          name: "食物",
        },
        {
          id: 2,
          code: "entertainment",
          icon: "game-controller-outline",
          name: "娛樂",
        },
        {
          id: 3,
          code: "transport",
          icon: "train-outline",
          name: "交通",
        },
        {
          id: 4,
          code: "life",
          icon: "cafe-outline",
          name: "生活",
        },
        {
          id: 5,
          code: "other",
          icon: "cash-outline",
          name: "其他",
        },
      ],
      members: [],
      modal: null,
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.createGroupConsumeModal);
  },
  created() {
    this.fetchMember();
  },
  methods: {
    fetchMember() {
      this.members = this.memberList;
    },
    handleModalClose() {
      // reset data
      this.content = {
        id: -1,
        Category: {
          id: 0,
          code: "none",
          icon: "",
          name: "請選擇類別",
        },
        name: "",
        amount: "",
        userOwed: 0,
        participates: [],
        date: moment(new Date()).format("YYYY-MM-DD"),
      };
    },
    handleSubmit() {
      if (!this.content.name.trim()) {
        Toast.fire({
          icon: "warning",
          title: "請輸入名稱！",
        });
        return;
      }

      if (!this.content.amount) {
        Toast.fire({
          icon: "warning",
          title: "請輸入金額！",
        });
        return;
      }

      // same amount checked
      let totalPay = 0;
      this.content.participates.forEach((participate) => {
        totalPay += participate.pay;
      });

      let totalShare = 0;
      this.content.participates.forEach((participate) => {
        totalShare += participate.share;
      });

      if (this.content.amount !== totalPay) {
        Toast.fire({
          icon: "warning",
          title: "總付款與總金額不相符，請再次確認！",
        });
        return;
      }

      if (totalPay !== totalShare) {
        Toast.fire({
          icon: "warning",
          title: "總付款與分帳金額不相符，請再次確認！",
        });
        return;
      }

      // calculate debt

      this.content.participates.forEach((participate) => {
        if (participate.pay === null) {
          participate.pay = 0;
        }
        if (participate.share === null) {
          participate.share = 0;
        }
      });

      // filtered pay & share = 0 user

      this.content.participates = this.content.participates.filter(
        (participate) => !(participate.pay === 0 && participate.share === 0)
      );

      this.content.participates.forEach((participate) => {
        participate.debt = participate.pay - participate.share;
      });

      const userId = 22;

      this.content.userOwed = this.content.participates.find(
        (participate) => participate.id === userId
      ).debt;

      // emit event
      this.$emit("after-create", {
        ...this.content,
        id: uuidv4(),
        date: new Date(this.content.date),
      });

      this.modal.hide();
      Toast.fire({
        icon: "success",
        title: "新增群組消費成功！",
      });

      // TODO: API change consume file
    },
    pushPayInParticipate() {
      const obj = document.getElementById("selectCreatePay");
      const selectId = Number(obj.value);
      if (
        this.content.participates.some(
          (participate) => participate.id === selectId
        )
      ) {
        this.content.participates.find((participate) => {
          if (participate.id === selectId) {
            participate.pay = null;
          }
        });
      } else {
        const { id, name, account, avatar } = this.members.find(
          (member) => member.id === selectId
        );
        this.content.participates.push({
          id,
          name,
          account,
          avatar,
          debt: 0,
          pay: null,
          share: 0,
        });
      }
      obj.value = "0";
    },
    pushShareInParticipate() {
      const obj = document.getElementById("selectCreateShare");
      const selectId = Number(obj.value);
      if (
        this.content.participates.some(
          (participate) => participate.id === selectId
        )
      ) {
        this.content.participates.find((participate) => {
          if (participate.id === selectId) {
            participate.share = null;
          }
        });
      } else {
        const { id, name, account, avatar } = this.members.find(
          (member) => member.id === selectId
        );
        this.content.participates.push({
          id,
          name,
          account,
          avatar,
          debt: 0,
          pay: 0,
          share: null,
        });
      }
      obj.value = "0";
    },
  },
  computed: {
    paylist() {
      return this.content.participates.filter(
        (participate) => participate.pay !== 0
      );
    },
    sharelist() {
      return this.content.participates.filter(
        (participate) => participate.share !== 0
      );
    },
    unselectPayList() {
      return this.members.filter(
        (member) =>
          !this.content.participates.some(
            (participate) =>
              participate.id === member.id && participate.pay !== 0
          )
      );
    },

    unselectShareList() {
      return this.members.filter(
        (member) =>
          !this.content.participates.some(
            (participate) =>
              participate.id === member.id && participate.share !== 0
          )
      );
    },
    totalPay() {
      let total = 0;
      this.content.participates.forEach((participate) => {
        total += participate.pay;
      });

      return total;
    },
    totalShare() {
      let total = 0;
      this.content.participates.forEach((participate) => {
        total += participate.share;
      });

      return total;
    },
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
}

.small-add-consume {
  position: absolute;
  bottom: 30px;
  right: 10px;

  width: 40px;
  height: 40px;

  background: #6784b4;
  border-radius: 50%;
  line-height: 38px;
}

.small-add-consume::after {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;

  content: "+";
  font-size: 30px;
  color: #fff;
}

.add-consume {
  display: none;
  height: 80px;
  width: 90%;
  max-width: 400px;

  margin: 20px auto 10px;

  background-color: #a9b6cc;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 70px;
  border-radius: 15px;

  cursor: pointer;
}

.add-consume:hover {
  background: #6784b4;
}

.modal-dialog {
  color: #6784b4;

  font-size: 16px;
}
.modal-content {
  margin: auto;
  border-radius: 20px;
  border: none;
}

.modal-title {
  color: #6784b4;
}

.modal-body {
  padding: 0;
}

.row-title {
  white-space: nowrap;
  height: 35px;
  line-height: 35px;
}

.editting {
  display: block;
}

input,
select {
  width: 100%;
  color: #6784b4;
  border: 1px solid #a9b6cc;
  border-radius: 10px;
  height: 35px;
  line-height: 35px;
  padding: 0 4px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input::placeholder {
  color: #a9b6cc;
}

.default {
  color: #a9b6cc;
}

.content-line input,
.content-line select {
  flex-grow: 1;
}

.content-line {
  position: relative;
  padding: 15px;

  border-bottom: 1px solid #ebebeb;

  display: flex;
  /* border-radius: 20px; */
  /* box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2); */

  margin-bottom: 10px;
}

.pay-container,
.share-container {
  display: block;
}

.title {
  padding-bottom: 10px;
  margin-bottom: 10px;

  border-bottom: 2px solid #a9b6cc;
}

.payment,
.share {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.img-container img {
  height: 50px;
  width: 50px;
  margin-right: 20px;

  border-radius: 50%;
}

.payment-detail,
.share-detail {
  white-space: nowrap;
  margin-right: 5px;
}

.modal-footer {
  border: none;
}

@media screen and (min-width: 576px) {
  .add-consume {
    display: block;
  }

  .small-add-consume {
    display: none;
  }
}
</style>