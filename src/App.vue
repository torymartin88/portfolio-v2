<template>
  <div id="app">
    <LoadingScreen :show="loading" :progress="loadingProgress" @loaded="loadingDone" />
    <MenuBar :show="!loading" />
    <Dock :show="!loading" />
    <Desktop :show="!loading" />
    <WindowManager :show="!loading" />
    <!-- <router-view /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import LoadingScreen from "@/components/LoadingScreen.vue";
import MenuBar from "@/components/MenuBar.vue";
import Desktop from "@/components/Desktop.vue";
import Dock from "@/components/Dock.vue";
import WindowManager from "@/views/WindowManager.vue";

import loadState from "@/store/utils/loadState"

export default {
  name: "app",
  data() {
    return {
      loading: false,
      loadingProgress: 0
    }
  },
  components: {
    LoadingScreen,
    MenuBar,
    Desktop,
    Dock,
    WindowManager
  },
  created() {
    // start global time
    this.$store.dispatch("time/start");

    // register apps
    this.$store.dispatch("registerApps");

    const self = this;
    // load from cache
    if (!this.$store.initialized) {
      loadState()
      let loading = setInterval(() => {
        let rand = Math.floor(Math.random() * 6) + 1
        self.loadingProgress += (rand >= 100) ? 100 : rand 
        if (self.loadingProgress >= 100) {
          clearInterval(loading)
          self.loading = false;
        }
      }, 50)
    }
  },
  mounted() {
    window.addEventListener('keyup', function(ev) {
        console.log(ev)
    });
  },
  methods: {
    loadingDone() {
      this.loading = false;
    }
  }
};
</script>

<style lang="stylus">
#app {
  border-radius: 10px;
  overflow: hidden;
}
</style>

