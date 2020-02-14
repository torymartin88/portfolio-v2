<template>
  <div class="desktop-icon" :class="{ selected: isSelected }" @click="onClick" @dblclick="onDblClick">
    <i :class="iconClass" :style="iconStyle"></i>
    <span>{{text}}</span>
  </div>
</template>

<script>
export default {
  name: "DesktopIcon",
  props: {
    id: {
      type: Number,
      default: null,
      required: false
    },
    icon: {
      type: Object,
      default: null,
      required: true
    },
    text: {
      type: String,
      default: null,
      required: true
    },
    iconColor: {
      type: String,
      default: '#272838'
    },
    selected: {
      type: Boolean,
      default: false
    },
    action: {
      type: Object,
      default: function() {
        return {
          appName: 'Finder',
          args: 'projects'
        }
      }
    }
  },
  methods: {
    onClick() {
      this.$emit('click', { id: this.id, selected: !this.selected })
    },
    onDblClick() {
      this.$store.dispatch("openWindow", { appName: this.action.appName, args: this.action.args });
      this.$emit('dblclick', { id: this.id, selected: true });
    }
  },
  computed: {
    iconClass() {
      return `fad fa-${this.icon.name} ${
        this.icon.swapOpacity ? "fa-swap-opacity" : ""
      }`;
    },
    iconStyle() {
      return `--fa-primary-color: ${this.iconColor}; --fa-secondary-color: ${this.iconColor}; `;
    },
    isSelected() {
      return this.selected
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.desktop-icon {
  width: 80px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    margin-bottom: 6px;
  }

  span {
    background: $white75;
    font-alternate();
    font-size: 11px;
    padding: 0px 2px;
    user-select(none)
    border-mixin(transparent)
  }

  &.selected {
    svg {
      path {
        fill: $pepper600;
      }
    }

    span {
      background: $pepper600;
      color: $salt100;
      border-mixin($white25);
    }
  }
}
</style>
