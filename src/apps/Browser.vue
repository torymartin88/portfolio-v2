<template>
  <div class="browser">
    <iframe :src="src"></iframe>
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
      src: "https://torymartin.com/projects/data-importer/"
    };
  }
};
</script>

<style lang="stylus" scoped>
.browser {
  height: 100%;
  background: white;
}

  iframe {
    width: 100%;
    height: 100%;
  }
</style>
