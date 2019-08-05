<template>
  <div class="video">
    <youtube
      :video-id="videoId"
      ref="youtube"
      :player-vars="playerVars"
      @playing="isPlaying"
      @paused="isPaused"
    ></youtube>
    <div class="actions">
      <div class="controls-left">
        <div class="play-button button" :class="{ paused: this.playing }" @click="toggleVideo">
          <svg v-if="!this.playing" width="20px" height="20px" viewBox="0 0 20 20">
            <polygon points="6 4 14 10 6 16"></polygon>
          </svg>
          <svg v-if="this.playing" width="20px" height="20px" viewBox="0 0 20 20">
            <rect x="6" y="4" width="3" height="12"></rect>
            <rect x="11" y="4" width="3" height="12"></rect>
          </svg>
        </div>
      </div>
      <SlideBar :value="progressPct" :min="0" :max="100" @input="onScrub" ></SlideBar>

      <div class="controls-right">
        <span class="progress-count">{{progress | minutesSeconds}} / {{duration | minutesSeconds}}</span>
      </div>
    </div>
    <div class="overlay"></div>
  </div>
</template>

<script>
import SlideBar from '@/components/SlideBar.vue'
import '@/assets/styles/slider_theme.styl'

export default {
  name: "Video",
  data() {
    return {
      videoId: "ytBR7ET_6uU",
      playing: true,
      duration: 0,
      progress: 0,
      progressInterval: null,
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        playsinline: 1,
        start: 0,
        end: 0,
        rel: 0
      }
    };
  },
  methods: {
    toggleVideo() {
      const self = this;
      if (self.playing) {
        self.player.pauseVideo();
      } else {
        self.player.playVideo();
      }

      this.playing = !this.playing;
    },
    async isPlaying() {
      const self = this;
      self.duration = await self.player.getDuration();

      self.progressInterval = setInterval(async () => {
        self.progress = await self.player.getCurrentTime();
      }, 1000);
    },
    isPaused() {
      clearInterval(this.progressInterval);
    },
    onScrub(val) {
      console.log(val)
      this.progressPct = val
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    progressPct: {
      get() {
        return Math.round((this.progress / this.duration) * 100)
      },
      set(value) {
        this.player.seekTo((value / 100) * this.duration)
      }
    }
  },
  filters: {
    minutesSeconds(value) {
      return convertToMinSec(Math.round(value));
    }
  },
  components: {
    SlideBar
  }
};

function convertToMinSec(seconds) {
  return `${Math.floor(seconds / 60)}:${zeroFill(seconds % 60, 2)}`;
}

function zeroFill(number, width) {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
  }
  return number + ""; // always return a string
}
</script>

<style lang="stylus">
.video {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
  }

  .actions {
    display: flex;
    height: 25px;
    align-items: center;
    z-index: 1
  }

  .controls-left {
    .button {
      border: 1px solid #656565;
      width: 24px;
      height: 24px;
      box-shadow: inset 1px 1px 1px 0 #ffffff9e, inset -1px -1px 1px 0 #00000078;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        fill: $gray-6
      }
    }
  }

  .controls-right {
    width: 65px;
    text-align: right;
    padding-right: 5px;

    .progress-count {
      font-alternate()
      font-size: 11px;
    }
  }

  .vue-slide-bar-component {
    flex-grow: 1;
    padding-left: 5px;
    padding-right: 5px;
  }

  .overlay {
    height: 300%;
    width: 300%;
    left: -50%;
    opacity: 0.3;
    top: -110%;
    display: block;
    position: absolute;
    animation: grain 8s steps(10) infinite;
    background: url(../assets/img/noise.png);
    pointer-events: none;
  }
}


@keyframes grain {
  0%, 100% { transform:translate(0, 0) }
  10% { transform:translate(-5%, -10%) }
  20% { transform:translate(-15%, 5%) }
  30% { transform:translate(7%, -25%) }
  40% { transform:translate(-5%, 25%) }
  50% { transform:translate(-15%, 10%) }
  60% { transform:translate(15%, 0%) }
  70% { transform:translate(0%, 15%) }
  80% { transform:translate(3%, 35%) }
  90% { transform:translate(-10%, 10%) }
}

</style>
