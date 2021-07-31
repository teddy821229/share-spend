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
          <div class="content-line consume-title">
            消費名稱： <span class="ms-auto"> {{ content.name }}</span>
          </div>
          <div class="content-line category d-flex">
            類別：<span class="ms-auto">{{ content.Category.name }}</span>
          </div>
          <div class="content-line total-amount d-flex">
            總金額： <span class="ms-auto">{{ content.amount }}</span>
          </div>
          <div class="content-line description">備註：</div>
          <div class="content-line pay-container">
            <div class="title pay-title">付款：</div>
            <ul class="pay-list">
              <li
                class="payment"
                v-for="participate in paylist"
                :key="participate.id"
              >
                <div class="img-container">
                  <img :src="participate.avatar | defaultImage" alt="" />
                </div>
                <div class="payment-detail ">
                  {{ participate.name }} : <span class="ms-auto"> {{ participate.pay }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="content-line share-container">
            <div class="title share-title">消費：</div>
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
                  {{ participate.name }} : <span class="ms-auto"> {{ participate.share }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">編輯</button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
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
    };
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

.content-line {
  position: relative;
  padding: 20px;

  border-bottom: 1px solid #ebebeb;

  display: flex;
  /* border-radius: 20px; */
  /* box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2); */

  margin-bottom: 10px;
}

.content-line:last-child {
  border: none;
}

.pay-container, .share-container {
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

.share-detail, .payment-detail {
  flex-grow: 1;
  display: flex;

  font-weight: 700;
  
}
</style>