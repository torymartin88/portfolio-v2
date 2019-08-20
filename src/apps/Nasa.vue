<template>
  <div class="nasa">
    <p class="nasa-content">
      {{content}}
    </p>

    <div class="nasa-image-container">
        <div class="nasa-image" :style="imageStyle" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Nasa",
  data() {
    return {
      content: null,
      imageSrc: null
    };
  },
  computed: {
      imageStyle() {
          return `background-image: url(${this.imageSrc})`
      }
  },
  mounted() {
    const self = this;
    const url = `https://api.nasa.gov/planetary/apod?api_key=qC0YTXXrvW80I9XOtgWWuxT2bvFBYeV2bfsJ3nXr`;

    // load picture of day data from api
    self.$http.get(url).then(
      response => {
        console.log(response);
        // just grab the locality (city) for now
        self.content = response.body.explanation
        self.imageSrc = response.body.url
      },
      response => {
        console.error("could not get data", response);
        self.conent = "Could not load data";
      }
    );
  }
};
</script>

<style lang="stylus" scoped>
.nasa {
  padding: 10px;
  display: flex;
  height: 100%;
}

.nasa-content {
    width: 200px;
}

.nasa-image-container {
    flex: 1;
}

.nasa-image {
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat
  height: 100%;
}
</style>
