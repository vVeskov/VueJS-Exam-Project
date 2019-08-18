<template>
  <div class="container">
    <h1>Sign In</h1>
    <form @submit.prevent="signIn">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="$v.email.$model" type="text" class="form-control" name="email" />
        <div class="alert alert-dark" v-if="!$v.email.required">Please provide an email address!</div>
        <div class="alert alert-dark" v-if="$v.email.$error">Please provide a correct email address!</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="$v.password.$model" class="form-control" name="password" />
        <div v-if="!$v.password.required" class="alert alert-dark">Please provide a password</div>
        <div v-if="$v.password.$error">Password must be between 5 and 20 characters!</div>
      </div>
      <button :disabled="$v.$error || !$v.$dirty" type="submit" class="btn-dark">Sign In</button>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { loginUser } from "@/services/authServices";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(5) }
  },
  mixins: [loginUser],
  methods: {
    signIn() {
      this.login(this.email, this.password).then(user => {
        this.$root.$emit("logged-in", user.authtoken);
        this.$root.$emit("isAdmin", user.username);
        this.$router.push("/");
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
