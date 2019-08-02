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
  box-shadow: inset 0.5px 0.5px 1px 1px rgba(255, 255, 255, 0.5), inset -0.5px -0.5px 1px 1px rgba(0, 0, 0, 0.5);
  height: 100%;
  opacity: 0.9;

  &.active {
    opacity: 1;
    box-shadow: 2px 3px 0 0 rgba(0, 0, 0, 0.8), inset 0.5px 0.5px 1px 1px rgba(255, 255, 255, 0.5), inset -0.5px -0.5px 1px 1px rgba(0, 0, 0, 0.5);
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
    background-image: linear-gradient(135deg, #9d9e9d 0%, #ffffff 100%);
    border: 1px solid #525252;
    box-shadow: 0.5px 0.5px 1px 0 #FFFFFF, -0.5px -0.5px 1px 0 #9E9E9E, inset 0.5px 0.5px 1px 1px rgba(255, 255, 255, 0.5), inset -0.5px -0.5px 1px 1px rgba(0, 0, 0, 0.5);
    width: 14px;
    height: 14px;
    cursor: pointer;

    &:hover {
      background-image: linear-gradient(135deg, darken(#9D9E9D, 5%) 0%, darken(#F3F2F3, 5%) 100%);
    }

    &:active {
      background-image: linear-gradient(135deg, darken(#9D9E9D, 15%) 0%, darken(#F3F2F3, 15%) 100%);
    }
  }

  .spacer {
    flex-grow: 1;
    padding: 0 5px;

    i {
      width: 100%;
      height: 1px;
      background: #ffffff;
      display: block;
      margin-bottom: 1px;
      box-shadow: 1px 1px rgba(0, 0, 0, 0.4);
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
