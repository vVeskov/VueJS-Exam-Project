<template>
  <div>
    <h2 class="class-title">My Cart</h2>
    <main v-for="(gift,index) in userGifts" :key="gift._id">
      <div class="cart">
        <section class="table-head">
          <div class="gift-items">
            <span>Product:</span>
            <span class="productName">{{gift.giftName}}</span>
          </div>
          <div class="gift-items">
            <span>Quantity:</span>
            <span class="productQnt">{{gift.giftQnt}}</span>
          </div>
          <div class="gift-items">
            <span>Price:</span>
            <span class="order-price">{{gift.price}} USD</span>
          </div>
          <div class="user-cart">
            <button
              @click="removeGift(gift.user,gift.giftName,index,gift.price)"
              type="submit"
              class="deleteChoosenGift"
            >Remove gift</button>
          </div>
        </section>
      </div>
    </main>
    <div class="user-sum" v-if="userGifts.length">
      <span class="totalSum">TotalSum:</span>
      <span class="totalSumValue">{{totalSum}} USD</span>
    </div>
    <div class="cart-buttons">
      <router-link to="/" v-if="userGifts.length" class="continue-shoping">Continue shoping</router-link>
      <button
        v-if="userGifts.length"
        @click="removeUserCartAndAddPendingOrders(userGifts,totalSum)"
        type="submit"
        class="buy-product"
      >Buy selected gifts</button>
    </div>
    <div>
      <div class="noCartPage" v-if="!userGifts.length">
        <h2 class="noGifts">Sorry, you have no items in the cart.</h2>
        <router-link class="backBtn" to="/">Back to menu</router-link>
      </div>
    </div>
  </div>
</template>

 
</template>

<script>
import { giftService } from "@/services/giftServices";
export default {
  data() {
    return {
      userGifts: [],
      totalSum: 0
    };
  },
  methods: {
    removeGift(user, giftName,index,giftPrice) { 
      
      this.removeGiftFromCart(user, giftName).then(
        this.userGifts.splice(index,1)
       
      ).then(this.totalSum-=giftPrice);
    },
    removeUserCartAndAddPendingOrders(userGifts, totalSum) {
      console.log(userGifts, totalSum);
      let dataToSend = {};
      let giftsArr = [];
      userGifts.forEach(order => {
        let stringQnt = order.giftQnt.toString();
        let productNameAndProductQnt = order.giftName.concat(stringQnt);
        giftsArr.push(productNameAndProductQnt);
      });
      let user = localStorage.getItem("username");
      dataToSend = {
        giftsNameAndQnt: giftsArr,
        totalSum: totalSum,
        user: user
      };
      this.addPendingOrders(dataToSend);
      this.removeUserOrders(user).then(this.$router.push("/"));
    }
  },
  mixins: [giftService],
  created() {
    this.getUserCartGifts().then(({ data }) => {
      let allOrders = data["order"];
      let currentUser = localStorage.getItem("username");
      let currentUserOrders = [];
      allOrders.forEach(o => {
        if (o.user === currentUser) {
          currentUserOrders.push(o);
        }
      });
      this.userGifts = currentUserOrders;
      console.log(this.userGifts);
      let currSum = [];
      let allSum = 0;
      let giftQnt = [];
      let singleSum = [];
      let giftTimeQntSum = [];
      currentUserOrders.forEach(order => {
        giftQnt.push(order.giftQnt);
      });
      currentUserOrders.forEach(order => {
        currSum.push(order.price);
      });
      
      currSum.forEach(sum => {
        sum = sum.slice(0, -3);
        sum = Number(sum);
        singleSum.push(sum);
      });
      for(let i = 0;i< this.userGifts.length;i++){
        this.userGifts[i].price = singleSum[i];
        this.userGifts[i].price *= this.userGifts[i].giftQnt; 
      }
      for (let index = 0; index < singleSum.length; index++) {
        let s = singleSum[index] * giftQnt[index];
        giftTimeQntSum.push(s);
        allSum += s;
      }
      this.totalSum = allSum;
      for (let i = 0; i < this.gifts.length; i++) {
        this.gifts[i]["price"] = giftTimeQntSum[i];
      }
      if (this.gifts.length !== 0) {
        this.hasGifts = true;
      } else {
        this.hasGifts = false;
      }
    });
  }
};
</script>

<style scoped>
.user-sum,
.cart-buttons {
  padding-left: 4rem;
}
.cart {
  display: flex;
  flex-direction: column;
}
main {
  padding: 0rem 0 0 4rem;
}
.class-title {
  padding: 0rem 0 0 4rem;
}
.gift-items span {
  margin: 0 0.6rem 2rem 0;
}
.gift-items,
.totalSum {
  margin-bottom: 0.4rem;
  font-size: 1.4rem;
}
.productName,
.productQnt,
.order-price,
.totalSumValue {
  font-weight: bold;
  background: #eaeaea;
}
.totalSumValue {
  font-size: 1.4rem;
  background: #eaeaea;
  font-weight: bold;
}
.table-head {
  margin-bottom: 2rem;
  border-bottom: 2px solid black;
}
.user-cart {
  padding-bottom: 0.7rem;
}
.user-cart button {
  border-radius: 0.3rem;
  padding: 0.2rem 0.7rem;
  color: #f80000;
}
.user-cart button:hover {
  background: black;
  color: white;
}
.cart-buttons {
  margin-top: 1.5rem;
}
.continue-shoping,
.buy-product {
  text-decoration: none;
  margin-right: 2rem;
  border: 1px solid black;
  color: black;
  padding: 0.3rem 0.7rem;
  border-radius: 0.3rem;
  background: #f2e5ca;
}
.continue-shoping:hover,
.buy-product:hover {
  background: #eaeaea;
  color: #f80000;
}
.noCartPage {
  margin-left: 4rem;
}
.backBtn {
  margin-top: 2rem;
  text-decoration: none;
  color: red;
  font-size: 1.5rem;
}
.backBtn:hover {
  color: green;
}
</style>