<template>
  <div id="app">
    <Header />
    <PostComponent />
  </div>
</template>

<script>
import PostComponent from "@/components/PostComponent.vue";
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    PostComponent,
    Header
  }
};
</script>

<style lang="scss">
</style>
