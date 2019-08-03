<template>
  <div class="dock">
    <div class="dock-content">
      <DockItem v-for="a in apps" :key="a.name" :icon="a.icon" :open="a.open" @click="openApp(a.name)"></DockItem>
    </div>
  </div>
</template>

<script>
import DockItem from '@/components/DockItem.vue'

export default {
  name: "Dock",
  methods: {
    openApp(appName) {
      console.log('open', appName)
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
  z-index: 2;
  height: 46px;
}

.dock-content {
  position: relative;
  left: -50%;
  display: flex;
  padding: 5px;
  padding-bottom: 2px;
  background: rgba(255,255,255,.75);
  border: 2px solid #000;
  border-bottom: none;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  transition: all 200ms ease-in-out;
}
</style>
