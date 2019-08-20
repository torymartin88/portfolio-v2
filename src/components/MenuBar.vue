<template>
  <div class="menu-bar" :class="menuClass">
    <div class="actions">
      <div class="action">
        <svg
          width="15px"
          height="15px"
          viewBox="0 0 15 15"
        >
          <!-- <circle id="Oval-Copy-2" cx="42" cy="42" r="42" /> -->
          <rect id="Rectangle" fill="#000000" x="0" y="0" width="15" height="15" rx="7.5"></rect>
          <rect id="Rectangle" fill="#FFFFFF" x="4" y="2" width="7" height="1"></rect>
          <rect id="Rectangle-Copy" fill="#FFFFFF" x="7" y="3" width="1" height="7"></rect>
          <rect id="Rectangle-Copy-2" fill="#FFFFFF" x="4" y="6" width="1" height="7"></rect>
          <rect id="Rectangle-Copy-3" fill="#FFFFFF" x="10" y="6" width="1" height="7"></rect>
          <rect id="Rectangle-Copy-4" fill="#FFFFFF" x="9" y="7" width="1" height="1"></rect>
          <rect id="Rectangle-Copy-5" fill="#FFFFFF" x="8" y="8" width="1" height="1"></rect>
          <rect id="Rectangle-Copy-6" fill="#FFFFFF" x="6" y="8" width="1" height="1"></rect>
          <rect id="Rectangle-Copy-7" fill="#FFFFFF" x="5" y="7" width="1" height="1"></rect>
        </svg>
      </div>
      <div class="action">File</div>
      <div class="action">Edit</div>
    </div>
    <div class="top-right">
      <div class="fullscreen item" @click="toggleFullscreen()">
        <template v-if="!fullscreen">Go Fullscreen</template>
        <template v-if="fullscreen">Exit Fullscreen</template>
      </div>
      <div class="time item">{{time}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MenuBar",
  props: {
    show: Boolean
  },
  data() {
    return {
      fullscreen: false
    };
  },
  computed: {
    apps() {
      return this.$store.state.apps.apps;
    },
    menuClass() {
      return [this.show ? "show" : "", `theme-${this.themeClass}`].join(" ");
    },
    ...mapGetters({
      themeClass: "getThemeName",
      time: "time/formattedDate",
      activeWindow: "getActiveWindow"
    })
  },
  methods: {
    toggleFullscreen() {
      if (this.fullscreen) {
        document.exitFullscreen();
      } else {
        document.body.requestFullscreen();
      }

      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.menu-bar {
  position: absolute;
  width: 100vw;
  display: flex;
  align-items: center;
  background: $salt400;
  box-shadow: 0 1px 1px 0 $black50, inset 0 2px 1px 0 $salt100;
  height: $menu-bar-height;
  padding: 0 5px 0 0;
  z-index: 2;
  transform: translateY(-28px);
  transition: transform 200ms ease-out;
  border-top-left-radius: $app-border-radius;
  border-top-right-radius: $app-border-radius;

  &.show {
    transform: translateY(0);
  }
}

.actions {
  flex-grow: 1;
  padding-left: 4px;
  display: flex;
  align-items: center;

  .app-name {
    font-style: normal;
  }
}

.top-right {
  display: flex;

  .item {
    padding: 5px;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
}

.action {
  font-size: 16px;
  padding: 0 6px;
  font-base();
  font-weight: 100;

  svg {
    width: 16px;
    height: 16px;
    fill: $pepper500;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
}

// themes
.menu-bar.theme-black {
  background: $pepper500;
  color: $salt100;
  box-shadow: 0 1px 1px 0 $pepper600, inset 0 2px 1px 0 $pepper550;

  svg  {
    fill: $salt100;
  }
}
</style>
