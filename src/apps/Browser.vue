<template>
  <div class="browser">
    <div class="action-bar">
      <div class="navigation">
        <i class="far fa-arrow-left" :class="{ disabled: historyIndex === 0 }" @click="back"></i>
        <i class="far fa-arrow-right" :class="{ disabled: historyIndex === history.length - 1 }" @click="forward"></i>
        <i class="far fa-redo" @click="refresh"></i>
      </div>
      <div class="address-bar">
        <input type="text" v-model="src" @keyup="inputKeyUp" />
      </div>
    </div>
    <iframe :src="iframeSrc" @load="iframeChange(this.contentWindow.location)"></iframe>
  </div>
</template>

<script>
export default {
  name: "Sample",
  // props: {
  //   href: {
  //     type: String,
  //     required: true
  //   },
  // },
  data() {
    return {
      src: "https://torymartin.com/projects/data-importer/",
      iframeSrc: "https://torymartin.com/projects/data-importer/",
      history: ["https://torymartin.com/projects/data-importer/"],
      historyIndex: 0
    };
  },
  methods: {
    inputKeyUp(e) {
      if (e.keyCode === 13) {
        this.iframeSrc = this.src
      }
    },
    back() {
      // if there's any more history in the past
      if (this.historyIndex !== 0) {
        this.historyIndex--
        const backUrl = this.history[this.historyIndex]
        this.src = backUrl
        this.iframeSrc = backUrl
      }
    },

    forward() {
      // if the index is less than the length of history (minus one)
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++
        const backUrl = this.history[this.historyIndex]
        this.src = backUrl
        this.iframeSrc = backUrl
      }
    },

    refresh() {
      this.iframeSrc = this.iframeSrc
    },

    iframeChange(e) {
      console.log('iframe load')
      console.log(e)
      // remove any history past index
      this.history = this.history.slice(0, this.historyIndex)

      console.log(this.history)
      console.log(this.iframeSrc)

      // push new history
      this.history.push(this.iframeSrc)
      this.historyIndex = this.history.length

      console.log(this.history)
      console.log(this.historyIndex)

      this.src = this.iframeSrc
    }
  }
};
</script>

<style lang="stylus" scoped>
.browser {
  height: 100%;
  background: white;
}

  .action-bar {
    display: flex;
    height: 30px;
    align-items: center;
  }

  .navigation {
    i {
      color: $pepper300;
      padding: 4px;

      &:hover {
        color: $pepper600
      }

      &.disabled {
        color: $pepper100

        &:hover {
          color: $pepper100
        }
      }
    }
  }

  .address-bar {
    flex: 1;

    input {
      width: 100%;
    }
  }

  iframe {
    width: 100%;
    height: 100%;
  }
</style>
