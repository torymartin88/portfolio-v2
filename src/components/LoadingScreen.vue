<template>
  <div class="loading-screen" :class="{ show: show }">
    <div class="container">
      <div class="inner-container">
        Classic
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
