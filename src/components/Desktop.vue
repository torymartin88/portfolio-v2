<template>
  <div class="desktop">
    {{windows.length}}
    <h1>My Desktop</h1>
    <button v-on:click="openCalculator">Open Calculator</button>
  </div>
</template>

<script>
export default {
  name: "Desktop",
  methods: {
    openCalculator() {
      this.$store.dispatch("openWindow", "Calculator2");
    }
  },
  computed: {
    windows() {
      return this.$store.state.windows;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.desktop {
  background: #63639C;
  position: absolute;
  top: 24px;
  left: 0;
  height: calc(100vh - 24px);
  width: 100vw;
  z-index: 1;
}
</style>
