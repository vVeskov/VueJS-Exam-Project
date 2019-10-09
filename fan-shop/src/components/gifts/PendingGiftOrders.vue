<template>
  <div class="main-wrapper">
    <section class="main-pending-orders" v-for="(order,index) in orders" :key="order._id">
      <div class="pending-orders">
        <div class="pending-order-user">
          <span>User:</span>
          <span class="single-username-and-sum">{{order.user}}</span>
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
          >{{ord}}
          </div>
        </div>
        <div class="pending-order-sum">
          <span>Total sum:</span>
          <span class="single-username-and-sum">{{order.totalSum}} USD</span>
        </div>
        <button type="submit" class="checkout" @click="deleteUserOrder(order._id,index)">Checkout</button>
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
    return {
      allData: [],
      orders: []
    };
  },
  mixins: [giftService],
  created() {
    this.getUsersOrders().then(({ data }) => {
      this.allData = data["orders"];
      if (this.allData) {
        for (let i = 0; i < this.allData.length; i++) {
          for (let j = 0; j < this.allData[i].giftsName.length; j++) {
            let giftQnt = this.allData[i].giftsName[j].slice(-1);
            this.allData[i].giftsName[j] = this.allData[i].giftsName[j].substr(
              0,
              this.allData[i].giftsName[j].length - 1
            );
            this.allData[i].giftsName[j] =
              this.allData[i].giftsName[j] + " - " + "Quantity: " + giftQnt;
          }
        }
      }
      this.orders = this.allData;
    });
  },
  methods: {
    deleteUserOrder(id,index) {
      this.approveUserOrder(id).then(
        this.orders.splice(index,1)
      );
    }
  }
};
</script>

<style scoped>
.main-wrapper{
  padding-bottom: 5rem;
}
.main-pending-orders {
  padding: 2rem 0 0 5rem;
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