<template>
  <div class="Nav-wrapper" :class=" classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class=" classPrefix && `${classPrefix}-content`">
      <slot></slot>
    </div>
    <Nav/>
  </div>

</template>

<script lang="ts">
  export default {
    props: ['classPrefix'],
    name: 'Layout'
  };
</script>

<style lang="scss" scoped>
  .Nav-wrapper{
    display: flex;
    flex-direction: column;
    height: 100vh
  }
  .content{
    overflow: auto;
    flex-grow: 1;
  }
</style>