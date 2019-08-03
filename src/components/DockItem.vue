<template>
  <div class="dock-item" @click="onClick">
    <svg v-html="icon"></svg>
    <span class="indicator" :class="{ show: open }"></span>
  </div>
</template>

<script>
export default {
  name: "DockItem",
  props: {
    icon: {
      type: String,
      default: null,
      required: true
    },
    open: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.dock-item {
  width: 45px;
  height: 100%;
  display: flex;
  flex-direction: column
  align-items: center;
  transition: all 150ms ease-in-out;

  &:hover {
    width: 75px;
    svg {
      transform: scale(1.5) translateY(-8px);
      
    }
  }

  svg {
    transition: all 100ms ease-in-out;
    width: 30px;
    height: 30px;
  }

  .indicator {
    width: 4px;
    height: 4px;
    background: #000;
    margin-top 3px;
    transition: opacity 250ms ease-in-out;
    opacity: 0;
    border-radius: 2px;

    &.show {
      opacity: 1;
    }
  }
}
</style>
