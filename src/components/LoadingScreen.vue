<template>
  <div class="loading-screen">
    <h1>Loading...</h1>
    <button @click="loadingDone">Done</button>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen",
  props: {
    msg: String
  },
  methods: {
    loadingDone() {
      this.$emit('loaded');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.loading-screen {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: transparent;
  z-index: 9999;
  color: $salt100;

  .show {
    display: block;
  }
}
</style>
