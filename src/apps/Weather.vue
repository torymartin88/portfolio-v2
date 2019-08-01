<template>
  <div class="weather">
    {{location}}
  </div>
</template>

<script>
export default {
  name: "Weather",
  data() {
    return {
      calculation: "",
      tempResult: "0",
      location: null,
      forecast: null
    };
  },
  mounted() {
    const self = this

    navigator.geolocation.getCurrentPosition((position) => {
      self.location = position
      self.$http.post(`/api/weather`, { lat: position.coords.latitude, long: position.coords.longitude }).then(response => {
        console.log(response)
        self.forecast = response
      }, response => {
        console.error('could not get data', response)
      })
    })
  }
};
</script>

<style lang="stylus" scoped>
.weather {
    padding: 10px;
}
</style>
