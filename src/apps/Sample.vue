<template>
  <div class="sample">
    <input type="text" />
    <hr>
    <label for="input-with-label">Input with Label</label>
    <input id="input-with-label" type="text" />
    <hr>
    <button>Button</button>
    <hr>
    <select id="select-with-label">
      <option>First Option</option>
      <option>Second Option</option>
      <option>Third Option</option>
    </select>
    <hr>
    <label for="select-with-label">Select with Label</label>
    <select id="select-with-label">
      <option>First Option</option>
      <option>Second Option</option>
      <option>Third Option</option>
    </select>
    <hr>
    <label><input type="checkbox">Checkbox</label>
    <hr>
    <label><input type="radio">Radio</label>
  </div>
</template>

<script>
export default {
  name: "Sample",
  data() {
    return {
      calculation: "",
      tempResult: "0"
    };
  }
};
</script>

<style lang="stylus" scoped>
.sample {
    padding: 10px;
}
</style>
