<template>
  <div id="app">
    <LoadingScreen :show="loading" :progress="loadingProgress" @loaded="loadingDone" />
    <MenuBar :show="!loading" />
    <Dock :show="!loading" />
    <Desktop :show="!loading" />
    <WindowManager :show="!loading" />
    <!-- <router-view /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import LoadingScreen from "@/components/LoadingScreen.vue";
import MenuBar from "@/components/MenuBar.vue";
import Desktop from "@/components/Desktop.vue";
import Dock from "@/components/Dock.vue";
import WindowManager from "@/views/WindowManager.vue";

import loadState from "@/store/utils/loadState"

export default {
  name: "app",
  data() {
    return {
      loading: true,
      loadingProgress: 0
    }
  },
  components: {
    LoadingScreen,
    MenuBar,
    Desktop,
    Dock,
    WindowManager
  },
  created() {
    // start global time
    this.$store.dispatch("time/start");

    // register apps
    this.$store.dispatch("registerApps");

    const self = this;
    // load from cache
    if (!this.$store.initialized) {
      loadState()
      let loading = setInterval(() => {
        let rand = Math.floor(Math.random() * 6) + 1
        self.loadingProgress += (rand >= 100) ? 100 : rand 
        if (self.loadingProgress >= 100) {
          clearInterval(loading)
          self.loading = false;
        }
      }, 50)
    }
  },
  methods: {
    loadingDone() {
      this.loading = false;
    }
  }
};
</script>

<style lang="stylus">
*, *:before, *:after {
  box-sizing: border-box;
}

html {
  box-sizing: inherit;
  height: 100%;
}

body {
  background: $pepper500;
  font-smooth: never;
  font-synthesis: style;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  image-rendering: pixelated;
  font-base();
  height: 100%;
  font-weight: 400;
  font-size: 16px;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

#app {
  border-radius: 10px;
  overflow: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 100;
}

p {
  font-alternate()
}

ul {
  padding-left: 10px;

  li {
    font-alternate();
  }
}

button, input[type='text'], input[type='password'], input[type='number'], select {
  transition: 40ms all;
  display: block;

  & + button, & + select, & + input {
    margin-left: 5px;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px $salt100, 0 0 0 3px rgba(0, 0, 0, 1);
  }
}

button, input[type='text'], input[type='password'], input[type='number'] {
  font-size: 16px;
  font-base()
  background: $salt100;
  padding: 2px 8px;
  border-mixin($salt100)
  -webkit-appearance: none;
  border-radius: 5px;
}

input[type='text'] {
  &:focus {
    background: $pepper600;
    color: $salt100;
  }
}

button {
  &:hover {
    background: darken($salt100, 5%);
  }

  &:active {
    background: darken($salt100, 10%);
  }
}

select {
  display: block;
  padding: 2px 23px 2px 8px;
  -webkit-appearance: none;
  border-mixin()
  border-radius: 0;
  font-size: 16px;
  font-base()
  background: $salt100  url('assets/img/dropdown.png') no-repeat right center;
  box-shadow: 2px 2px $pepper600;

  &:hover {
    background: darken($salt100, 5%) url('assets/img/dropdown.png') no-repeat right center;
  }

  &:active {
    background: darken($salt100, 10%) url('assets/img/dropdown.png') no-repeat right center;
  }
}

textarea {
    font-alternate()
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

