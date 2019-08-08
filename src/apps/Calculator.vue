<template>
  <div class="calculator">
    <div
      class="calculator-total"
      :style="{fontSize : fontSize + 'px'}"
      v-cloak
    >{{ tempResult | number | hugeNumber }}</div>

    <div class="calculator-input" v-cloak>{{ calculation | number | calculation}}</div>
    <div class="btn-container">
      <div class="calculator-row">
        <div class="calculator-col">
          <button class="calculator-btn gray action" @click="clear()">C</button>
        </div>
        <div class="calculator-col">
          <button class="calculator-btn gray action" @click="backspace()">del</button>
        </div>
        <div class="calculator-col">
          <button class="calculator-btn gray action" @click="append('%')">%</button>
        </div>
        <div class="calculator-col">
          <button class="calculator-btn accent action" @click="append('/')">/</button>
        </div>
      </div>
      <div class="calculator-row">
        <div class="calculator-col">
          <button class="calculator-btn" @click="append(7)">7</button>
        </div>
        <div class="calculator-col">
          <button class="calculator-btn" @click="append(8)">8</button>
        </div>
        <div class="calculator-col">
          <button class="calculator-btn" @click="append(9)">9</button>
        </div>
        <div class="calculator-col">
          <button class="calculator-btn accent action" @click="append('*')">*</button>
        </div>
      </div>
      <div class="calculator-row">
        <div class="calculator-col">
          <button class="calculator-btn" @click="append(4)">4</button>
        </div>
        <div class="calculator-col">
          <button class="calculator-btn" @click="append(5)">5</button>
        </div>
        <div class="calculator-col">
          <button class="calculator-btn" @click="append(6)">6</button>
        </div>
        <div class="calculator-col">
          <button class="calculator-btn accent action" @click="append('-')">-</button>
        </div>
      </div>
      <div class="calculator-row">
        <div class="calculator-col">
          <button class="calculator-btn" @click="append(1)">1</button>
        </div>
        <div class="calculator-col">
          <button class="calculator-btn" @click="append(2)">2</button>
        </div>
        <div class="calculator-col">
          <button class="calculator-btn" @click="append(3)">3</button>
        </div>
        <div class="calculator-col">
          <button class="calculator-btn accent action" @click="append('+')">+</button>
        </div>
      </div>
      <div class="calculator-row">
        <div class="calculator-col wide">
          <button class="calculator-btn" @click="append(0)">0</button>
        </div>
        <div class="calculator-col">
          <button class="calculator-btn action" @click="append('.')">.</button>
        </div>
        <div class="calculator-col">
          <button class="calculator-btn accent action" @click="getResult()">=</button>
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

export default {
  name: "Calculator",
  data() {
    return {
      calculation: "",
      tempResult: "0"
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
    number: value => {
      return value.replaceAll("*", "x");
    },
    calculation: value => {
      return value
        .replaceAll("x", " x ")
        .replaceAll("/", " / ")
        .replaceAll("+", " + ")
        .replaceAll("-", " - ");
    }
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
