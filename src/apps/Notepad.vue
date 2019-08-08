<template>
  <div class="notepad" v-bind:class="{ 'show-preview': showPreview }">
    <textarea v-focus id="notepad-content" :value="content" @input="updatePreview"></textarea>
    <div class="preview" v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import marked from "marked";
import purify from "dompurify";

export default {
  name: "Calculator",
  data() {
    return {
      content: "",
      showPreview: true
    };
  },
  computed: {
    compiledMarkdown: function() {
      return purify.sanitize(marked(this.content));
    }
  },
  watch: {
    content: {
      handler() {
        localStorage.setItem('classic::notes', JSON.stringify(this.content))
      }
    }
  },
  methods: {
    updatePreview(e) {
      this.content = e.target.value;
    }
  },
  mounted() {
    const data = localStorage.getItem('classic::notes')
    if (data) {
      this.content = JSON.parse(data)
    }
  }
};
</script>

<style lang="stylus">

.notepad {
  height: 100%;
  font-size: 0;
  display: flex;
}

textarea {
  width: 100%;
  height: 100%;
  font-size: 12px;
  padding: 5px;
  line-height: 1.25;
  resize: none;
  border-none()
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
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  font-size: 12px;
  font-weight: 100;
  border-left: 1px solid $pepper600;
  padding: 0 20px;
  word-break: break-word;

  h1, h2, h3, h4, h5, h6 {
    position: relative;

    &::before {
      position: absolute;
      left: -15px;
      font-size: 10px;
      font-alternate()
      color: $pepper100;
    }
  }

  h1::before {
    content: 'h1';
  }

  h2::before {
    content: 'h2';
  }

  h3::before {
    content: 'h3';
  }

  h4::before {
    content: 'h4';
  }

  h5::before {
    content: 'h5';
  }

  h6::before {
    content: 'h6';
  }
}
</style>
