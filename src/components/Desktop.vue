<template>
  <div class="desktop" @contextmenu="openContextMenu">

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
  },
  methods: {
    openContextMenu(e) {
      console.log('right click')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.desktop {
  background: #63639C;
  position: absolute;
  top: 26px;
  left: 0;
  height: calc(100vh - 26px);
  width: 100vw;
  z-index: 1;
}
</style>
