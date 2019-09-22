<template>
  <div class="finder" @click="updateTitle">
    <DesktopIcon
      :icon="{ name: 'cloud-upload', swapOpacity: false }"
      :iconColor="iconColor"
      :text="'Data Importer'"
      @click="iconClick"
      @dblclick="iconDblClick"
    />
    <DesktopIcon
      :icon="{ name: 'pencil-ruler', swapOpacity: false }"
      :iconColor="iconColor"
      :text="'Lunchbox'"
      @click="iconClick"
      @dblclick="iconDblClick"
    />
    <DesktopIcon
      :icon="{ name: 'truck', swapOpacity: false }"
      :iconColor="iconColor"
      :text="'323 Portal'"
      @click="iconClick"
      @dblclick="iconDblClick"
    />
    <DesktopIcon
      :icon="{ name: 'chart-line', swapOpacity: false }"
      :iconColor="iconColor"
      :text="'Insights'"
      @click="iconClick"
      @dblclick="iconDblClick"
    />
  </div>
</template>

<script>
import DesktopIcon from "@/components/DesktopIcon.vue";

export default {
  name: "Finder",
  data() {
    return {
      calculation: "",
      tempResult: "0"
    };
  },
  components: {
    DesktopIcon
  },
  methods: {
    updateTitle() {
      this.$emit("updatetitle", 'Projects');
    },
    iconClick() {
      console.log('click')
    },
    iconDblClick() {
      console.log('iconDblClick')
    }
  }
};
</script>

<style lang="stylus" scoped>
.finder {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}

.desktop-icon {
  width: auto;
  flex-grow: 0;
  white-space: nowrap;
  margin: 10px;
}
</style>
