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
  data(){
    return{
      details:[],
    }
  },
  created(){
    this.getDetailsGift(this.$route.params.id).then(({data})=>{
      this.details = data.gift;
    });
  }
};
</script>

<style>
.details{
  margin-left: 10rem;
  display: flex;
  flex-direction: column;
}
.product-description{
  font-weight: bold;
  font-size: 1.5rem;
}
.details a {
  margin-top:2rem;
  text-decoration: none;
  color:red;
  font-size: 1.5rem;
}
.details a:hover{
  color:green;
}

</style>
