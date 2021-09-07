<template>
  <!-- Modal -->
  <div
    class="modal fade consume-modal"
    id="groupConsumeModal"
    ref="groupConsumeModal"
    tabindex="-1"
    aria-labelledby="groupConsumeModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header d-block">
          <h5 class="modal-title text-center" id="groupConsumeModal">
            消費明細
          </h5>
        </div>
        <div class="modal-body">
          <form class="consume-form" @submit.prevent.stop="saveChange">
            <div
              class="content-line form-row d-flex"
              :class="{ edit: isEditing }"
            >
              <div class="row-title">消費名稱：</div>
              <label for="name">{{ content.name }}</label>
              <input type="text" name="name" id="name" v-model="content.name" />
            </div>

            <div
              class="content-line form-row d-flex"
              :class="{ edit: isEditing }"
            >
              <div class="row-title">類別：</div>
              <label for="category">{{ content.Category.name }}</label>
              <select name="category" id="category" v-model="content.Category">
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

            <div
              class="content-line form-row d-flex"
              :class="{ edit: isEditing }"
            >
              <div class="row-title">總金額：</div>
              <label for="amount">{{ content.amount }}</label>
              <input
                type="number"
                name="amount"
                id="amount"
                v-model.number="content.amount"
              />
            </div>

            <!-- <div
              class="content-line form-row d-flex"
              :class="{ edit: isEditing }"
            >
              <div class="row-title">備註：</div>
              <label for="amount">{{ content.description }}</label>
              <input
                type="text"
                name="description"
                id="description"
                v-model="content.description"
              />
            </div> -->

            <div
              class="content-line pay-container"
              :class="{ edit: isEditing }"
            >
              <div class="title pay-title">
                誰付的：<span v-show="isEditing">{{ totalPay }}</span>
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
                  <label>{{ participate.pay }}</label>
                  <input type="number" v-model.number="participate.pay" />
                </li>
              </ul>
              <select id="selectPay" @change="pushPayInParticipate">
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

            <div
              class="content-line share-container"
              :class="{ edit: isEditing }"
            >
              <div class="title share-title">
                幫誰付：
                <span v-show="isEditing">{{ totalShare }}</span>
                <button
                  v-show="isEditing"
                  type="button"
                  class="btn"
                  @click.prevent.stop="evenShare"
                  :disabled="!content.amount"
                >
                  均分
                </button>
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
                  <label>{{ participate.share }}</label>
                  <!-- v-model 修飾符號 -->
                  <input type="number" v-model.number="participate.share" />
                </li>
              </ul>
              <select id="selectShare" @change="pushShareInParticipate">
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
              <template v-if="isEditing === true">
                <button
                  type="button"
                  class="btn btn-danger"
                  @click.prevent.stop="changeEditState"
                >
                  取消
                </button>
                <button type="submit" class="btn btn-primary">完成編輯</button>
              </template>
              <template v-else>
                <button
                  type="button"
                  class="btn btn-success me-auto"
                  @click.prevent.stop="addPersonalConsume"
                >
                  新增至個人消費
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click.prevent.stop="deleteConsume"
                >
                  刪除
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click.prevent.stop="changeEditState"
                >
                  編輯
                </button>
              </template>
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
</template>

<script>
import { imgFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";

export default {
  name: "GroupConsumeModal",
  mixins: [imgFilter],
  props: {
    modalContent: {
      type: Object,
      default: () => {
        return {
          isEditing: false,
        };
      },
    },
    memberList: {
      type: Array,
      required: true,
    },
  },
  watch: {
    modalContent() {
      this.fetchContent();
    },
  },
  data() {
    return {
      content: {
        id: -1,
        Category: {
          id: -1,
          code: "",
          name: "",
        },
        name: "",
        amount: 0,
        userOwed: 0,
        participates: [],
        date: "",
      },
      isEditing: false,

      contentCached: {
        id: -1,
        Category: {
          id: -1,
          code: "",
          name: "",
        },
        name: "",
        amount: 0,
        userOwed: 0,
        participates: [],
        date: "",
      },
      categoryList: [
        {
          id: 0,
          code: "none",
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
    this.modal = new Modal(this.$refs.groupConsumeModal);
  },
  created() {
    this.fetchMember();
  },
  methods: {
    // fetch function
    fetchMember() {
      this.members = this.memberList;
    },
    fetchContent() {
      const { id, Category, name, amount, userOwed, date } = this.modalContent;

      this.content = {
        id,
        Category,
        name,
        amount,
        userOwed,
        participates: [],
        date,
      };

      this.content.participates = this.modalContent.participates.map(
        (participate) => {
          const { id, account, name, avatar, debt, pay, share } = participate;
          return {
            id,
            account,
            name,
            avatar,
            debt,
            pay,
            share,
          };
        }
      );
    },
    // state and cached
    changeEditState() {
      this.isEditing = !this.isEditing;
      if (this.isEditing) {
        this.createCached();
        return;
      }
      if (!this.isEditing) {
        this.cancelEdit();
        return;
      }
    },
    createCached() {
      const { id, Category, name, amount, userOwed, date } = this.content;
      this.contentCached = {
        id,
        Category,
        name,
        amount,
        userOwed,
        participates: [],
        date,
      };

      this.contentCached.participates = this.content.participates.map(
        (participate) => {
          const { id, account, name, avatar, debt, pay, share } = participate;
          return {
            id,
            account,
            name,
            avatar,
            debt,
            pay,
            share,
          };
        }
      );
    },
    cancelEdit() {
      this.content = {
        ...this.content,
        ...this.contentCached,
      };
    },
    handleModalClose() {
      if (this.isEditing) {
        this.isEditing = !this.isEditing;
        this.cancelEdit();
      }
    },
    // save function
    async saveChange() {
      const payerList = [];
      const payeeList = [];
      const expenses = [];
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
      // 將點選新增後未加入消費的使用者篩除

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

      // generate return expenses Arr

      await this.content.participates.forEach((participate) => {
        if (participate.debt >= 0) {
          payerList.push({
            id: participate.id,
            name: participate.name,
            debt: participate.debt,
          });
          if (participate.share > 0) {
            expenses.push({
              name: this.content.name,
              payerId: participate.id,
              payeeId: participate.id,
              amount: participate.share,
              CategoryId: this.content.Category.id,
              GroupId: "2",
            });
          }
        } else {
          payeeList.push({
            id: participate.id,
            name: participate.name,
            debt: participate.debt,
          });
          if (participate.pay > 0) {
            expenses.push({
              name: this.content.name,
              payerId: participate.id,
              payeeId: participate.id,
              amount: participate.pay,
              CategoryId: this.content.Category.id,
              GroupId: "2",
            });
          }
        }
      });

      payerList.sort((a, b) => b.debt - a.debt);
      payeeList.sort((a, b) => a.debt - b.debt);

      for (let i = 0; i < payerList.length; i++) {
        for (let j = 0; j < payeeList.length; j++) {
          const payerAmount = payerList[i].debt;
          const payeeAmount = payeeList[j].debt * -1;
          if (payerAmount >= payeeAmount) {
            let pay = payeeList[j].debt * -1;
            expenses.push({
              name: this.content.name,
              payerId: payerList[i].id,
              payeeId: payeeList[j].id,
              amount: pay,
              CategoryId: this.content.Category.id,
              GroupId: "2",
            });
            payerList[i].debt -= pay;
            if (payerList[i].debt === 0) {
              break;
            }
          } else if (payerAmount < payeeAmount) {
            let pay = payerList[i].debt;
            expenses.push({
              name: this.content.name,
              payerId: payerList[i].id,
              payeeId: payeeList[j].id,
              amount: pay,
              CategoryId: this.content.Category.id,
              GroupId: "2",
            });
            payeeList[j].debt += pay;
            break;
          }
        }
      }

      console.log("expenses", expenses);

      // return expense Object: {
      //     name,
      //     payerId,
      //     payeeId,
      //     amount,
      //     CategoryId,
      //     GroupId
      // }

      // emit event
      this.$emit("after-save-change", {
        ...this.content,
      });

      // TODO: API change consume file
      this.isEditing = false;
    },
    deleteConsume() {
      Swal.fire({
        icon: "warning",
        title: "確定要刪除嗎？",

        toast: true,

        showConfirmButton: true,
        confirmButtonText: "確定",
        confirmButtonColor: "#dd6b55",

        showDenyButton: true,
        denyButtonText: "取消刪除",
        denyButtonColor: "#3085d6",

        timerProgressBar: false,
        timer: undefined,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit("after-delete", this.content);
          this.modal.hide();
        }
      });
    },

    // add participate function
    pushPayInParticipate() {
      const obj = document.getElementById("selectPay");
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
      const obj = document.getElementById("selectShare");
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
    evenShare() {
      this.sharelist.forEach((member) => {
        member.share = this.content.amount / this.sharelist.length;
      });
      // 處理餘數
      let i = 0;
      while (this.totalShare !== this.content.amount) {
        this.sharelist[i].share += 1;
        i += 1;
      }
    },
    addPersonalConsume() {
      const { name, Category, date, participates } = this.content;
      const amount = participates.find(
        (participate) => participate.id === 22
      ).share;
      const data = {
        name,
        Category,
        date,
        amount,
      };
      // TODO: API create consume
      console.log("data", data);
      Toast.fire({
        icon: "success",
        title: "新增至個人消費成功！",
      });
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
    // TODO: same checked
    // sameCheck() {
    //   if (
    //     this.content.name !== this.contentCached.name ||
    //     this.content.Category.id !== this.contentCached.Category.id ||
    //     this.content.amount !== this.contentCached.amount
    //   ) {
    //     return false;
    //   }
    //   return true;
    // },
  },
};
</script>

<style scoped>
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

.content-line input,
.content-line select {
  flex-grow: 1;
  display: none;
}

.content-line label {
  flex-grow: 1;
  height: 35px;
  line-height: 35px;
  display: block;

  padding-left: 5px;
}

.edit input,
.edit select {
  display: block;
}

.edit label {
  display: none;
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

  display: flex;
  align-items: center;
}

.share-title button {
  margin-left: 50px;
  border: 1px solid #a9b6cc;
  color: #6784b4;

  box-shadow: none;
}

.share-title button:hover {
  color: #fff;
  background: #a9b6cc;
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
</style>