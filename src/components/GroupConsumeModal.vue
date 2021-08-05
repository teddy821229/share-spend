<template>
  <!-- Modal -->
  <div
    class="modal fade consume-modal"
    id="groupConsumeModal"
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
          <!-- TODO: Modal Content -->
          <form 
            class="consume-form"
            @submit.prevent.stop="saveChange"
          >
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
                type="text"
                name="amount"
                id="amount"
                v-model="content.amount"
              />
            </div>

            <div
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
            </div>

            <div class="content-line pay-container">
              <div class="title pay-title">誰付的：</div>
              <ul class="pay-list">
                <li
                  class="payment"
                  v-for="participate in paylist"
                  :key="participate.id"
                >
                  <div class="img-container">
                    <img :src="participate.avatar | defaultImage" alt="" />
                  </div>
                  <div class="payment-detail">
                    {{ participate.name }} :
                    <span class="ms-auto"> {{ participate.pay }}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div class="content-line share-container">
              <div class="title share-title">幫誰付：</div>
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
                  <div class="share-detail">
                    {{ participate.name }} :
                    <span class="ms-auto"> {{ participate.share }}</span>
                  </div>
                </li>
              </ul>
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
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="sameCheck"
                >
                  完成編輯
                </button>
              </template>
              <template v-else>
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

export default {
  name: "GroupConsumeModal",
  mixins: [imgFilter],
  props: {
    modalContent: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    modalContent: {
      handler: function (newValue) {
        this.content = {
          ...this.content,
          ...newValue,
        };
        this.isEditing = false;
      },
      deep: true,
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
          id: 1,
          code: "food",
          name: "食物",
        },
        {
          id: 2,
          code: "entertainment",
          name: "娛樂",
        },
        {
          id: 3,
          code: "transport",
          name: "交通",
        },
        {
          id: 4,
          code: "life",
          name: "生活",
        },
        {
          id: 5,
          code: "other",
          name: "其他",
        },
      ],
    };
  },
  methods: {
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
      this.contentCached = {
        ...this.contentCached,
        ...this.content,
      };
    },
    cancelEdit() {
      this.content = {
        ...this.content,
        ...this.contentCached,
      };
    },
    saveChange() {
      // TODO: API change consume file
      this.isEditing = false;
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
    sameCheck() {
      if (
        this.content.name !== this.contentCached.name ||
        this.content.Category.id !== this.contentCached.Category.id ||
        this.content.amount !== this.contentCached.amount
      ) {
        return false;
      }
      return true;
    },
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
</style>