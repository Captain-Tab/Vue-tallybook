<template>
  <div CLASS="numberPad">
    <div class="output">￥{{outputText}}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="removeText">
        <Icon class="icon-inside" name="删除"/>
      </button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="cleanText">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="okMethod" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    @Prop(Number) readonly value!: number;
    outputText = this.value.toString();

    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const inputText = button.textContent as string;
      if (this.outputText.length === 16) {return;}
      if (this.outputText === '0') {
        if ('0123456789'.indexOf(inputText) >= 0) {
          this.outputText = inputText;
        } else {
          this.outputText += inputText;
        }
        return;
      }
      if (this.outputText.indexOf('.') >= 0 && inputText === '.') {return;}
      this.outputText += inputText;
    }

    removeText() {
      if (this.outputText.length === 1) {
        this.outputText = '0';
      } else {
        this.outputText = this.outputText.slice(0, -1);
      }
    }

    cleanText() {
      this.outputText = '0';
    }

    okMethod() {
      const number = parseFloat(this.outputText)
      this.$emit('update:value', number);
      this.$emit('submit', number);
      this.outputText = '0';
    }
  }

</script>

<style lang="scss" scoped>
  @import "../../assets/style/helper";

  .numberPad {
    .output {
      @extend %clearFix;
      @extend %innerShadow;
      font-size: 36px;
      font-family: Consolas, monospace;
      padding: 9px 16px;
      text-align: right;
      height: 72px;
    }

    .buttons {
      @extend %clearFix;

      > button {
        width: 25%;
        height: 64px;
        float: left;
        font-family: $font-hei;
        background: transparent;
        border: none;

        &.ok {
          height: 64*2px;
          float: right;
        }

        &.zero {
          width: 25*2%;
        }

        $bg: #f2f2f2;

        &:nth-child(1) {
          background: $bg;
        }

        &:nth-child(2), &:nth-child(5) {
          background: darken($bg, 4%);
        }

        &:nth-child(3), &:nth-child(6), &:nth-child(9) {
          background: darken($bg, 4*2%);
        }

        &:nth-child(4), &:nth-child(7), &:nth-child(10) {
          background: darken($bg, 4*3%);
        }

        >.icon-inside {
          width: 5em;
          height: 2em;
        }

        &:nth-child(8), &:nth-child(11), &:nth-child(13) {
          background: darken($bg, 4*4%);
        }

        &:nth-child(14) {
          background: darken($bg, 4*5%);
        }

        &:nth-child(12) {
          background: darken($bg, 4*6%);
        }

        &:nth-child(15) {
          background: darken($bg, 4*7%);
        }

        &:nth-child(16) {
          background: darken($bg, 4*10%);
        }
      }
    }
  }
</style>