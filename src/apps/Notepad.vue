<template>
  <div class="notepad">
    <div contenteditable></div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      calculation: "",
      tempResult: "0"
    };
  },
  methods: {

  },
  watch: {

  },
  computed: {

  },
  filters: {

  }
};
</script>

<style lang="stylus" scoped>
.notepad {
    height: 100%;
}

div[contenteditable] {
    width: 100%;
    height: 100%;
    font-family: arial, sans-serif;
    font-size: 12px;
    padding: 5px;
    line-height: 1.25;
    overflow-y: auto;

    &:focus {
        outline: none;
    }
}
</style>
