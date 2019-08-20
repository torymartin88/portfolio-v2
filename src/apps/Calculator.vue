<template>
  <div class="calculator">
    <div
      class="calculator-total"
      :style="{fontSize : fontSize + 'px'}"
      v-cloak
    >{{ tempResult | number | hugeNumber }}</div>

    <div class="calculator-input" v-cloak>{{ calculation | number | calculation | blank}}</div>
    <div class="btn-container">
      <div class="calculator-row" v-for="(row, i) in keypad" :key="i">
        <div class="calculator-col" :class="{ 'wide' : button.wide }" v-for="(button, j) in row" :key="j">
          <button class="calculator-btn" :class="button.classes" @click="getAction(button.action, button.label)">{{button.label}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

String.prototype.replace

export default {
  name: "Calculator",
  data() {
    return {
      calculation: "",
      tempResult: "0",
      keypad: [
        [{ label: 'C', action: 'clear', classes: 'gray action' }, { label: 'del', action: 'backspace', classes: 'gray action' }, { label: '%', classes: 'gray action' }, { label: '/', classes: 'accent action' }],
        [{ label: '7' }, { label: '8' }, { label: '9' }, { label: '*', classes: 'accent action' }],
        [{ label: '4' }, { label: '5' }, { label: '6' }, { label: '-', classes: 'accent action' }],
        [{ label: '1' }, { label: '2' }, { label: '3' }, { label: '+', classes: 'accent action' }],
        [{ label: '0', wide: true }, { label: '.' }, { label: '=', action: 'getResult', classes: 'accent action' }],
      ]
    };
  },
  methods: {
    append(value) {
      this.calculation += value.toString();
    },
    clear() {
      this.calculation = "";
      this.tempResult = "";
    },
    getResult() {
      if (this.tempResult !== "") {
        this.calculation = this.tempResult;
      }
    },
    backspace() {
      this.calculation = this.calculation.slice(0, -1);
    },
    getAction(action, label) {
      if (action) {
        // call function named 'action'
        this[action]()
      } else {
        // append button to stack
        this.append(label)
      }

    }
  },
  watch: {
    calculation() {
      if (
        this.calculation !== "" &&
        !isNaN(this.calculation.slice(-1)) &&
        this.calculation != this.result
      ) {
        this.tempResult = this.result.toString();
      }
    }
  },
  computed: {
    result() {
      if (!isNaN(this.calculation.slice(-1))) return eval(this.calculation);
      else return eval(this.calculation.slice(0, -1));
    },
    fontSize() {
      return 43 - (this.tempResult.length * 1.25);
    }
  },
  filters: {
    hugeNumber: value => {
      let parts = value.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "");
      return parts.join(".");
    },

    number: value => value.replaceAll("*", "x"),

    calculation: value => value
      .replaceAll("x", " x ")
      .replaceAll("/", " / ")
      .replaceAll("+", " + ")
      .replaceAll("-", " - "),

    blank: value => (value === '') ? 'Enter Calculation' : value
  }
};
</script>

<style lang="stylus" scoped>
.calculator {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  padding: 6px;
  flex-direction: column;
}

.calculator-total {
  text-align: right;
  height: 50px;
  word-break: break-all;
}

.calculator-input {
  color: $pepper500;
  width: 100%;
  border-mixin()
  padding: 5px;
  display: block;
  font-size: 16px;
  text-align: right;
  margin-bottom: 5px;
  max-height: 55px;
  overflow-y: auto;
  min-height: 27px;

  &:focus, &:active {
    outline: none;
  }
}

.btn-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.calculator-row {
  display: flex;
  padding: 0;
  justify-content: space-around;
  flex-grow: 1;

  .calculator-col {
    height: 100%;
    padding: 1px;
    width: 25%;

    &.wide {
      width: 50%;
    }
  }
}

.calculator-btn {
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 4px;
  outline: none;
  font-size: 16px;
  transition: all 20ms ease-in-out;
  justify-content: center;
  background: $salt100;
  border-radius: 0;
  border-mixin()

  &:hover {
    background: darken($salt100, 5%);
  }

  &:active, &:focus {
    background: darken($salt100, 10%);
  }

  &:focus {
    box-shadow: none;
  }

  &.accent {
    background-color: $tangerine400;
    color: $salt100;

    &:hover {
      background: darken($tangerine400, 5%);
    }

    &:active, &:focus {
      background: darken($tangerine400, 10%);
    }
  }

  &.gray {
    background-color: $pepper400;
    color: $salt100;

    &:hover {
      background: darken($pepper400, 5%);
    }

    &:active, &:focus  {
      background: darken($pepper400, 10%);
    }
  }

  &.action {
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

*:focus {
  outline: none;
}

[v-cloak] {
  display: none;
}
</style>
