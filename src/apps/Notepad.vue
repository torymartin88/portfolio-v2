<template>
  <div class="notepad" v-bind:class="{ 'show-preview': showPreview }">
    <textarea v-focus id="notepad-content" :value="content" @input="updatePreview"></textarea>
    <div class="preview" v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: "Calculator",
  data() {
    return {
      content: "",
      showPreview: true
    };
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.content, { sanitize: true })
    }
  },
  methods: {
    updatePreview(e) {
      this.content = e.target.value
    }
  }
};
</script>

<style lang="stylus" scoped>
.notepad {
  height: 100%;
  font-size: 0;
  display: flex;
}

textarea {
  width: 100%;
  height: 100%;
  font-family: Arial, sans-serif;
  font-size: 12px;
  padding: 5px;
  line-height: 1.25;
  resize: none;
  border: none;
  background: none;

  &:focus {
    outline: none;
  }

  .show-preview & {
    width: 50%;
  }
}

.preview {
  width: 50%;
  font-size: 12px;
  font-weight: 100;
  border-left: 1px solid #000000;
  padding: 0 20px;
}
</style>
