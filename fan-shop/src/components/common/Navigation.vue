<template>
  <header>
    <nav class="navigation">
      <h2>Football Fan Shop</h2>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <template v-if="isAuthenticated && !isAdmin">
          <li>
            <a href="/myOrders">My Orders</a>
          </li>
          <li>
            <a href="/gift/cart">Cart</a>
          </li>
        </template>
        <template v-if="!isAuthenticated">
          <li>
            <a href="/signin">Sign In</a>
          </li>
          <li>
            <a href="/signup">Sign Up</a>
          </li>
        </template>
        <template v-if="isAdmin">
          <li>
            <a href="/gift/create">Create Gift</a>
          </li>
          <li>
            <a href="/gift/pending">Pending Orders</a>
          </li>
        </template>
        <li v-if="isAuthenticated">
          <a>Logout</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style>
</style>
