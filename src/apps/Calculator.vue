<template>
    <div class="calculator">
        <div class="calculator-logs">
            <span v-for="log in logs" :key="log">{{ log }}</span>
        </div>

        <input type="string" class="calculator-input" v-model="value" @keyup.enter="getResult()">

        <div class="calculator-row">
            <div class="calculator-col">
                <button class="calculator-btn gray action" @click="clear()">C</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn gray action" @click="del()">del</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn gray action" @click="addExpresion('%')">%</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn accent action" @click="addExpresion('/')">/</button>
            </div>
        </div>
        <div class="calculator-row">
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(7)">7</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(8)">8</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(9)">9</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn accent action" @click="addExpresion('*')">*</button>
            </div>
        </div>
        <div class="calculator-row">
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(4)">4</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(5)">5</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(6)">6</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn accent action" @click="addExpresion('-')">-</button>
            </div>
        </div>
        <div class="calculator-row">
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(1)">1</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(2)">2</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(3)">3</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn accent action" @click="addExpresion('+')">+</button>
            </div>
        </div>
        <div class="calculator-row">
            <div class="calculator-col wide">
                <button class="calculator-btn" @click="addExpresion(0)">0</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn action" @click="addExpresion('.')">.</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn accent action" @click="getResult()">=</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Calculator',
    data() {
        return {
            headerName: 'Calculator',
            value: 0,
            logs: []
        }
    },
    methods: {
        addExpresion(e) {
            if (Number.isInteger(this.value))
                this.value = '';
            this.value += e;
        },
        getResult() {
            var log = this.value;
            this.value = eval(this.value);
            this.logs.push(log + ("=" + this.value));
        },
        clear() {
            this.value = 0;
        },
        del() {
            this.value = this.value.slice(0, -1);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
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
    font-family: 'charcoal'
}

    .calculator-logs {
        height: 80px;
        display: flex;
        position: relative;
        overflow: hidden;
        align-items: flex-end;
        flex-direction: column;
        justify-content: flex-end;
        display: none;

        &:before {
            top: 0;
            left: 0;
            right: 0;
            height: 48px;
            content: '';
            z-index: 5;
            position: absolute;      
            background: linear-gradient(to bottom, $darker, rgba($darker, 0));
        }

        span {
            color: $light;
            opacity: .75;
            display: block;
            font-size: 16px;
            text-align: right;
            margin-top: .4rem;
            line-height: 1;
            font-weight: lighter;
        }
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

</style>
