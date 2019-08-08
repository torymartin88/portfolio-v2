<template>
  <div class="dock" :class="dockClass">
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
import { mapGetters } from 'vuex'
import DockItem from "@/components/DockItem.vue";

export default {
  name: "Dock",
  props: {
    show: Boolean
  },
  methods: {
    openApp(appName) {
      this.$store.dispatch("openWindow", appName);
    }
  },
  computed: {
    windows() {
      return this.$store.state.windows.windows;
    },
    dockClass() {
      return [
        this.show ? "show" : "",
        `theme-${this.themeClass}`
      ].join(" ");
    },
    ...mapGetters({
      themeClass: 'getThemeName',
      apps: 'getDockApps'
    })
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
  transform: translateY(50px);
  transition: transform 200ms ease-out;

  &.show {
    transform: translateY(0)
  }
}

.dock-content {
  position: relative;
  left: -50%;
  display: flex;
  padding: 5px 2px 3px 2px;
  background: $salt300;
  border-mixin();
  border-bottom: none;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  transition: all 250ms ease-in-out;
  box-shadow-inset($salt500, $salt100, $black25)

  // box-shadow: inset 1px 1px 0 rgb(214, 213, 213), inset 2px 2px 0px rgb(255, 255, 255), inset -1px -1px 0 rgba(0, 0, 0, 0.25);

}

// themes
.dock.theme-black {
  .dock-content {
    background: $pepper550;
    box-shadow-inset($pepper500, $pepper400, $black25)
    border-mixin($pepper600);
  }
}
</style>
