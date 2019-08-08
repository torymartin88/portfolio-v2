<template>
  <div class="dock-item" :class="{ open: open }" @click="onClick">
    <div class="icon">
      <i :class="iconClass"></i>
    </div>
    <!-- <font-awesome-icon :icon="['far', icon]" /> -->
    <span class="indicator"></span>
    <div class="tooltip">{{appName}}</div>
  </div>
</template>

<script>
export default {
  name: "DockItem",
  props: {
    icon: {
      type: Object,
      default: null,
      required: true
    },
    appName: {
      type: String,
      default: null,
      required: true
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  },
  computed: {
    iconClass() {
      return `fad fa-${this.icon.name} ${
        this.icon.swapOpacity ? "fa-swap-opacity" : ""
      }`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.dock-item {
  position: relative;
  width: 45px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 250ms ease-out;

  &:hover {
    .icon {
      background: $salt600;
      transition: all 100ms ease-in-out;
      transform: translateY(-2px);
    }

    .tooltip {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .icon {
    background: $salt500;
    border-radius: 3px;
    padding: 4px;
    display: flex;
    align-items: center;
    transition: all 250ms ease-in-out;
    height: 30px;
    border-mixin($pepper400);
    box-shadow-inset();
  }

  i {
    --fa-primary-color: $pepper500;
    --fa-secondary-color: $pepper500;
  }

  svg {
    transition: all 100ms ease-in-out;
    width: 30px;
  }

  .indicator {
    width: 4px;
    height: 4px;
    background: $pepper200;
    margin-top: 3px;
    transition: opacity 250ms ease-in-out;
    opacity: 0;
    border-radius: 2px;
  }

  .tooltip {
    position: absolute;
    top: -28px;
    background: $black75;
    color: $salt100;
    padding: 3px 7px;
    border-radius: 4px;
    display: block;
    font-family: Arial;
    font-size: 12px;
    text-transform: capitalize;
    font-weight: 600;
    transform: translateY(8px);
    opacity: 0;
    white-space: nowrap;
    transition: opacity 30ms ease-out, transform 200ms ease-out;
  }

  &.open {
    .icon {
      animation: bounce 1s cubic-bezier(0.5, 0.2, 0.3, 1.0);
      animation-iteration-count: 1;

    }  

    .indicator {
      opacity: 1;
    }
  }
}

@keyframes bounce {
  0%, 40%, 80% {
    transform: translateY(-3px);
  }

  20%, 60%, 100% {
    transform: translateY(0);
  }
}

// themes
.theme-black {
  .dock-item {
    .icon {
      background: $pepper550;
      box-shadow-inset($pepper500, $pepper400, $black25)
      border-mixin($pepper600);
    }

    i {
      --fa-primary-color: $salt500;
      --fa-secondary-color: $salt500;
    }

    svg path {
      fill: $salt300;
    }

    .indicator {
      background: $salt600;
    }
  }
}
</style>
