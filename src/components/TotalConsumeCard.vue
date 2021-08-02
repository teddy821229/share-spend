<template>
  <div class="amount-container">
    <div class="total-title">總消費：</div>
    <div class="total-amount">{{ totalAmount | moneyFilter }}</div>
    <div class="ratio-container">
      <div class="progress">
        <div
          v-for="category in categories"
          :key="category.id"
          class="progress-bar"
          :class="category.code"
          role="progressbar"
          :style="{ width: category.ratio }"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
    <div class="ratio-table">
      <div
        class="category-detail"
        v-for="category in categories"
        :key="category.id"
        :class="category.code"
      >
        <div class="category-name">
          {{ category.name }}
        </div>
        <div class="category-total">
          {{ category.total | moneyFilter }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TotalConsumeCard",
  props: {
    consumes: {
      type: Array,
      required: true,
    },
  },
  watch: {
    consumes: {
      handler: function () {
        this.calculateTotal();
      },
      deep: true,
    },
  },
  created() {
    this.calculateTotal();
  },
  data() {
    return {
      categories: [
        {
          id: 1,
          code: "food",
          name: "食物",
          total: 0,
          ratio: "0%",
        },
        {
          id: 2,
          code: "life",
          name: "生活",
          total: 0,
          ratio: "0%",
        },
        {
          id: 3,
          code: "entertainment",
          name: "娛樂",
          total: 0,
          ratio: "0%",
        },
        {
          id: 4,
          code: "transport",
          name: "交通",
          total: 0,
          ratio: "0%",
        },
        {
          id: 5,
          code: "other",
          name: "其他",
          total: 0,
          ratio: "0%",
        },
      ],
    };
  },
  methods: {
    calculateTotal() {
      this.cleanTotal()
      this.consumes.forEach((consume) => {
        this.categories.map((category) => {
          if (consume.Category.code === category.code) {
            category.total += consume.amount;
          }
        });
      });
      this.calculateRatio();
    },
    calculateRatio() {
      this.categories.forEach((category) => {
        category.ratio = (category.total / this.totalAmount) * 100 + "%";
      });
    },
    cleanTotal() {
      this.categories.forEach(category => category.total = 0)
    }
  },
  computed: {
    totalAmount() {
      let total = 0;
      this.categories.forEach((category) => {
        total += category.total;
      });
      return total;
    },
  },
  filters: {
    moneyFilter(amount) {
      let thousand = 0;
      let rest = 0;
      if (amount < 1000) {
        return "$ " + amount;
      }
      if (amount >= 1000) {
        thousand = Math.floor(amount / 1000);
        rest = amount - thousand * 1000;
      }
      let filterAmount = "$ " + thousand + "," + rest;
      return filterAmount;
    },
  },
};
</script>

<style scoped>
.amount-container {
  width: 95%;
  max-width: 650px;
  margin: 20px auto 40px;
  padding: 20px ;

  color: #6784b4;
  box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}
/* TODO:setting height */
.total-title {
  font-size: 20px;
  font-weight: 700;
}

.total-amount {
  height: 200px;
  margin-bottom: 10px;

  font-size: 80px;
  font-weight: 700;

  text-align: center;
  line-height: 200px;
}

.progress {
  width: 90%;
  height: 50px;

  margin: 0 auto 20px;
}

.food {
  color:#bb2020 ;
  background: #bb2020;
}

.entertainment {
  color: #d9aa1e;
  background: #d9aa1e;
}

.transport {
  color: #3eb595 ;
  background: #3eb595;
}

.life {
  color: #ed7a4d;
  background: #ed7a4d;
}

.other {
  color: #6784b4;
  background: #6784b4;
}



.ratio-table {
  display: flex;
  padding: 10px 0 10px;
}

.category-detail {
  position: relative;

  flex-grow: 1;
  text-align: center;

  background: transparent;
}

.category-detail .category-name {
  font-weight: 700;
}

/* .ratio-table .category-detail::before {
  position: absolute;
  left: 5px;
  top: 2px;

  content: "";

  height: 20px;
  width: 4px;
}

.ratio-table .food::before {
  background: #bb2020;
}

.ratio-table .entertainment::before {
  background: #d9aa1e;
}

.ratio-table .transport::before {
  background: #3eb595;
}

.ratio-table .life::before {
  background: #ed7a4d;
}

.ratio-table .other::before {
  background: #6784b4;
} */
</style>