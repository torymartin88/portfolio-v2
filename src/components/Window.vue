<template>
  <div
    class="window"
    v-bind:class="{ active: active, 'scroll-whole-window': scroll }"
    @click="windowActive"
  >
    <div class="window-header">
      <div class="close no-drag" @click="closeWindow"></div>
      <div class="spacer">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div>{{activeComponent}}</div>
      <div class="spacer">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
      <!-- <div class="close no-drag"></div> -->
    </div>
    <div class="window-content">
      <component :is="activeComponent"></component>
    </div>
  </div>
</template>

<script>
export default {
  name: "window",
  props: {
    component: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    },
    scroll: {
      type: Boolean
    }
  },
  data: function() {
    return {
      activeComponent: this.component
    };
  },
  methods: {
    closeWindow() {
      this.$emit("closeWindow");
    },
    windowActive() {
      // if this window isn't currently active, emit activated event for WindowManager
      if (!this.active) {
        this.$emit("activated");
      }
    }
  }
};
</script>


<style lang="stylus" scoped>
.window {
  background: #DEDEDE;
  border: 1px solid #303030;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.22), inset 1px 1px 0 rgba(255, 255, 255, 0.25), inset -1px -1px 0 rgba(0, 0, 0, 0.25);
  height: 100%;
  opacity: 0.9;
  transition: box-shadow 100ms ease-in-out, opacity 20ms ease-in-out;

  &.active {
    opacity: 1;
    box-shadow: 4px 2px 0 0 rgba(0, 0, 0, 0.22), inset 1px 1px 0 rgba(255, 255, 255, 0.25), inset -1px -1px 0 rgba(0, 0, 0, 0.25)
  }
}

.window-header {
  display: flex;
  align-items: center;
  text-align: center;
  height: 24px;
  font-size: 16px;
  line-height: 24px;
  cursor: move;
  user-select: none;
  padding: 4px;

  .close {
    background: #d6d6d6;
    border: 1px solid #525252;
    box-shadow: 1px 1px #fff, -1px -1px #9e9e9e, inset 1px 1px rgba(255,255,255,0.5), inset -1px -1px rgba(0,0,0,0.5);
    width: 14px;
    height: 14px;
    cursor: pointer;
    transition: opacity 20ms ease-in-out;

    &:hover {
      background: darken(#d6d6d6, 5%);
    }

    &:active {
      background: darken(#d6d6d6, 15%);
    }
  }

  .spacer {
    flex-grow: 1;
    padding: 0 5px;
    transition: opacity 20ms ease-in-out;

    i {
      width: 100%;
      height: 1px;
      background: #ececec;
      display: block;
      margin-bottom: 1px;
      box-shadow: 1px 1px rgba(0, 0, 0, 0.1);
    }
  }

  .window:not(.active) & {
    .spacer {
      opacity: 0;
    }

    .close {
      opacity: 0;
      pointer-events: none;
      cursor: default;
    }
  }
}

.window-content {
  background: #ececec;
  margin-left: 3px;
  margin-right: 3px;
  border: 1px solid #525252;
  box-shadow: -0.5px -0.5px 1px #b9b9b9, 0.5px 0.5px 1px rgba(255, 255, 255, 1);
  height: calc(100% - 27px);
  user-select: none;

  .scroll-whole-window & {
    overflow-y: auto;
  }
}
</style>
