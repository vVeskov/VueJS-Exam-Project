<template>
  <div>
    <section class="main-pending-orders" v-for="order in orders" :key="order._id">
      <div class="pending-orders">
        <div class="pending-order-user">
          <span>User: </span>
          <span class="single-username-and-sum"> {{order.user}}</span>
        </div>
        <div class="pending-order-date">
          <span>Date order:</span>
          <span>{{order.dateCreated}}</span>
        </div>
        <div class="pending-order-orders">
          <span>User orders:</span>
          <div
            v-for="(ord,index) in order.giftsName"
            :key="index"
            class="pending-orders-gifts"
          >{{ord}}</div>
        </div>
        <div class="pending-order-sum">
          <span>Total sum:</span>
          <span class="single-username-and-sum">{{order.totalSum}} USD</span>
        </div>
        <button type="submit" class="checkout" @click="deleteUserOrder(order._id)">Checkout</button>
      </div>
    </section>
    <div class="noCartPage" v-if="!orders.length">
      <h2 class="noGifts">There are currently no pending orders!</h2>
    </div>
  </div>
</template>

<script>
import { giftService } from "@/services/giftServices";

export default {
  data() {
    return {};
  },
  mixins: [giftService],
  created() {
    this.getUsersOrders();
  },
  methods: {
    deleteUserOrder(id) {
      this.approveUserOrder(id).then(this.$router.go());
    }
  }
};
</script>

<style scoped>
.main-pending-orders {
  padding: 4rem 0 0 5rem;
}
section div {
  margin-bottom: 1rem;
  font-size: 1.4rem;
}
.pending-orders {
  padding-bottom: 1rem;
  border-bottom: 2px solid black;
}
.pending-orders-gifts {
  margin-top: 0.7rem;
}
.single-username-and-sum {
  font-weight: bold;
}
.pending-order-date {
  background: #b1b1b1;
}
.pending-orders-gifts {
  background: #b1b1b1;
}
button {
  padding: 0.4rem 0.7rem;
  border-radius: 0.3rem;
  font-size: 1.2rem;
}
button:hover {
  background: black;
  color: white;
}
.noGifts {
  text-align: center;
}
</style>