<template>
  <main>
    <h1>Hello username, welcome to our Gift Shop !</h1>
    <section>
      <div class="single-gift">
        <img
          src="https://www.pascogifts.com/files/cache/square/files/pasco-voetballen-59ae97b38401d.jpg"
          alt="giftImage"
        />

        <span class="gift-name">Gift name</span>
        <div class="gift-details">
          <span class="gift-price">Gift Price</span>
          <div class="btn-wrapper">
            <template v-if="isAdmin">
              <a class="editButton">Edit</a>
              <button class="deleteButton" type="submit">Delete</button>
            </template>
            <template v-else>
              <div class="btn-wrapper">
                <a class="orderBtn1">Order</a>
                <a class="orderBtn">Details</a>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
