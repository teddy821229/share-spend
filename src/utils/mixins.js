import moment from 'moment'

export const moneyFilter = {
  filters: {
    moneyFilter(amount) {
      // 好醜
      let thousand = 0
      let rest = 0
      let negative = amount < 0
      let filterAmount = ''

      if (negative) {
        amount *= -1
        filterAmount = '- '
      }

      if (amount < 1000 && amount >= 0) {
        filterAmount += "$ " + amount
        return filterAmount;
      }


      if (amount >= 1000) {
        thousand = Math.floor(amount / 1000);
        rest = amount - thousand * 1000;
      }

      rest = String(rest)

      while (rest.length < 3) {
        rest = '0' + rest
      }




      filterAmount += "$ " + thousand + "," + rest;
      return filterAmount;
    },
  }
}

export const imgFilter = {
  filters: {
    defaultImage(image) {
      return image || require("./../assets/image/defaultAvatar.jpeg");
    },
  }
}

export const timeFilter = {
  filters: {
    exactTime(time) {
      if(!time) {
        return '-'
      }
      
      return moment(time).format('MM-DD-YYYY')
    }
  }
}