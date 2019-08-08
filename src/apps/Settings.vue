<template>
  <div class="settings">

    <div class="row center">
      <div class="column group-container pattern">
        <div class="desktop-pattern">
          <div v-for="(row, i) in backgroundPattern" :key="i" class="pattern-row">
            <div
              v-for="(col, j) in row"
              :key="j"
              :style="cellStyle(col)"
              @click="cellClick(i, j, col)"
            ></div>
          </div>
        </div>
        <h4 class="group-header center">Desktop Pattern</h4>
      </div>

      <div class="column group-container theme">
        <div class="color-pickers">
          <ColorPicker v-model="themeColor" :palette="palette" />
          <h4 class="group-header center">Color Theme</h4>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="column group-container danger">
        <h4 class="text-error margin-bottom">Danger Zone</h4>
        <a href="#" @click="resetCache">Reset cache &amp; reload</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Compact } from 'vue-color';
import { hexToRgb } from '@/utils';

export default {
  name: "Settings",
  data() {
    return {
      backgroundPattern: this.$store.state.desktop.backgroundPattern,
    };
  },
  computed: {
    palette() {
      return this.$store.getters.getColorPallete;
    },
    backgroundPatternState() {
      return this.$store.state.desktop.backgroundPattern;
    },
    themeColor: {
      get() {
        return this.$store.state.desktop.themeColor;
      },
      set(value) {
        this.$store.dispatch('setThemeColor', value.hex);
      }
    },
    themeSecondaryColor() {
      return this.$store.getters.getThemeSecondaryColor;
    }
  },
  methods: {
    cellClick(row, col, value) {
      // toggle cell
      this.$store.dispatch('setBackgroundPatternCell', { row: row, col: col, value: (value === 0) ? 1 : 0})
    },
    cellStyle(col) {
      let color = !col ? this.themeColor : this.themeSecondaryColor
      let colorRGB = hexToRgb(color)
      
      return {
        background: `rgb(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b})`
      }
    },
    resetCache() {
      localStorage.removeItem('vuex')
      location.reload();
    }
  },
  components: {
    ColorPicker: Compact
  }
};
</script>

<style lang="stylus">
.settings {
  .row {
    display: flex;
    
    &.center {
      justify-content center;
    }
  }

  .column {
    border: 2px solid black;
    padding: 5px;

    h4 {
      font-alternate()
      font-size: 12px;
      margin: 5px 0 0 0;

      &.center {
        text-align center
      }

      &.margin-bottom {
        margin: 0 0 5px 0;
      }
    }
    
    &.pattern {
      padding-left 8px
      padding-right 8px
    }

    &.theme {
      flex-grow: 1;
    }

    &.danger {
      flex-grow: 1;
    }
  }


  .desktop-pattern {
    width: 98px;
    border-mixin()
  }

  .pattern-row {
    display: flex;

    div {
      width: 12px;
      height: 12px;
      border-mixin();
    }
  }

  .vc-compact {
    box-shadow: none;
    background: none;
    width: auto;
    padding: 0;
    border-radius: 0;
  }

  .vc-compact-colors {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .vc-compact-color-item:last-child {
    float: none;
    margin-right: 0;
  }

  .vc-compact-dot {
    background: $pepper500;

    .theme-black & {
      background: $pepper100;  
    }
  }
}
</style>
