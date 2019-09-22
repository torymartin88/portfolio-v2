<template>
  <div class="window" :class="windowClass" @click="windowActive">
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
      <div>{{title}}</div>
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
      <component :is="activeComponent" @updatetitle="updateTitle"></component>
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
    title: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean
    },
    scroll: {
      type: Boolean
    },
    autoHeight:  {
      type: Boolean
    }
  },
  data: function() {
    return {
      activeComponent: this.component
    };
  },
  computed: {
    themeClass() {
      return `theme-${this.$store.getters.getThemeName}`;
    },
    windowClass() {
      return [
        this.active ? "active" : "",
        this.scroll ? "scroll-whole-window" : "",
        this.autoHeight ? "auto-height" : "",
        this.themeClass
      ].join(" ");
    }
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
    },
    updateTitle(title) {
      const self = this;
      self.$store.dispatch('setWindowTitle', {
        id: self.id,
        title: title
      })
    }
  }
};
</script>


<style lang="stylus" scoped>
.window {
  background: $salt400;
  border-mixin($pepper500);
  box-shadow: 0 0 0 0 $black25, inset 1px 1px 0 $white25, inset -1px -1px 0 $black25;
  height: 100%;
  opacity: 0;
  transition: box-shadow 100ms ease-in-out, opacity 20ms ease-in-out;

  &.auto-height {
    padding-bottom: 3px;
  }

  .show & {
    opacity: 0.9;
  }

  &.active {
    opacity: 1;
    box-shadow: 4px 2px 0 0 $black25, inset 1px 1px 0 $white25, inset -1px -1px 0 $black25;
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
    background: $salt500;
    border-mixin($pepper400);
    box-shadow: 1px 1px $salt100, -1px -1px $pepper100, inset 1px 1px $white50, inset -1px -1px $black50;
    width: 14px;
    height: 14px;
    cursor: pointer;
    transition: opacity 20ms ease-in-out;

    &:hover {
      background: $salt600;
    }

    &:active {
      background: $pepper100;
    }
  }

  .spacer {
    flex-grow: 1;
    padding: 0 5px;
    transition: opacity 20ms ease-in-out;

    i {
      width: 100%;
      height: 1px;
      background: $salt300;
      display: block;
      margin-bottom: 1px;
      box-shadow: 1px 1px $black10;
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
  background: $salt300;
  margin-left: 3px;
  margin-right: 3px;
  border-mixin($pepper400);
  box-shadow: -0.5px -0.5px 1px $salt600, 0.5px 0.5px 1px $salt100;
  height: calc(100% - 27px);
  user-select: none;

  .scroll-whole-window & {
    overflow-y: auto;
  }
}

// themes
.window.theme-black {
  background: $pepper550;

  .window-header {
    color: $salt100

    .close {
      background: $pepper500;
      border: 1px solid $pepper300;
      box-shadow: -1px -1px $pepper400, inset -1px -1px $black50

      &:hover {
        background: $pepper600
      }
    }

    .spacer i {
      background: $pepper400
      box-shadow: none;  
    }
  }
}
</style>
