<template>
  <div class="button-container">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn add-consume"
      data-bs-toggle="modal"
      data-bs-target="#createModal"
    >
      新增消費
    </button>

    <button
      type="button"
      class="rwd-button"
      data-bs-toggle="modal"
      data-bs-target="#createModal"
    ></button>

    <!-- Modal -->
    <div
      class="modal fade consume-modal"
      id="createModal"
      ref="createModal"
      tabindex="-1"
      aria-labelledby="createModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header d-block">
            <h5 class="modal-title text-center">消費明細</h5>
          </div>
          <div class="modal-body">
            <form class="consume-form" @submit.prevent.stop="handeleSubmit">
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
                    :disabled="category.id === 0"
                    :selected="category.id === content.Category.id"
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
                />
              </div> -->

              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">新增</button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  @click.prevent.stop="cleanCached"
                >
                  取消
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
import { Toast } from "./../utils/helpers";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "bootstrap";
import moment from "moment";

export default {
  name: "CreateConsume",
  data() {
    return {
      content: {
        id: -1,
        Category: {
          id: 0,
          code: "none",
          name: "請選擇類別",
        },
        name: "",
        amount: "",
        date: moment(new Date()).format("YYYY-MM-DD"),
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
      isEditing: false,
      modal: null,
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.createModal);
  },
  methods: {
    cleanCached() {
      this.content = {
        id: -1,
        Category: {
          id: 0,
          code: "none",
          name: "請選擇類別",
        },
        name: "",
        amount: "",
        date: moment(new Date()).format("YYYY-MM-DD"),
      };
    },
    handeleSubmit() {
      // 檢查名稱
      if (!this.content.name.trim()) {
        Toast.fire({
          icon: "warning",
          title: "請輸入消費名稱",
        });
        return;
      }

      if (this.content.name.length > 15) {
        Toast.fire({
          icon: "warning",
          title: "名稱最多只能輸入15個字！",
        });
        return;
      }

      // 檢查類別
      if (this.content.Category.id === 0) {
        Toast.fire({
          icon: "warning",
          title: "請選擇類別",
        });
        return;
      }

      // 檢查金額
      if (!this.content.amount) {
        Toast.fire({
          icon: "warning",
          title: "請輸入金額",
        });
        return;
      }

      this.content = {
        ...this.content,
        id: uuidv4(),
        date: new Date(this.content.date),
      };

      this.$emit("after-create-new-consume", this.content);

      Toast.fire({
        icon: "success",
        title: "新增成功",
      });

      this.cleanCached();
      this.modal.hide();
    },
  },
};
</script>

<style scoped>
.button-container {
  position: absolute;
  bottom: 30px;
  right: 10px;


  display: flex;
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

.rwd-button {
  height: 40px;
  width: 40px;

  background: #6784b4;
  border-radius: 50%;
}

.rwd-button::after {
  content: "+";

  color: #fff;
  font-weight: 700;
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
  flex-grow: 1;
}

input::placeholder {
  color: #a9b6cc;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.default {
  color: #a9b6cc;
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

.content-line:last-child {
  border: none;
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

.share-detail,
.payment-detail {
  flex-grow: 1;
  display: flex;

  font-weight: 700;
}

.modal-footer {
  border: none;
}

@media screen and (min-width: 576px) {
  .button-container {
    position: relative;
    bottom: 0;
    right: 0;
  }
  .add-consume {
    display: block;
  }

  .rwd-button  {
    display: none;
  }
}
</style>