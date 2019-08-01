<template>
  <div class="weather">
    {{forecast.currently.temperature}}<br>
    {{forecast.hourly.summary}}
    <hr>
    feels like: {{forecast.currently.apparentTemperature}}
    <hr>
    {{address.formatted_address}}
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
      address: null,
      forecast: null
    };
  },
  mounted() {
    const self = this

    navigator.geolocation.getCurrentPosition((position) => {
      self.location = position
      self.$http.post(`/api/weather`, { lat: position.coords.latitude, long: position.coords.longitude }).then(response => {
        console.log(response)
        self.forecast = response.body
      }, response => {
        console.error('could not get data', response)
      })

      self.$http.post(`/api/address`, { lat: position.coords.latitude, long: position.coords.longitude }).then(response => {
        console.log(response)
        self.address = response.body
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
