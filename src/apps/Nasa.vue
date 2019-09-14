<template>
  <div class="nasa">
    <p class="nasa-content">{{formattedDate}} - {{content}}</p>
    <p class="nasa-hover">Hover for Description</p>

    <div class="nasa-image-container">
      <div class="nasa-image" :style="imageStyle" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'

// default dateFormatString
const dateFormatString = 'YYYY-MM-DD'

export default {
  name: "Nasa",
  data() {
    return {
      content: null,
      imageSrc: null,
      date: moment()
    };
  },
  computed: {
      imageStyle() {
        return `background-image: url(${this.imageSrc})`
      },
      formattedDate() {
        return this.date.format(dateFormatString)
      }
  },
  mounted() {
    const self = this;
    const url = `https://api.nasa.gov/planetary/apod?api_key=qC0YTXXrvW80I9XOtgWWuxT2bvFBYeV2bfsJ3nXr&date=${self.formattedDate}`;

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
  display: flex;
  height: 100%;
  position: relative;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column
}

.nasa-content {
    width: 400px;
    z-index: 2;
    color: #fff;
    background: #000000d1;
    padding: 10px 14px;
    border-radius: 5px;
    letter-spacing: -1px;
    font-size: 14px;
    line-height: 1.5;
    text-indent: 13px;
    height: 100%;
    overflow-y: auto;
    opacity: 0;
    transition: opacity 250ms ease-in-out;

    .nasa:hover & {
      opacity: 1;
    }
}

.nasa-hover {
  color: #fff;
  background: #000000d1;
  z-index: 1;
  padding: 7px 15px;
  border-radius: 20px;
}

.nasa-image-container {
    flex: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.nasa-image {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat
  height: 100%;
}
</style>
