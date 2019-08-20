<template>
  <div class="loading-screen" :class="{ show: show }">
    <div class="container">
      <div class="inner-container">
        <!-- <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
        </svg> -->
        <svg width="44px" height="28px" viewBox="0 0 44 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="left" transform="translate(1.000000, 4.000000)">
              <polygon id="Rectangle-Copy-45" fill="#AAAAAA" points="8 10 10 10 10 22 9 22 9 21 8 21"></polygon>
              <polygon id="Path" fill="#D8D8D8" points="0 5 1 5 1 6 2 6 2 11 1 11 1 10 0 10"></polygon>
              <polygon id="Path-2" fill="#AAAAAA" points="15 11 16 11 16 12 17 12 17 18 16 18 16 17 15 17"></polygon>
              <polygon id="Path-3" fill="#AAAAAA" points="31 3 32 3 32 4 33 4 33 6 32 6 32 5 31 5"></polygon>
              <polygon id="Path-4" fill="#AAAAAA" points="32 9 32 11 33 11 33 9"></polygon>
              <polygon id="Path-5" fill="#AAAAAA" points="31 16 32 16 32 17 33 17 33 20 32 20 32 19 31 19"></polygon>
              <polygon id="Path-6" fill="#AAAAAA" points="24 6 25 6 25 7 26 7 26 14 25 14 25 10 24 10"></polygon>
              <polygon id="Rectangle" fill="#AAAAAA" points="37 11 38 11 38 15 37 15 37 14 36 14 36 12 37 12"></polygon>
              <polygon id="Path-18" fill="#AAAAAA" points="37 0 38 0 38 1 39 1 39 7 37 7"></polygon>
          </g>
          <g id="front" transform="translate(4.000000, 3.000000)" fill="#EFEFEF">
              <polygon id="Path-7" points="0 9 1 9 1 8 3 8 3 7 5 7 5 6 7 6 7 5 9 5 9 4 11 4 11 3 13 3 13 2 15 2 15 1 17 1 17 0 18 0 18 4 17 4 17 5 15 5 15 6 13 6 13 7 11 7 11 23 9 23 9 24 8 24 8 9 7 9 7 10 5 10 5 11 3 11 3 12 1 12 1 13 0 13"></polygon>
              <path d="M21,11 L21,18 L19,18 L19,19 L17,19 L17,20 L15,20 L15,13 L17,13 L17,12 L19,12 L19,11 L21,11 Z M20,14 L17,14 L17,15 L16,15 L16,17 L19,17 L19,16 L20,16 L20,14 Z" id="Combined-Shape"></path>
              <polygon id="Path-10" points="24 9 25 9 25 8 27 8 27 7 29 7 29 10 27 10 27 11 26 11 26 15 25 15 25 16 24 16"></polygon>
              <polygon id="Path-11" points="31 6 32 6 32 5 33 5 33 10 34 10 34 9 37 9 37 3 38 3 38 2 39 2 39 18 38 18 38 19 36 19 36 20 34 20 34 21 32 21 32 22 31 22 31 19 32 19 32 18 34 18 34 17 36 17 36 11 34 11 34 12 32 12 32 13 31 13"></polygon>
          </g>
          <g id="top" transform="translate(3.000000, 1.000000)">
              <rect id="Rectangle-Copy-58" fill="#000000" x="16" y="11" width="2" height="1"></rect>
              <polygon id="Path-12" fill="#D8D8D8" points="0 10 0 8 1 8 1 7 3 7 3 6 5 6 5 5 7 5 7 4 9 4 9 3 11 3 11 2 13 2 13 1 15 1 15 0 17 0 17 1 18 1 18 2 16 2 16 3 14 3 14 4 12 4 12 5 10 5 10 6 8 6 8 7 6 7 6 8 4 8 4 9 2 9 2 10"></polygon>
              <polygon id="Path-14" fill="#D8D8D8" points="24 10 26 10 26 9 28 9 28 7 26 7 26 8 24 8"></polygon>
              <polygon id="Path-15" fill="#D8D8D8" points="30 6 31 6 31 7 33 7 33 5 30 5"></polygon>
              <polygon id="Path-16" fill="#D8D8D8" points="36 2 38 2 38 1 39 1 39 2 40 2 40 3 39 3 39 4 37 4 37 3 36 3"></polygon>
              <polygon id="Path-17" fill="#D8D8D8" points="31 18 33 18 33 17 34 17 34 18 35 18 35 19 33 19 33 20 31 20"></polygon>
              <polygon id="Path-13" fill="#D8D8D8" points="14 13 16 13 16 12 18 12 18 11 20 11 20 13 18 13 18 14 16 14 16 15 15 15 15 14 14 14"></polygon>
          </g>
          <g id="lines" fill="#000000">
              <rect id="Rectangle" x="3" y="11" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-18" x="2" y="10" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-42" x="10" y="26" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-43" x="9" y="25" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-55" x="17" y="15" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-60" x="23" y="12" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-80" x="31" y="8" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-96" x="32" y="6" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-105" x="33" y="7" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-106" x="39" y="4" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-110" x="36" y="6" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-111" x="35" y="5" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-116" x="33" y="15" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-117" x="32" y="14" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-118" x="38" y="11" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-69" x="24" y="10" width="1" height="3"></rect>
              <rect id="Rectangle-Copy-68" x="26" y="18" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-81" x="26" y="10" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-56" x="16" y="14" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-62" x="17" y="22" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-61" x="16" y="21" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-32" x="2" y="15" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-41" x="1" y="14" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-30" x="20" y="1" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-31" x="18" y="0" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-28" x="1" y="9" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-12" x="3" y="16" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-11" x="3" y="11" width="1" height="5"></rect>
              <rect id="Rectangle-Copy-29" x="0" y="9" width="1" height="5"></rect>
              <rect id="Rectangle-Copy-23" x="22" y="2" width="1" height="5"></rect>
              <rect id="Rectangle-Copy-46" x="18" y="16" width="1" height="5"></rect>
              <rect id="Rectangle-Copy-48" x="18" y="16" width="1" height="7"></rect>
              <rect id="Rectangle-Copy-63" x="20" y="18" width="1" height="2"></rect>
              <rect id="Rectangle-Copy-66" x="23" y="17" width="1" height="2"></rect>
              <rect id="Rectangle-Copy-49" x="25" y="14" width="1" height="7"></rect>
              <rect id="Rectangle-Copy-67" x="27" y="12" width="1" height="7"></rect>
              <rect id="Rectangle-Copy-93" x="34" y="9" width="1" height="7"></rect>
              <rect id="Rectangle-Copy-104" x="31" y="6" width="1" height="2"></rect>
              <rect id="Rectangle-Copy-99" x="40" y="6" width="1" height="6"></rect>
              <rect id="Rectangle-Copy-115" x="39" y="15" width="1" height="4"></rect>
              <rect id="Rectangle-Copy-101" x="43" y="3" width="1" height="18"></rect>
              <rect id="Rectangle-Copy-100" x="37" y="8" width="1" height="5"></rect>
              <rect id="Rectangle-Copy-73" x="30" y="14" width="1" height="4"></rect>
              <rect id="Rectangle-Copy-86" x="33" y="10" width="1" height="3"></rect>
              <rect id="Rectangle-Copy-24" x="15" y="11" width="1" height="15"></rect>
              <rect id="Rectangle-Copy-25" x="11" y="13" width="1" height="15"></rect>
              <rect id="Rectangle-Copy-44" x="8" y="14" width="1" height="11"></rect>
              <rect id="Rectangle-Copy" x="5" y="10" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-2" x="7" y="9" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-3" x="9" y="8" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-4" x="11" y="7" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-5" x="13" y="6" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-6" x="15" y="5" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-7" x="17" y="4" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-8" x="19" y="3" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-9" x="21" y="1" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-10" x="21" y="2" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-22" x="5" y="15" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-21" x="7" y="14" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-20" x="9" y="13" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-19" x="11" y="12" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-26" x="13" y="26" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-52" x="19" y="23" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-53" x="21" y="22" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-54" x="23" y="21" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-71" x="29" y="18" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-82" x="27" y="19" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-85" x="25" y="20" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-88" x="34" y="16" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-89" x="36" y="15" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-91" x="38" y="14" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-92" x="40" y="22" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-103" x="42" y="21" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-109" x="38" y="23" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-112" x="36" y="24" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-123" x="34" y="25" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-113" x="38" y="19" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-114" x="36" y="20" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-119" x="36" y="16" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-120" x="36" y="17" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-125" x="34" y="18" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-131" x="32" y="19" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-121" x="34" y="21" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-127" x="33" y="24" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-128" x="32" y="23" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-132" x="33" y="20" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-133" x="33" y="20" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-134" x="33" y="20" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-135" x="37" y="18" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-122" x="34" y="22" width="1" height="3"></rect>
              <rect id="Rectangle-Copy-126" x="31" y="20" width="1" height="3"></rect>
              <rect id="Rectangle-Copy-72" x="31" y="13" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-27" x="12" y="27" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-17" x="15" y="10" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-16" x="17" y="9" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-47" x="19" y="15" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-64" x="21" y="17" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-65" x="21" y="19" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-57" x="17" y="13" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-59" x="21" y="11" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-70" x="25" y="9" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-74" x="27" y="8" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-75" x="29" y="7" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-102" x="33" y="5" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-129" x="38" y="3" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-130" x="37" y="4" width="1" height="3"></rect>
              <rect id="Rectangle-Copy-107" x="39" y="2" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-108" x="41" y="1" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-76" x="27" y="11" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-77" x="29" y="10" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-78" x="31" y="9" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-94" x="34" y="8" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-95" x="36" y="7" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-97" x="40" y="5" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-98" x="42" y="4" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-124" x="42" y="2" width="1" height="1"></rect>
              <rect id="Rectangle-Copy-50" x="21" y="14" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-51" x="23" y="13" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-15" x="19" y="8" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-40" x="2" y="8" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-39" x="4" y="7" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-38" x="6" y="6" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-37" x="8" y="5" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-36" x="10" y="4" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-35" x="12" y="3" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-34" x="14" y="2" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-33" x="16" y="1" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-14" x="21" y="7" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-13" x="21" y="7" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-79" x="1" y="9" width="2" height="1"></rect>
              <rect id="Rectangle-Copy-83" x="2" y="10" width="1" height="1"></rect>
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
