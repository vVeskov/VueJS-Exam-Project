<template>
  <div class="edit-gift">
    <h1>Edit Gift</h1>
    <form @submit.prevent="editGift">
      <span>Gift name</span>
      <input
        v-model="$v.giftName.$model"
        type="text"
        :placeholder="details.description"
        id="giftName"
      />

      <span>Description</span>
      <input
        v-model="$v.description.$model"
        :placeholder="details.description"
        type="text"
        name="description"
      />

      <span>Image Url</span>
      <input
        v-model="$v.imageUrl.$model"
        :placeholder="details.imageUrl"
        type="text"
        name="imageUrl"
      />

      <span>Price</span>
      <input v-model="$v.price.$model" :placeholder="details.price" type="text" name="price" />
      <button type="submit">Edit gift</button>
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
  mixins: [giftService],
  validations: {
    giftName: { required },
    description: { required },
    imageUrl: { required },
    price: { required }
  },
  created() {
    this.getDetailsGift(this.$route.params.id)
    
  },
  methods: {
    editGift() {
      this.edit(
        this.giftName,
        this.description,
        this.imageUrl,
        this.price,
        this.$route.params.id
      ).then(res => {
          this.$router.push('/');
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

.edit-gift {
  margin: 1rem 0 0 3rem;
}

.edit-gift form {
  display: flex;
  flex-direction: column;
}
.edit-gift form span,
.edit-gift form input,
.edit-gift form div,
.edit-gift form {
  margin-bottom: 0.5rem;
}
.edit-gift span {
  font-weight: bold;
  font-size: 1.5rem;
}
.edit-gift input {
  max-width: 30%;
  font-size: 1.2rem;
}
.edit-gift div {
  color: red;
  font-size: 1.2rem;
}
</style>