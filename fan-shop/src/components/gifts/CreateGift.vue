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
    price: { required }
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
        this.$router.push("/");
      });
    }
  }
};
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
button {
  max-width: 10%;
  margin-top: 1rem;
  padding: 0.2rem 0.5rem;
}

.create-gift {
  margin: 1rem 0 0 3rem;
}

.create-gift form {
  display: flex;
  flex-direction: column;
}
.create-gift form span,
.create-gift form input,
.create-gift form div,
.create-gift form {
  margin-bottom: 0.5rem;
}
.create-gift span {
  font-weight: bold;
  font-size: 1.5rem;
}
.create-gift input {
  max-width: 30%;
  font-size: 1.2rem;
}
.create-gift div {
  color: red;
  font-size: 1.2rem;
}
</style>
