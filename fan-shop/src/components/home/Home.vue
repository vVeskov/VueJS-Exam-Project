<template>
  <main>
    <h1 v-if="username">Hello {{username}}, welcome to our Fan Shop !</h1>
    <section>
      <div class="single-gift" v-for="gift in gifts" :key="gift._id">
        <img :src="gift.imageUrl" alt="giftImage" />

        <span class="gift-name">{{gift.giftName}}</span>
        <div class="gift-details">
          <span class="gift-price">{{gift.price}}</span>
          <div class="btn-wrapper">
            <template v-if="isAdmin">
              <router-link :to="{name:'editGift',params:{id:gift._id}}" class="editButton">Edit</router-link>
              <button @click="deleteGift(gift._id)" class="deleteButton" type="submit">Delete</button>
            </template>
            <template v-else>
              <div class="btn-wrapper2">
                <router-link :to="{name:'orderGift',params:{id:gift._id}}" class="orderBtn1">Order</router-link>
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
  },
  methods: {
    deleteGift(id) {
      this.deleteHomePageGift(id);
      this.$router.go();
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}

main section {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

main section .single-gift {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-bottom: 1rem;
  margin: 3rem 1rem 0 1rem;
}
main section img {
  width: 256px;
  height: 256px;
}
main section .single-gift:hover {
  box-shadow: 0 0 1rem 0.1rem rgba(0, 0, 0, 0.3);
}
.single-gift .gift-details {
  display: flex;
  flex-direction: column;
}
.gift-name {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1.5rem;
  color: #192c40;
}
.gift-price {
  font-size: 1rem;
  margin-bottom: 1rem;
}
.btn-wrapper2{
  width: 100%;
}
.btn-wrapper,
.btn-wrapper2 {
  display: flex;
  justify-content: space-around;
}
.btn-wrapper a,
.btn-wrapper button,
.btn-wrapper2 a,
.btn-wrapper2 button {
  background: #ffffff;
  font-size: 1.2rem;
  color: #212529;
  text-decoration: none;
  border: 1px solid black;
  padding: 0.2rem 0.7rem;
}
.btn-wrapper a:hover,
.btn-wrapper button:hover,
.btn-wrapper2 a:hover,
.btn-wrapper2 button:hover {
  background: black;
  color: white;
}
</style>
