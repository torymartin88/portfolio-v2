<template>
  <div class="desktop" :class="{ show: show }" @contextmenu="openContextMenu">
    <div class="desktop-icons">
      <vue-draggable-resizable
        :x="20" :y="0" :z="1"
        :resizable="false" :parent="true" :grid="iconGrid"
        :w="80" :h="60"
        class-name="icon"
      >
        <DesktopIcon
          :icon="{ name: 'file-alt', swapOpacity: true }"
          :iconColor="iconColor"
          :text="'intro.txt'"
          @click="iconClick"
          @dblclick="iconDblClick"
        />
      </vue-draggable-resizable>
      <vue-draggable-resizable
        :x="80" :y="0" :z="1"
        :resizable="false" :parent="true" :grid="iconGrid"
        :w="80" :h="60"
        class-name="icon"
      >
        <DesktopIcon
          :icon="{ name: 'video', swapOpacity: false }"
          :iconColor="iconColor"
          :text="'Video v1.avi'"
          @click="iconClick"
          @dblclick="iconDblClick"
        />
      </vue-draggable-resizable>

      <vue-draggable-resizable
        :x="80"
        :y="80"
        :resizable="false"
        :grid="iconGrid"
        :w="80"
        :h="60"
        :z="1"
        :parent="true"
        class-name="icon"
      >
        <DesktopIcon
          :icon="{ name: 'palette', swapOpacity: false }"
          :iconColor="iconColor"
          :text="'Portfolio.html'"
          @click="iconClick"
          @dblclick="iconDblClick"
        />
      </vue-draggable-resizable>
    </div>
    <canvas id="desktop-background" />
  </div>
</template>

<script>
import DesktopIcon from "@/components/DesktopIcon.vue";
import { debounce } from "debounce";
import { generateBackground } from "@/utils";

export default {
  name: "Desktop",
  data() {
    return {
      selectedIcon: null,
      iconGrid: [10, 10],
      backgroundCanvas: null,
      windowWidth: 0,
      windowHeight: 0
    };
  },
  props: {
    show: Boolean
  },
  methods: {
    openApp(appName) {
      this.$store.dispatch("openWindow", appName);
    },
    openContextMenu(e) {
      console.log("right click", e);
    },
    iconClick() {
      console.log("icon click");
    },
    iconDblClick() {
      console.log("icon double click");
    }
  },
  computed: {
    windows() {
      return this.$store.state.windows.windows;
    },
    backgroundPattern() {
      return this.$store.state.desktop.backgroundPattern;
    },
    themeColor() {
      return this.$store.state.desktop.themeColor;
    },
    themeSecondaryColor() {
      return this.$store.getters.getThemeSecondaryColor;
    },
    iconColor() {
      return this.$store.getters.getIconColor;
    }
  },
  watch: {
    backgroundPattern() {
      generateBackground(
        this.backgroundCanvas,
        this.windowWidth,
        this.windowHeight,
        this.backgroundPattern,
        this.themeColor,
        this.themeSecondaryColor
      );
    },
    themeColor: {
      handler: function() {
        generateBackground(
          this.backgroundCanvas,
          this.windowWidth,
          this.windowHeight,
          this.backgroundPattern,
          this.themeColor,
          this.themeSecondaryColor
        );
      },
      deep: true
    }
  },
  mounted() {
    let self = this;

    this.backgroundCanvas = document.getElementById("desktop-background");
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    this.$nextTick(() => {
      window.addEventListener(
        "resize",
        debounce(() => {
          self.windowWidth = window.innerWidth;
          self.windowHeight = window.innerHeight;

          generateBackground(
            self.backgroundCanvas,
            self.windowWidth,
            self.windowHeight,
            self.$store.state.desktop.backgroundPattern,
            self.$store.state.desktop.themeColor,
            self.$store.getters.getThemeSecondaryColor
          );
        }, 200)
      );
    });

    generateBackground(
      this.backgroundCanvas,
      this.windowWidth,
      this.windowHeight,
      this.backgroundPattern,
      this.themeColor,
      this.themeSecondaryColor
    );
  },
  components: {
    DesktopIcon
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.desktop {
  background: gray;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  opacity: 0;
  transition: opacity 200ms ease-out;

  .desktop-icons {
    position: absolute;
    top: 34px;
    width: 100%;
    height: calc(100% - 80px);
    opacity: 0;
    transition: opacity 800ms ease-out;
  }

  &.show {
    opacity: 1;

    .desktop-icons {
      opacity: 1;
    }
  }
}
</style>
