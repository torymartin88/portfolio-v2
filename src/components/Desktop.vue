<template>
  <div class="desktop" :class="{ show: show }" @contextmenu="openContextMenu" @click="desktopClick($event)">
    <div class="desktop-icons">
      <vue-draggable-resizable v-for="i in icons" :key="i.id"
        :x="i.x" :y="i.y" :z="1"
        :resizable="false" :parent="true" :grid="iconGrid"
        :w="80" :h="60"
        class-name="icon"
      >
        <DesktopIcon
          :id="i.id"
          :icon="i.icon"
          :iconColor="iconColor"
          :text="i.name"
          :selected="i.selected"
          :action="i.action"
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
      windowHeight: 0,
      icons: [{
        id: 1,
        name: 'intro.txt',
        x: 20, y: 0,
        icon: { name: 'file-alt', swapOpacity: true },
        selected: false
      },{
        id: 2,
        name: 'Video.avi',
        x: 80, y: 0,
        icon: { name: 'video', swapOpacity: true },
        selected: false
      },{
        id: 3,
        name: 'Projects',
        x: 80, y: 80,
        icon: { name: 'folder', swapOpacity: true },
        selected: false,
        action: {
          appName: 'Finder',
          args: {
            path: 'projects'
          }
        }
      }]
    };
  },
  props: {
    show: Boolean
  },
  methods: {
    openApp(appName) {
      this.$store.dispatch("openWindow", { appName: appName, args: '' });
    },
    openContextMenu(e) {
      console.log("right click", e);
    },
    desktopClick(e) {
      // deselect all icons if desktop actually clicked
      if (e.srcElement.classList.contains('desktop') || e.srcElement.classList.contains('desktop-icons')) {
        deselectAllIcons(this.icons)
      }
    },
    iconClick(clickObj) {
      deselectAllIcons(this.icons)

      // remove all other icon highlights
      this.icons[clickObj.id-1].selected = clickObj.selected
    },
    iconDblClick(clickObj) {
      deselectAllIcons(this.icons)
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

function deselectAllIcons(icons) {
  for (let icon of icons) {
    icon.selected = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.desktop {
  background: $pepper500;
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

#desktop-background {
  border-radius: $app-border-radius;
}
</style>
