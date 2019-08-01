<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 512 512"
    :aria-labelledby="iconName"
    role="presentation"
    class="weather-icon"
  >
    <title
      :id="iconName"
      lang="en"
    >{{ iconName }} icon</title>
    <g :fill="iconColor" v-html="iconContent"></g>
  </svg>
</template>

<script>
import weatherIcons from '@/components/weatherIcons'

export default {
  props: {
    iconName: {
      type: String,
      default: 'cloud',
      validator(value) {
        return [
          'clear-day',
          'clear-night',
          'rain',
          'snow',
          'sleet',
          'wind',
          'fog',
          'cloud',
          'partly-cloudy-day',
          'partly-cloudy-night'
        ].indexOf(value) !== -1
      }
    },
    width: {
      type: [Number, String],
      default: 40
    },
    height: {
      type: [Number, String],
      default: 40
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  },
  computed: {
    iconContent() {
      return weatherIcons.filter((icon) => icon.name === this.iconName)[0].svg
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
