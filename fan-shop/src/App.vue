<template>
<div>
  <navigation></navigation>
  <router-view></router-view>
  <Footer></Footer>
</div>
</template>
<script>
import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";

export default {
  components: {
    Navigation,
    Footer
  }
};
</script>

<style>
body{
  margin:0;
}
</style>
