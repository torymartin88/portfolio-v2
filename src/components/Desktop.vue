<template>
  <div class="desktop">
    {{windows.length}}
    <h1>My Desktop</h1>
    <button v-on:click="openApp('Sample')">Open Sample</button>
    <button v-on:click="openApp('Calculator')">Open Calculator</button>
    <button v-on:click="openApp('Weather')">Open Weather</button>
    <button v-on:click="openApp('Notepad')">Open Notepad</button>
    <button v-on:click="openApp('Video')">Open Video</button>

    <select>
      <option>First Option</option>
      <option>Second Option</option>
      <option>Third Option</option>
    </select>
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
