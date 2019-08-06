<template>
  <div class="weather">
    <div class>
      <div v-if="address" class="location">{{address}}</div>
      <div class="temperature">
        <h1>{{forecast.temperature}}&#176;F</h1>
        <WeatherIcon v-if="forecast.iconType" :iconName="forecast.iconType" iconColor="#777777" />
      </div>
      <p>{{forecast.summary}}</p>
    </div>
    <hr>
    <div class="extra">
      <div>
        <label>Wind</label>
        <p>{{forecast.windSpeed}}</p>
      </div>
      <div>
        <label>Rain</label>
        <p>{{forecast.rainChance}}%</p>
      </div>
      <div>
        <label>Humidity</label>
        <p>{{forecast.humidity}}%</p>
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
      weatherData: null,
      forecast: {
        temperature: '-',
        summary: '-',
        iconType: null,
        windSpeed: '-',
        rainChance: '-',
        humidity: '-'
      }
    };
  },
  watch: {
    locationData: {
      handler() {
        localStorage.setItem('classic::locationData', JSON.stringify(this.locationData))
      }
    },
    forecast: {
      handler() {
        localStorage.setItem('classic::forecast', JSON.stringify(this.forecast))
      }
    },
    address: {
      handler() {
        if (this.address !== 'Could not load forecast') {
          console.log('saving', this.address)
          localStorage.setItem('classic::address', JSON.stringify(this.address));
        }
      }
    }
  },
  mounted() {
    const self = this

    const forecast = localStorage.getItem('classic::forecast')
    const locationData = localStorage.getItem('classic::locationData')
    const address = localStorage.getItem('classic::address')

    let refreshData = false;

    navigator.geolocation.getCurrentPosition((position) => {
      // if all cache exists in localstorage
      if (locationData && forecast && address) {
        let locationDataParsed = JSON.parse(locationData);

        let cachedLat = parseFloat(locationDataParsed.coords.latitude).toFixed(2)
        let cachedLong = parseFloat(locationDataParsed.coords.latitude).toFixed(2)
        let currLat = parseFloat(locationDataParsed.coords.latitude).toFixed(2)
        let currLong = parseFloat(locationDataParsed.coords.latitude).toFixed(2)
        
        // if cached doesn't match current, go get new weather data
        if (cachedLat !== currLat || cachedLong !== currLong) {
          refreshData = true;
        }
      } else {
        refreshData = true;
      }

      if (refreshData) {
        console.log('Loading from API...')

        // load weather data from API
        self.$http.post(`/api/weather`, { lat: position.coords.latitude, long: position.coords.longitude }).then(response => {
          console.log(response)
          // grab a few things from the response
          self.forecast.temperature = Math.round(response.body.currently.temperature)
          self.forecast.iconType = response.body.currently.icon
          self.forecast.summary = response.body.currently.summary
          self.forecast.windSpeed = response.body.currently.windSpeed
          self.forecast.rainChance = response.body.currently.precipProbability
          self.forecast.humidity = response.body.currently.humidity

          self.weatherData = response.body;
        }, response => {
          console.error('could not get weather data', response)
        });

        // load address data from api
        self.$http.post(`/api/address`, { lat: position.coords.latitude, long: position.coords.longitude }).then(response => {
          console.log(response)
          // just grab the locality (city) for now
          self.address = response.body.results[0].address_components.filter((item) => item.types.includes('locality'))[0].short_name
        }, response => {
          console.error('could not get data', response)
          self.address = 'Could not load forecast'
        });

      } else {
        // load from cache
        console.log('Loading from Cache...')
        self.address = JSON.parse(address)
        self.locationData = JSON.parse(locationData)
        self.forecast = JSON.parse(forecast)
      }

    // })
    });
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
        font-base();
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
