<template>
  <div class="settings">

    <h5>Desktop Pattern</h5>

    <div class="desktop-pattern-container">
      <div class="desktop-pattern">
        <div v-for="(row, i) in desktopPattern" :key="i" class="pattern-row">
          <div
            v-for="(col, j) in row"
            :key="j"
            :style="cellStyle(col)"
            @click="cellClick(i, j, col)"
          ></div>
        </div>
      </div>

      <div class="color-pickers">
        <p>Primary Color</p>
        <ColorPicker v-model="desktopPrimaryColor" :palette="palette" />

        <p>Secondary Color</p>
        <ColorPicker v-model="desktopSecondaryColor" :palette="palette" />
      </div>
    </div>

    <h5>Danger Zone</h5>
    <a href="#" @click="resetCache">Reset Cache</a>
  </div>
</template>

<script>
import { Compact } from 'vue-color';

export default {
  name: "Settings",
  data() {
    return {
      desktopPattern: this.$store.state.desktopPattern,
      palette: ['#fafbfb', '#20242b', '#2e7ab8', '#bf2e3a', '#3ca666', '#4ec3e0', '#c26b13', '#ba4182', '#deb743']
    };
  },
  computed: {
    desktopPatternState() {
      return this.$store.state.desktopPattern;
    },
    desktopPrimaryColor: {
      get() {
        return this.$store.state.desktopColors.primary;
      },
      set(value) {
        this.$store.dispatch('setDesktopPrimaryColor', value.hex);
      }
      
    },
    desktopSecondaryColor: {
      get() {
        return this.$store.state.desktopColors.secondary;
      },
      set(value) {
        this.$store.dispatch('setDesktopSecondaryColor', value.hex);
      }
    }
  },
  methods: {
    cellClick(row, col, value) {
      // toggle cell
      console.log('click')
      this.$store.dispatch('setDesktopPatternCell', { row: row, col: col, value: (value === 0) ? 1 : 0})
    },
    cellStyle(col) {
      let color = !col ? this.desktopPrimaryColor : this.desktopSecondaryColor

      let colorRGB = hexToRgb(color)
      
      return {
        background: `rgb(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b})`
      }
    },
    resetCache() {
      localStorage.removeItem('vuex')
    }
  },
  components: {
    ColorPicker: Compact
  }
};

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
</script>

<style lang="stylus" scoped>
.settings {
  padding: 10px;
}

.desktop-pattern-container {
  display: flex;

  p {
    font-size: 12px;
    margin: 0;
    margin-bottom: 2px;
    margin-top: 5px;
  }
}

.desktop-pattern {
  width: 98px;
  border: 1px solid black;
}

.pattern-row {
  display: flex;

  div {
    width: 10px;
    height: 10px;
    margin: 1px;
  }
}

.color-pickers {
  margin-left: 10px;
}

.vc-compact {
  box-shadow: none;
  background: none;
  width: auto;
}
</style>
