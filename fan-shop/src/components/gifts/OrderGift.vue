<template>
  <form @submit.prevent="addToCart">
    <div class="orders-wrapper">
      <div class="productImage">
        <img :src="allData.imageUrl" alt="imageUrl" />
      </div>
      <div class="orders">
        <span class="gift-name">Product</span>
        <span type="text" disabled class="gift-total-price">{{this.allData.giftName}}</span>
        <span class="gift-name">Price</span>
        <span type="text" disabled class="gift-total-price">{{this.allData.price}}</span>
        <input v-model="$v.giftQnt.$model" class="giftQuantity" placeholder="1" type="number" min="1" />
        <div class="order-buttons">
          <router-link to="/" class="continue-shopping">Back to menu</router-link>
          <button class="checkout">Add to cart</button>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { giftService } from "@/services/giftServices";
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      allData: {},
      giftQnt: 1
    };
  },
  mixins: [giftService],
  created() {
    this.getGiftByDetails(this.$route.params.id).then(
      ({ data }) => 
         this.allData = data['gift']
    
    );
  },
  methods: {
    addToCart() {
      this.addToUserCart(this.allData,this.giftQnt)
      .then(this.$router.push('/'));
    }
  },
  validations: { 
    giftQnt: { required },
  
  }
};
</script>
<style scoped>
.orders-wrapper {
  padding: 5rem 0 0 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.orders {
  display: flex;
  flex-direction: column;
}
.orders span,
.orders input {
  font-size: 1.2rem;
  padding: 0.4rem 0;
}
.order-buttons {
  margin-top: 0.8rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.order-buttons a {
  text-decoration: none;
}
.order-buttons a,
.order-buttons button {
  background: black;
  color: white;
  padding: 0.4rem 0.6rem;
  border: none;
  border-radius: 0.2rem;
}
.order-buttons a:hover {
  color: red;
}
.order-buttons button:hover {
  color: green;
}
.gift-name {
  background: #707070;
  border-radius: 0.3rem;
}
.gift-total-price {
  font-weight: bold;
}
</style>