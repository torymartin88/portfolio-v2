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
                <button class="calculator-btn gray action" @click="del()">del</button>
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
      }
  },
  mounted() {
    let btns = document.querySelectorAll(".btn");
    for (btn of btns) {
      btn.addEventListener("click", function() {
        this.classList.add("animate");
        this.classList.add("resetappearanim");
      });
      btn.addEventListener("animationend", function() {
        this.classList.remove("animate");
      });
    }
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
      if (this.tempResult != "") {
        this.calculation = this.tempResult;
        //this.tempResult = ''
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
      return 50 - this.tempResult.length * 1.25;
    }
  },
  filters: {
    hugeNumber: value => {
      let parts = value.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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

<style lang="stylus">


$darker = #2f2f31 
$dark = #424345
$gray = #616163
$white = #fff
$light = #D4D4D2
$accent = #f49e3f

.calculator {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    padding: 6px;
    flex-direction: column;
    background-color: $light;
}

    .calculator-total {
        text-align: right;
        height: 46px;
    }

    .calculator-input {
        color: $darker;
        width: 100%;
        border: 1px solid black;
        padding: 5px;
        display: block;
        flex-grow: 1;
        font-size: 16px;
        text-align: right;
        margin-bottom: 5px;

        &:focus, &:active {
            outline: none;
        }
    }

    .calculator-row {
        display: flex;
        padding: 0;
        justify-content: space-around;
        margin-left: -2.5px;
        margin-right: -2.5px;

        .calculator-col {
            flex: 1;
            box-shadow: 0 0 0 1px $darker;
            margin: 5px;
            &.wide { flex: 2; }
        }
    }

    .calculator-btn {
        width: 100%;
        border: none;
        cursor: pointer;
        padding: 4px;
        outline: none;
        font-size: 16px;
        transition: all .3s ease-in-out;
        justify-content: center;
        background-color: $white;
        box-shadow: 2px 2px 0 1px rgba(0,0,0,1);

        &:active { }

        &.accent {
            background-color: $accent;
            color: $white;
        }

        &.gray {
            background-color: $dark;
            color: $white;
        }

        &.action { }
    }

@keyframes fade {
  from {
    background: #1e2022;
  }

  to {
    background: #1939f6;
  }
}

@keyframes fadeThird {
  from {
    // background: #1e2022;
    background: #ffffff;
  }

  to {
    background: #1e2022;
  }
}

@keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes bounce {
  from, 20%, 40%, 60%, 80%, to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
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

@media screen and (max-width: 500px) {
  #app {
    transform: scale(0.8) translateY(-50px);
  }
}

*::selection {
  background: #1939f6;
  color: #ffffff;
}

[v-cloak] {
  display: none;
}
</style>