<template>
  <div class="weather">
    <div class>
      <div v-if="address" class="location">{{address}}</div>
      <div class="temperature">
        <h1>{{temperature}}&#176;F</h1>
        <WeatherIcon :iconName="iconType" iconColor="#777777" />
      </div>
      <p>{{summary}}</p>
    </div>
    <hr>
    <div class="extra">
      <div>
        <label>Wind</label>
        <p>{{windSpeed}}</p>
      </div>
      <div>
        <label>Rain</label>
        <p>{{rainChance}}%</p>
      </div>
      <div>
        <label>Humidity</label>
        <p>{{humidity}}%</p>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherIcon from '@/components/WeatherIcon'

export default {
  name: "Weather",
  data() {
    return {
      locationData: null,
      address: 'Loading...',
      temperature: '-',
      summary: '-',
      iconType: null,
      windSpeed: '-',
      rainChance: '-',
      humidity: '-',
      forecast: null
    };
  },
  mounted() {
    const self = this

    navigator.geolocation.getCurrentPosition((position) => {
      self.locationData = position
      self.$http.post(`/api/weather`, { lat: position.coords.latitude, long: position.coords.longitude }).then(response => {
        console.log(response)
        // grab a few things from the response
        self.temperature = Math.round(response.body.currently.temperature)
        self.iconType = response.body.currently.icon
        self.summary = response.body.currently.summary
        self.windSpeed = response.body.currently.windSpeed
        self.rainChance = response.body.currently.precipProbability
        self.humidity = response.body.currently.humidity

        // cache the rest of the response, just in case
        self.forecast = response.body
      }, response => {
        console.error('could not get data', response)
      })

      self.$http.post(`/api/address`, { lat: position.coords.latitude, long: position.coords.longitude }).then(response => {
        console.log(response)
        // just grab the locality (city) for now
        self.address = response.body.results[0].address_components.filter((item) => item.types.includes('locality'))[0].short_name
      }, response => {
        console.error('could not get data', response)
      })
    })
  },
  components: {
    WeatherIcon
  }
};
</script>

<style lang="stylus" scoped>
  .weather {
      padding: 10px;

      p {
        margin: 0;
        font-family: chicago, Arial, Helvetica, sans-serif
      }
  }

  .temperature {
    display: flex;
    align-items: center;
    
    h1 {
      font-size: 55px;
      font-weight: 100;
      margin: 0;
    }

    .weather-icon {
      margin-right: 10px;
    }
  }
  
  .extra {
    display: flex;

    & > div {
      flex-grow: 1;
    }

    label {
      font-size: 12px;
    }
  }


</style>
