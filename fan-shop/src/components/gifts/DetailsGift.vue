<template>
  <div class="details">
    <h1>Details</h1>
    <div class="details-img">
      <img :src="details.imageUrl" />
    </div>
    <p class="product-description">{{details.description}}</p>
    <router-link to="/" class="continue-shopping1">Back to menu</router-link>
  </div>
</template>

<script>
import { giftService } from "@/services/giftServices";

export default {
  mixins: [giftService],
  created(){
    this.getDetailsGift(this.$route.params.id);
  }
};
</script>

<style>
</style>
