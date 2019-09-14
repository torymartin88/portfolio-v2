<template>
  <div class="notepad" v-bind:class="{ 'show-preview': showPreview }">
    <textarea v-focus id="notepad-content" :value="activeNote.content" @input="updatePreview"></textarea>
    <div class="preview" v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import marked from "marked";
import purify from "dompurify";

export default {
  name: "Notepad",
  data() {
    return {
      showPreview: true,
      timeout: null,
      activeNoteId: 0
    };
  },
  computed: {
    compiledMarkdown: function() {
      return purify.sanitize(marked(this.activeNote.content));
    },
    activeNote: {
      get() {
        let value = this.$store.getters['notepad/getActiveNote'];

        if (value) {
          return value
        } else {
          this.$store.dispatch('notepad/createNote');
          return { content: '' };
        }
      },
      set: function(value) {
        const self = this;
        // debounce to avoid mutations every keystroke
        self.$store.dispatch('notepad/updateNoteContent', {
          id: self.activeNoteId,
          content: value
        })
      }
    },
    notes() {
      return this.$store.state.notepad.notes;
    },
  },
  methods: {
    updatePreview(e) {
      this.localNote = e.target.value;
      this.activeNote = e.target.value;
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
