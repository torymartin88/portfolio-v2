<template>
  <div class="settings">
    <h5>Desktop Pattern</h5>

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

    <h5>Danger Zone</h5>
    <a href="#" @click="resetCache">Reset Cache</a>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      desktopPattern: this.$store.state.desktopPattern
    };
  },
  computed: {
    desktopPatternState() {
      return this.$store.state.desktopPattern;
    }
  },
  methods: {
    cellClick(row, col, value) {
      // toggle cell
      console.log('click')
      this.$store.dispatch('setDesktopPatternCell', { row: row, col: col, value: (value === 0) ? 1 : 0})
    },
    cellStyle(col) {
      let color = (col) ? 25 : 215
      return {
        background: `rgb(${color}, ${color}, ${color})`
      }
    },
    resetCache() {
      localStorage.removeItem('vuex')
    }
  }
};
</script>

<style lang="stylus" scoped>
.settings {
  padding: 10px;
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
</style>
