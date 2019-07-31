<template>
  <div id="app">
    <MenuBar/>
    <Desktop/>
    <router-view/>
  </div>
</template>
<style lang="stylus">
*, *:before, *:after
  box-sizing: border-box

html
  box-sizing: inherit

body
  background: #EDEDED
  font-smooth: never
  -webkit-font-smoothing: none
  -moz-osx-font-smoothing: none
  image-rendering: pixelated
  font-family: Chicago, Arial, sans-serif
  font-weight: 400
  font-size: 16px
  padding: 0;
  margin: 0;
  overflow hidden

button, input {
  font-size: 16px
  font-family: Chicago, Arial, sans-serif
}
</style>

<script>
// @ is an alias to /src
import MenuBar from '@/components/MenuBar.vue'
import Desktop from '@/components/Desktop.vue'

export default {
  name: 'app',
  components: {
    MenuBar, Desktop
  }
}
</script>