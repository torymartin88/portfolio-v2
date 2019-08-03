<template>
  <div class="desktop">
    <h1>My Desktop</h1>
  </div>
</template>

<script>
export default {
  name: "Desktop",
  methods: {
    openApp(appName) {
      this.$store.dispatch("openWindow", appName);
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
  background: #63639C url('../assets/img/bg.jpg');
  position: absolute;
  top: 24px;
  left: 0;
  height: calc(100vh - 24px);
  width: 100vw;
  z-index: 1;
}
</style>
