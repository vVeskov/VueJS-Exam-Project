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
            <router-link to="/cart">Cart</router-link>
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
            <router-link to="/pending-orders">Pending Orders</router-link>
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
    }
  }
};
</script>

<style scoped>
header {
  background: #1e1e1e;
}

header h2 {
  color: #dd0031;
  margin-left: 1rem;
}

header nav,
header nav ul {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding-top: 0.5rem;
}

header nav ul li {
  list-style-type: none;
}

header nav ul a {
  color: whitesmoke;
  text-decoration: none;
  list-style: none;
  margin-right: 1.5rem;
  font-size: 1.2rem;
}
header nav ul a:hover {
  color: #dd0031;
  border-bottom: 1px solid #dd0031;
}
</style>
