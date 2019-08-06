<template>
  <div class="desktop" @contextmenu="openContextMenu">
    <canvas id="desktop-background" />
  </div>
</template>

<script>
import { debounce } from 'debounce';

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
    },
    desktopColors() {
      return this.$store.state.desktopColors;
    }
  },
  watch: {
    desktopPattern() {
      generateBackground(this.desktopPattern, this.desktopColors.primary, this.desktopColors.secondary);
    },
    'desktopColors.primary': function (val) {
      generateBackground(this.desktopPattern, this.desktopColors.primary, this.desktopColors.secondary);
    },
    'desktopColors.secondary': function (val) {
      generateBackground(this.desktopPattern, this.desktopColors.primary, this.desktopColors.secondary);
    }
  },
  mounted() { 
    let self = this;

    this.$nextTick(() => {
      window.addEventListener('resize', debounce(() => {
        let primaryColor = self.$store.state.desktopColors.primary;
        let secondaryColor = self.$store.state.desktopColors.secondary;

        generateBackground(self.$store.state.desktopPattern, primaryColor, secondaryColor);
      }, 200));
    })

    // if (pixelData.length === null) {
    //   for (let x = 0; x < patternWidth; x++) {
    //     pixelData[x] = [];
    //     for (let y = 0; y < patternHeight; y++) {
    //       let rand = Math.round(Math.random());

    //       // set to 0 or 1 (on or off)
    //       pixelData[x][y] = rand;
    //     }
    //   }

    //   this.$store.dispatch("setDesktopPattern", pixelData);
    // }

    generateBackground(this.desktopPattern, this.desktopColors.primary, this.desktopColors.secondary);
  }
};

function generateBackground(pixelData, primaryColor, secondaryColor) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const primaryRGB = hexToRgb(primaryColor);
  const secondaryRGB = hexToRgb(secondaryColor);

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

    if (pixelData[y][x] !== null) {
      let color = !pixelData[y][x] ? primaryRGB : secondaryRGB;

      tempImageData.data[i] = color.r;
      tempImageData.data[i + 1] = color.g;
      tempImageData.data[i + 2] = color.b;
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

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
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
