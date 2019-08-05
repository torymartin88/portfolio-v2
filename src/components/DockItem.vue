<template>
  <div class="dock-item" @click="onClick">
    <div class="icon">
      <i :class="iconClass" :style="iconStyle"></i>
    </div>
    <!-- <font-awesome-icon :icon="['far', icon]" /> -->
    <span class="indicator" :class="{ show: open }"></span>
    <div class="tooltip">{{appName}}</div>
  </div>
</template>

<script>
export default {
  name: "DockItem",
  props: {
    icon: {
      type: Object,
      default: null,
      required: true
    },
    appName: {
      type: String,
      default: null,
      required: true
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  },
  computed: {
    iconClass() {
      return `fad fa-${this.icon.name} ${
        this.icon.swapOpacity ? "fa-swap-opacity" : ""
      }`;
    },
    iconStyle() {
      return `--fa-primary-color: #272838; --fa-secondary-color: #272838; `;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.dock-item {
  position: relative;
  width: 45px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 250ms ease-out;

  &:hover {
    .icon {
      background: darken(#d2d2d8, 5%);
      transition: all 100ms ease-in-out;
      transform: translateY(-2px);
    }

    .tooltip {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .icon {
    background: #d2d2d8;
    border-radius: 3px;
    padding: 4px;
    display: flex;
    align-items: center;
    transition: all 250ms ease-in-out;
    height: 30px;
    border: 1px solid #313131;
    box-shadow: inset 1px 1px 0 rgb(214, 213, 213), inset 2px 2px 0px rgb(255, 255, 255), inset -1px -1px 0 rgba(0,0,0,0.25);
  }

  svg {
    transition: all 100ms ease-in-out;
    width: 30px;
  }

  .indicator {
    width: 4px;
    height: 4px;
    background: #000;
    margin-top: 3px;
    transition: opacity 250ms ease-in-out;
    opacity: 0;
    border-radius: 2px;

    &.show {
      opacity: 1;
    }
  }

  .tooltip {
    position: absolute;
    top: -28px;
    background: #0000008c;
    color: white;
    padding: 3px 7px;
    border-radius: 4px;
    display: block;
    font-family: Arial;
    font-size: 12px;
    text-transform: capitalize;
    font-weight: 600;
    transform: translateY(8px);
    opacity: 0;
    white-space: nowrap;
    transition: opacity 30ms ease-out, transform 200ms ease-out;
  }
}
</style>
