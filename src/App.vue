<template>
  <div id="app">
    <MenuBar/>
    <Desktop/>
    <router-view/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import MenuBar from '@/components/MenuBar.vue'
  import Desktop from '@/components/Desktop.vue'

  export default {
    name: 'app',
    components: {
      MenuBar, Desktop
    },
    mounted() {
      // start global time
      this.$store.dispatch('time/start')
    }
  }
</script>

<style lang="stylus">
  *, *:before, *:after {
    box-sizing: border-box
  }

  html {
    box-sizing: inherit
  }

  body {
    background: #EDEDED
    font-smooth: never
    font-synthesis: style;
    -webkit-font-smoothing: none
    -moz-osx-font-smoothing: grayscale
    image-rendering: pixelated
    font-family: Chicago, Arial, sans-serif
    font-weight: 400
    font-size: 16px
    padding: 0;
    margin: 0;
    overflow hidden
  }

  button, input[type='text'], input[type='password'], input[type='number'], select {
    transition: 40ms all;
    display: block;

    & + button, & + select, & + input {
      margin-left: 5px;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 1px #fff, 0 0 0 3px rgba(0,0,0,1);
    }
  }

  button, input[type='text'], input[type='password'], input[type='number'] {
    font-size: 16px
    font-family: Chicago, Arial, sans-serif
    background: white;
    padding: 2px 8px;
    border: 1px solid #212121;
    -webkit-appearance: none;
    border-radius: 5px;
  }

  input[type='text'] {
    &:focus {
      background: #000;
      color: #fff;
    }
  }

  button {
    &:hover {
      background: darken(#fff, 5%)
    }

    &:active {
      background: darken(#fff, 10%)
    }
  }

  select {
    display: block;
    padding: 2px 23px 2px 8px;
    -webkit-appearance: none;
    border: 1px solid black;
    border-radius: 0;
    font-size: 16px;
    font-family: Chicago, Arial, sans-serif;
    background: #ffffff url('assets/img/dropdown.png') no-repeat right center;\
    box-shadow: 2px 2px black;

    &:hover {
      background: darken(#fff, 5%) url('assets/img/dropdown.png') no-repeat right center
    }

    &:active {
      background: darken(#fff, 10%) url('assets/img/dropdown.png') no-repeat right center
    }
  }

  label {
    input {
      margin-right: 5px;
    }

    & + input[type='text'], & + input[type='password'], & + input[type='number'], & + select {
      margin-top: 2px;
    }
  }

</style>

