<template>
  <div class="menu-bar" :class="menuClass">
    <div class="actions">
      <ul>
        <li class="app-name" v-if="!activeWindow">Desktop</li>
        <li class="app-name" v-if="activeWindow">{{activeWindow.component}}</li>
        <li>File</li>
        <li>Edit</li>
      </ul>
    </div>
    <div class="top-right">
      <div class="fullscreen item" @click="toggleFullscreen()">
        <template v-if="!fullscreen">Go Fullscreen</template>
        <template v-if="fullscreen">Exit Fullscreen</template>
      </div>
      <div class="time item">
        {{time}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "MenuBar",
  props: {
    show: Boolean
  },
  data() {
    return {
      fullscreen: false
    }
  },
  computed: {
    apps() {
      return this.$store.state.apps.apps;
    },
    menuClass() {
      return [
        this.show ? "show" : "",
        `theme-${this.themeClass}`
      ].join(" ");
    },
    ...mapGetters({
      themeClass: 'getThemeName',
      time: 'time/formattedDate',
      activeWindow: 'getActiveWindow'
    })
  },
  methods: {
    toggleFullscreen() {
      if (this.fullscreen) {
        document.exitFullscreen()
      } else {
        document.body.requestFullscreen()
      }

      this.fullscreen = !this.fullscreen
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
  height: 24px;
  padding: 0 5px 0 0;
  z-index: 2;
  transform: translateY(-28px);
  transition: transform 200ms ease-out;

  &.show {
    transform: translateY(0)
  }
}

.actions {
  flex-grow: 1;
  padding-left: 10px;

  li {
    font-weight: 100;
  }

  .app-name {
    font-style: normal
  }
}

.top-right {
  display: flex;

  .item {
    padding: 5px;
    &:hover {
      background: rgba(0,0,0,.1);
      cursor: pointer;
    }
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: inline-block;
  font-size: 16px;
  padding: 5px;
  font-base();

  &:hover {
    background: rgba(0,0,0,.1);
    cursor: pointer;
  }
}

// themes
.menu-bar.theme-black {
  background: $pepper500;
  color: $salt100;
  box-shadow: 0 1px 1px 0 $pepper600, inset 0 2px 1px 0 $pepper550;
}
</style>
