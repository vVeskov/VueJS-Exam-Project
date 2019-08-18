<template>
  <div class="container">
    <h1>Sign Up</h1>
    <form @submit.prevent="signUp">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          v-model="$v.username.$model"
          class="form-control"
          id="username"
          placeholder="Please enter your name"
        />
        <div class="alert alert-dark" v-if="!$v.username.required">Please provide your name!</div>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="$v.email.$model"
          type="email"
          class="form-control"
          id="email"
          name="email"
          placeholder="Please enter your email adress"
        />

        <div class="alert alert-dark" v-if="!$v.email.required">Please provide an email address!</div>
        <div class="alert alert-dark" v-if="$v.email.$error">Please provide a correct email address!</div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="$v.password.$model"
          type="password"
          class="form-control"
          id="password"
          placeholder="Please enter your password"
        />
        <div v-if="!$v.password.required" class="alert alert-dark">Please provide a password</div>
        <div v-if="$v.password.$error">Password must be between 5 and 20 characters!</div>
      </div>
      <button type="submit" class="btn-dark" :disabled="$v.$error || !$v.$dirty">Sign Up</button>
    </form>
  </div>
</template>

<script>
import { registerUser } from "@/services/authServices";
import {
  required,
  minLength,
  maxLength,
  email
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      username: "",
      password: "",
      email: ""
    };
  },
  mixins: [registerUser],
  validations: {
    username: {
      required
    },
    password: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(20)
    },
    email: {
      required,
      email
    }
  },
  methods: {
    signUp() {
      this.register(this.username, this.password, this.email).then(res => {
        this.$router.push("/signin");
      });
    }
  }
};
</script>

<style scoped>
.container {
  margin-left: 3rem;
  margin-top: 3rem;
}

.container .form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.container .form-control {
  max-width: 20%;
}

.container label {
  margin-bottom: 0.5rem;
}
.form-group input {
  font-size: 1rem;
}
.container .alert-dark {
  margin-top: 0.25rem;
  font-size: 1.2rem;
  color: #f61900;
}
.btn-dark {
  padding: 0.3rem 1rem;
}

.btn-dark:disabled {
  cursor: not-allowed;
}
</style>
