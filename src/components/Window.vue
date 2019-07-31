<template>
    <div class="window" v-bind:class="{ active: active }">
        <div class="window-header">
            <div class="close no-drag" @click="closeWindow"></div>
            <div class="spacer"><i></i><i></i><i></i><i></i><i></i></div>
            <div>Calculator</div>
            <div class="spacer"><i></i><i></i><i></i><i></i><i></i></div>
            <!-- <div class="close no-drag"></div> -->
        </div>
        <div class="window-content">
            <component :is="activeComponent"></component>
        </div>
    </div>
</template>

<script>
export default {
  name: 'window',
  props: ['component', 'active'],
  data: function() {
    return {
      activeComponent: this.component
    }
  },
  methods: {
      closeWindow() {
          this.$emit('closeWindow')
      }
  }
}
</script>


<style lang="stylus" scoped>
.window {
    background: #DEDEDE
    border: 1px solid #303030
    box-shadow: 3px 3px 0 0 rgba(0,0,0,0.20), inset 1px 1px 0 1px rgba(255,255,255,0.50), inset -1px -1px 0 1px rgba(0,0,0,0.50)
    height: 100%;
    opacity: 0.9

    &.active {
        opacity: 1
    }
}

.window-header {
  display: flex;
  align-items: center;
  text-align: center;
  height: 24px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  cursor: move;
  user-select: none;
    padding: 3px;

  .close {
    background-image: linear-gradient(135deg, #9D9E9D 0%, #F3F2F3 100%);
    border: 1px solid #525252;
    box-shadow: 1px 1px 0 0 #FFFFFF, -1px -1px 0 0 #9E9E9E, inset 1px 1px 0 1px rgba(255,255,255,0.50), inset -1px -1px 0 1px rgba(0,0,0,0.50);
    width: 16px;
    height: 16px;
    cursor pointer

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
      background: #000000;
      display: block;
      margin-bottom: 2px;
    }  
  }
}

.window-content {
  background: white
  // padding: 10px;
  margin-left: 2px;
  margin-right: 2px;
  border: 1px solid #525252;
  height: calc(100% - 26px);
  user-select: none;
}
</style>