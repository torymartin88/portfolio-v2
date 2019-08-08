export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

// create canvas of width and height
// returns a promise
function createCanvas(width, height) {
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d");
  let imageData = ctx.createImageData(width, height);

  return { canvas, ctx, imageData };
}

// generates a random background.
export function generateRandomBackground(pixelData, width, height) {
  for (let x = 0; x < width; x++) {
    pixelData[x] = [];
    for (let y = 0; y < height; y++) {
      let rand = Math.round(Math.random());

      // set to 0 or 1 (on or off)
      pixelData[x][y] = rand;
    }
  }

  return pixelData
}


/**
 * @function generateBackground
 * @param {Object} canvas 
 * @param {Number} width 
 * @param {Number} height 
 * @param {Array} pixelData 
 * @param {String} primaryColorHex 
 * @param {String} secondaryColorHex 
 */
export function generateBackground(
  canvas,
  width,
  height,
  pixelData,
  primaryColorHex,
  secondaryColorHex
) {
  // const width = window.innerWidth;
  // const height = window.innerHeight;

  const primaryRGB = hexToRgb(primaryColorHex);
  const secondaryRGB = hexToRgb(secondaryColorHex);

  let ctx = canvas.getContext("2d");
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  // create pattern to repeat
  const patternWidth = 8;
  const patternHeight = 8;
  const patternMultiplier = 1; //

  // create a 50x50 canvas to write repeating pattern to
  let { canvas: tempCanvas, ctx: tempCtx, imageData: tempImageData } = createCanvas(
    patternWidth,
    patternHeight
  );

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
