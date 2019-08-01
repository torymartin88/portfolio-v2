<template>
  <div class="window-manager">
    <div class="bounds">
      <vue-draggable-resizable v-for="w in windows" :key="w.id"
        :x="w.x" :y="w.y" :w="w.w" :h="w.h" :max-width="w.maxw" :max-height="w.maxh" :min-width="w.minw" :min-height="w.minh"
        :z="w.active ? 3 : 2" :parent="true" :handles="['br']" :drag-handle="'.window-header'" :drag-cancel="'.no-drag'" class-name="window"
        @activated="onActivated(w.id)" :active="w.active">
        <Window :component="w.component" :active="w.active" @closeWindow="onCloseWindow(w.id)" @activated="onActivated(w.id)" />
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Window from '@/components/Window.vue'

export default {
  name: 'windowmanager',
  data: function() {
    return {
      activeComponent: 'Calculator'
    }
  },
  computed: {
    windows() {
      return this.$store.state.windows
    }
  },
  methods: {
    onResize (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag (x, y) {
      this.x = x
      this.y = y
    },
    onActivated (id) {
      // tell store which window is active
      this.$store.dispatch('setActiveWindow', id)
    },
    onCloseWindow(id) {
      this.$store.dispatch('closeWindow', id)
    }
  },
  components: {
    Window
  }
}
</script>


<style lang="stylus" scoped>
.window-manager {
  position: relative
  height: calc(100vh - 24px)
  width: 100vw
}

.bounds {
  height: 100%
  width: 100%
  position: relative
}
</style>
