<template>
  <form @submit.prevent="addToCart">
    <div class="div" v-bind:class="[isActive ? 'on' : 'off']">
      <span class="on">Gift has been added to cart!</span>
    </div>
    <div class="orders-wrapper">
      <div class="productImage">
        <img :src="this.gifts.imageUrl" alt="imageUrl" />
      </div>
      <div class="orders">
        <span class="gift-name">Product</span>
        <span type="text" disabled class="gift-total-price">{{this.gifts.giftName}}</span>
        <span class="gift-name">Price</span>
        <span type="text" disabled class="gift-total-price">{{this.gifts.price}}</span>
        <input
          v-model="$v.giftQnt.$model"
          class="giftQuantity"
          placeholder="1"
          type="number"
          min="1"
        />
        <div class="order-buttons">
          <router-link to="/" class="continue-shopping">Back to menu</router-link>
          <button type="submit" class="checkout">Add to cart</button>
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
      giftQnt: 1,
      isActive: false,
      gifts:{},
    };
  },
  mixins: [giftService],
  created() {
    this.getGiftByDetails(this.$route.params.id).then(({ data }) => {
      this.gifts = data.gift;
    });
  },
  methods: {
    addToCart() {
      this.isActive = true;  
      let data = {};
      data['price'] = this.gifts.price;
      data['giftName'] = this.gifts.giftName;
      this.addToUserCart(data, this.giftQnt);
    }
  },
  validations: {
    giftQnt: { required }
  }
};
</script>
<style scoped>
.off {
  display: none;
}
.on {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 3rem 0 0 10rem;
  color: green;
}
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