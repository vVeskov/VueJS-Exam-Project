<template>
  <main>
    <h2 v-if="username">Hello {{username}}, welcome to our Fan Shop !</h2>
    <section>
      <div class="single-gift" v-for="gift in gifts" :key="gift._id">
        <img :src="gift.imageUrl" alt="giftImage" />

        <span class="gift-name">{{gift.giftName}}</span>
        <div class="gift-details">
          <span class="gift-price">{{gift.price}}</span>
          <div class="btn-wrapper">
            <template v-if="isAdmin">
              <router-link to="/" class="editButton">Edit</router-link>
              <button class="deleteButton" type="submit">Delete</button>
            </template>
            <template v-else>
              <div class="btn-wrapper">
                <a class="orderBtn1">Order</a>
                <router-link
                  :to="{name:'detailsGift',params: {id:gift._id}}"
                  class="orderBtn"
                  tag="button"
                >Details</router-link>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { giftService } from "@/services/giftServices";
export default {
  data() {
    return {
      username: ""
    };
  },
  mixins: [giftService],
  created() {
    this.getAllGifts();
    let user = localStorage.getItem("username");
    if (user !== null) {
      this.username = user;
    }
    console.log(this.username);
  }
};
</script>

<style scoped>
</style>
