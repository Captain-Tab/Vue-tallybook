<template>
  <Layout class-prefix="layout">
    <NumberPad/>
    <Types/>
    <Notes/>
    <Tags :data-source.sync="tags"/>
  </Layout>
</template>

<script>
  import NumberPad from '@/components/money/NumberPad.vue'
  import Types from '@/components/money/Types.vue'
  import Notes from '@/components/money/Notes.vue'
  import Tags from '@/components/money/Tags.vue'

  export default {
    name: 'Money',
    components: {Tags, Notes, Types, NumberPad},
    data() {
      return {
        tags: ['服装', '饮食', '住宿', '交通','话费']
      }
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
