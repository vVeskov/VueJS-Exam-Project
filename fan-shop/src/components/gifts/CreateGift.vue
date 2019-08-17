<template>
  <div class="create-gift">
    <h1>Create Gift</h1>
    <form @submit.prevent="createGift">
      <span>Gift name</span>
      <input v-model="$v.giftName.$model" name="giftName" type="text" placeholder="Enter gift name" />
      <span>Description</span>
      <input v-model="$v.description.$model" type="text" placeholder="Enter gift description" />
      <span>Image Url</span>
      <input v-model="$v.imageUrl.$model" type="text" placeholder="Enter gift image URL" />
      <span>Price</span>
      <input v-model="$v.price.$model" type="text" placeholder="Enter gift price" />
      <button :disabled="$v.$error || !$v.$dirty" type="submit">Create gift</button>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { giftService } from "@/services/giftServices";

export default {
  data() {
    return {
      giftName: "",
      description: "",
      imageUrl: "",
      price: ""
    };
  },
  validations: {
    giftName: { required },
    description: { required },
    imageUrl: { required },
    price: { required },
  },
  mixins: [giftService],
  methods: {
    createGift() {
      this.create(
        this.giftName,
        this.description,
        this.imageUrl,
        this.price
      ).then(res => {
        console.log(res);
        this.$router.push("/");
      });
    }
  }
};
</script>

<style>
</style>
