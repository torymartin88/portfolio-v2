<template>
  <div class="dock">
    <div class="dock-content">
      <DockItem
        v-for="a in apps"
        :key="a.name"
        :appName="a.prettyName"
        :icon="a.icon"
        :open="a.open"
        @click="openApp(a.name)"
      ></DockItem>
    </div>
  </div>
</template>

<script>
import DockItem from "@/components/DockItem.vue";

export default {
  name: "Dock",
  methods: {
    openApp(appName) {
      this.$store.dispatch("openWindow", appName);
    }
  },
  computed: {
    windows() {
      return this.$store.state.windows;
    },
    apps() {
      return this.$store.state.apps;
    }
  },
  components: {
    DockItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.dock {
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 4;
  height: 46px;
}

.dock-content {
  position: relative;
  left: -50%;
  display: flex;
  padding: 5px 2px 3px 2px;
  background: rgb(236, 236, 236);
  border: 1px solid #000;
  border-bottom: none;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  transition: all 250ms ease-in-out;
  box-shadow: inset 1px 1px 0 rgb(214, 213, 213), inset 2px 2px 0px rgb(255, 255, 255), inset -1px -1px 0 rgba(0, 0, 0, 0.25);
}
</style>
