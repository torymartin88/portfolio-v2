<template>
  <div class="desktop" @contextmenu="openContextMenu">
    <canvas id="desktop-background" />
  </div>
</template>

<script>
export default {
  name: "Desktop",
  methods: {
    openApp(appName) {
      this.$store.dispatch("openWindow", appName);
    },
    openContextMenu(e) {
      console.log("right click", e);
    }
  },
  computed: {
    windows() {
      return this.$store.state.windows;
    },
    desktopPattern() {
      return this.$store.state.desktopPattern;
    }
  },
  watch: {
    desktopPattern: {
      handler: (val, oldVal) => {
        console.log(val)
        generateBackground(val)
      },
      deep: true
    }
  },
  mounted() {
    const patternWidth = 8;
    const patternHeight = 8;

    // set up random pixel data
    let pixelData = this.$store.state.desktopPattern;

    if (pixelData.length === null) {
      for (let x = 0; x < patternWidth; x++) {
        pixelData[x] = [];
        for (let y = 0; y < patternHeight; y++) {
          let rand = Math.round(Math.random());

          // set to 0 or 1 (on or off)
          pixelData[x][y] = rand;
        }
      }

      this.$store.dispatch("setDesktopPattern", pixelData);
    }

    generateBackground(pixelData);
  }
};

function generateBackground(pixelData) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  let ctx = document.getElementById("desktop-background").getContext("2d");
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  // create pattern to repeat
  const patternWidth = 8;
  const patternHeight = 8;
  const patternMultiplier = 1; //

  // create a 50x50 canvas to write repeating pattern to
  let tempCanvas = document.createElement("canvas");
  tempCanvas.width = patternWidth;
  tempCanvas.height = patternHeight;
  let tempCtx = tempCanvas.getContext("2d");
  let tempImageData = tempCtx.createImageData(patternWidth, patternHeight);

  for (let i = 0; i < tempImageData.data.length; i += 4) {
    let x = (i / 4) % patternWidth;
    let y = Math.floor(i / (patternWidth * 4));

    if (pixelData[x][y]) {
      let color = pixelData[x][y] ? 25 : 215;
      tempImageData.data[i] = color;
      tempImageData.data[i + 1] = color;
      tempImageData.data[i + 2] = color;
      tempImageData.data[i + 3] = 255;
    }
  }
  tempCtx.putImageData(tempImageData, 0, 0);

  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  // write pattern to main canvas (repeating)
  for (let x = 0; x < width; x += patternWidth * patternMultiplier) {
    for (let y = 0; y < height; y += patternHeight * patternMultiplier) {
      ctx.drawImage(
        tempCanvas,
        x,
        y,
        patternWidth * patternMultiplier,
        patternHeight * patternMultiplier
      );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.desktop {
  // background: #63639C url('../assets/img/bg_tile.png');
  background: gray;
  position: absolute;
  top: 26px;
  left: 0;
  height: calc(100vh - 26px);
  width: 100vw;
  z-index: 1;
}
</style>
