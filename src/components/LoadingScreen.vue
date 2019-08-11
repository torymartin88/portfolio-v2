<template>
  <div class="loading-screen" :class="{ show: show }">
    <div class="container">
      <div class="inner-container">
        <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Artboard-Copy-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <rect id="Rectangle" fill="#000000" x="7" y="0" width="18" height="1"></rect>
              <rect id="Rectangle-Copy-9" fill="#000000" x="9" y="4" width="14" height="1"></rect>
              <rect id="Rectangle-Copy-10" fill="#000000" x="9" y="16" width="14" height="1"></rect>
              <rect id="Rectangle-Copy-5" fill="#000000" x="6" y="20" width="20" height="1"></rect>
              <rect id="Rectangle-Copy-33" fill="#000000" x="18" y="18" width="6" height="1"></rect>
              <rect id="Rectangle-Copy-34" fill="#000000" x="5" y="25" width="10" height="1"></rect>
              <rect id="Rectangle-Copy-35" fill="#000000" x="25" y="25" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-36" fill="#000000" x="23" y="25" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-6" fill="#000000" x="3" y="31" width="26" height="1"></rect>
              <rect id="Rectangle-Copy-13" fill="#000000" x="3" y="22" width="26" height="1"></rect>
              <rect id="Rectangle-Copy" fill="#000000" x="6" y="1" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-16" fill="#000000" x="10" y="6" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-17" fill="#000000" x="12" y="6" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-18" fill="#000000" x="14" y="6" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-19" fill="#000000" x="16" y="6" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-20" fill="#000000" x="18" y="6" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-21" fill="#000000" x="10" y="8" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-22" fill="#000000" x="12" y="8" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-23" fill="#000000" x="14" y="8" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-24" fill="#000000" x="10" y="10" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-25" fill="#000000" x="10" y="12" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-26" fill="#000000" x="10" y="14" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-27" fill="#000000" x="12" y="14" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-28" fill="#000000" x="14" y="14" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-29" fill="#000000" x="12" y="12" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-30" fill="#000000" x="12" y="10" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-31" fill="#000000" x="12" y="10" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-7" fill="#000000" x="2" y="23" width="1" height="8"></rect>
              <rect id="Rectangle-Copy-15" fill="#000000" x="10" y="21" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-32" fill="#000000" x="21" y="21" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-8" fill="#000000" x="29" y="23" width="1" height="8"></rect>
              <rect id="Rectangle-Copy-2" fill="#000000" x="25" y="1" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-3" fill="#000000" x="26" y="2" width="1" height="18"></rect>
              <rect id="Rectangle-Copy-4" fill="#000000" x="5" y="2" width="1" height="18"></rect>
              <rect id="Rectangle-Copy-14" fill="#000000" x="8" y="5" width="1" height="11"></rect>
              <rect id="Rectangle-Copy-12" fill="#000000" x="23" y="5" width="1" height="11"></rect>
          </g>
      </svg>
      </div>

      <label>Starting Up...</label>
      <div class="progress-bar"><div class="inner" :style="{ width: `${progress}%`}"></div></div>
      <!-- <button @click="loadingDone">Done</button> -->
    </div>
    <canvas id="loading-background" />
  </div>
</template>

<script>
import { generateBackground } from "@/utils";

export default {
  name: "LoadingScreen",
  props: {
    msg: String,
    show: Boolean,
    progress: Number
  },
  methods: {
    loadingDone() {
      this.$emit('loaded');
    }
  },
  mounted() {
    let backgroundCanvas = document.getElementById("loading-background");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let backgroundPattern = [
      [1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 1]
    ];
    let themeColor = '#E6E8E8';
    let themeSecondaryColor = '#D2D0D0';

    generateBackground(
      backgroundCanvas,
      windowWidth,
      windowHeight,
      backgroundPattern,
      themeColor,
      themeSecondaryColor
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.loading-screen {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: $salt400;
  z-index: 9999;
  color: $salt100;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  user-select: none;
  pointer-events: none;
  transition: opacity 150ms ease-in-out;

  &.show {
    opacity: 1;
  }
}

.container {
  background: $salt600;
  width: 500px;
  height: 380px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px 50px 30px 50px;
  border: 1px solid $pepper500;
  box-shadow: inset 1px 1px $salt100;
  z-index: 1;
  transition: transform 250ms ease-out;
  transform: translateY(-25px)

  .show & {
    opacity: 1;
    transform: translateY(0)
  }
}

.inner-container {
  background: $salt100;
  flex-grow: 1;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid $pepper500;
  box-shadow: 1px 1px $salt100, -1px -1px $pepper100, inset 1px 1px $white25;
  color: $pepper600;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 75px;
}

label {
  color: $pepper600;
}

.progress-bar {
  height: 16px;
  width: 300px;
  margin-top: 8px;
  border: 1px solid $pepper500;
  box-shadow: 1px 1px $salt100, inset 1px 1px $salt400;

  & .inner {
    height: 100%;
    width: 0%;
    background: $pomegranate600;
    box-shadow: inset 1px 1px $pomegranate400;
    transition: width 60ms ease-in-out;
  }
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
