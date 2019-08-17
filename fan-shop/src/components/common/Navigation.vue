<template>
  <header>
    <nav class="navigation">
      <h2>Football Fan Shop</h2>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <template v-if="isAuthenticated && !isAdmin">
          <li>
            <router-link to="/myOrders">My Orders</router-link>
          </li>
          <li>
            <router-link to="/gift/cart">Cart</router-link>
          </li>
        </template>
        <template v-if="!isAuthenticated">
          <li>
            <router-link to="/signin">Sign In</router-link>
          </li>
          <li>
            <router-link to="/signup">Sign Up</router-link>
          </li>
        </template>
        <template v-if="isAdmin">
          <li>
            <router-link to="/create">Create Gift</router-link>
          </li>
          <li>
            <router-link to="/gift/pending">Pending Orders</router-link>
          </li>
        </template>
        <li v-if="isAuthenticated">
          <button @click="logoutUser()">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logoutUser() {
      localStorage.clear();
      this.$router.go();
      // this.$router.push("/signin");
    }
  }
};
</script>

<style>
</style>
