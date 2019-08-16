<template>
  <main>
    <h1>Hello username, welcome to our Gift Shop !</h1>
    <section>
      <div class="single-gift" v-for="gift in gifts" :key="gift._id" >
        <img
          :src="gift.imageUrl"
          alt="giftImage"
        />

        <span class="gift-name">{{gift.giftName}}</span>
        <div class="gift-details">
          <span class="gift-price">{{gift.price}}</span>
          <div class="btn-wrapper">
            <template v-if="isAdmin">
              <a class="editButton">Edit</a>
              <button class="deleteButton" type="submit">Delete</button>
            </template>
            <template v-else>
              <div class="btn-wrapper">
                <a class="orderBtn1">Order</a>
                <a class="orderBtn">Details</a>
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
  mixins: [giftService],
  
};
</script>

<style scoped>
</style>
