export const moneyFilter = {
  filters: {
    moneyFilter(amount) {
      // 好醜
      let thousand = 0;
      let rest = 0;
      let negative = false

      if (amount < 1000 && amount >= 0) {
        return "$ " + amount;
      }

      if(amount < 0) {
        amount *= -1
        negative = true
      }

      if (amount >= 1000) {
        thousand = Math.floor(amount / 1000);
        rest = amount - thousand * 1000;
      }

      rest = String(rest)

      while(rest.length < 3) {
        rest = '0' + rest
      }

      let filterAmount = ''

      if(negative) {
        filterAmount = '-'
      }

      filterAmount += "$ " + thousand + "," + rest;
      return filterAmount;
    },
  }
}