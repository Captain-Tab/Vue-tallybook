<template>
  <div>
  <Layout>
    <p>labels.vue</p>
  </Layout>
  </div>

</template>

<script lang="ts">
  export default {
    name: 'Labels'
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