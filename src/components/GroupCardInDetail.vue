<template>
  <div class="group-card">
    <div class="img-container">
      <img :src="group.image | defaultImage" alt="" />
    </div>

    <div class="group-detail">
      <div class="name-container">{{ group.name }}</div>
      <div class="owed-container">{{ group.userOwed | moneyFilter }}</div>
      <div class="updated-container">
        最後更新: {{ group.updatedDate | exactTime }}
      </div>
    </div>

    <div class="edit-container">
      <div class="background"></div>
      <router-link
        class="btn"
        :to="{ name: 'group-edit', params: { id: group.id } }"
        >編輯群組</router-link
      >
    </div>
  </div>
</template>

<script>
import { moneyFilter } from "./../utils/mixins";
import { timeFilter } from "./../utils/mixins";

export default {
  name: "ConsumeCard",
  mixins: [moneyFilter, timeFilter],
  props: {
    group: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  filters: {
    defaultImage(image) {
      return image || require("./../assets/image/avatarExample.jpeg");
    },
  },
};
</script>

<style scoped>
.group-card {
  position: relative;
  width: 90%;
  max-width: 500px;

  margin: 20px auto;

  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
  border-radius: 20px;

  display: flex;
}

.img-container {
  margin: auto 0 auto 20px;
}

.img-container img {
  object-fit: cover;
  object-position: center center;
  width: 102px;
  height: 102px;
  border: 6px solid #a9b6cc;
  border-radius: 50%;
}

.group-detail {
  flex-grow: 1;

  text-align: center;
  margin: 30px 0 20px;

  color: #6784b4;
}

.name-container {
  line-height: 25px;

  font-size: 20px;
  font-weight: 700;
}

.owed-container {
  margin: 5px 0 10px;
  font-size: 30px;
  font-weight: 700;
}

.updated-container {
  font-size: 14px;
}

.edit-container {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-container .background {
  position: absolute;
  left: 0;
  z-index: 0;

  content: "";

  height: 100%;
  width: 100%;

  background: #000;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.group-card:hover .edit-container .background {
  opacity: 0.2;
}

.edit-container a {
  position: absolute;
  background: #fff;
  z-index: 1;
  opacity: 0;
  padding: 10px 20px;

  font-size: 20px;
  font-weight: 700;
  color: #6784b4;

  border: 3px solid #6784b4;
  border-radius: 15px;

  transition: opacity 0.2s ease-in-out;
}

.group-card:hover .edit-container a {
  opacity: 1;
}

@media screen and (min-width: 576px) {
  .group-card {
    position: relative;
    width: 90%;
    max-width: 500px;

    margin: 20px auto;

    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
    border-radius: 20px;

    display: flex;
  }

  .img-container {
    margin: 40px 0 40px 40px;
  }

  .img-container img {
    object-fit: cover;
    object-position: center center;
    width: 112px;
    height: 112px;
    border: 6px solid #a9b6cc;
    border-radius: 50%;
  }

  .group-detail {
    flex-grow: 1;

    text-align: center;
    margin: 30px 0 20px;

    color: #6784b4;
  }

  .name-container {
    line-height: 25px;

    font-size: 25px;
    font-weight: 700;
  }

  .owed-container {
    margin: 10px 0 20px;
    font-size: 40px;
    font-weight: 700;
  }

  .updated-container {
    font-size: 14px;
  }

  .edit-container {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .edit-container .background {
    position: absolute;
    left: 0;
    z-index: 0;

    content: "";

    height: 100%;
    width: 100%;

    background: #000;
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .group-card:hover .edit-container .background {
    opacity: 0.2;
  }

  .edit-container a {
    position: absolute;
    background: #fff;
    z-index: 1;
    opacity: 0;
    padding: 10px 20px;

    font-size: 20px;
    font-weight: 700;
    color: #6784b4;

    border: 3px solid #6784b4;
    border-radius: 15px;

    transition: opacity 0.2s ease-in-out;
  }

  .group-card:hover .edit-container a {
    opacity: 1;
  }
}
</style>