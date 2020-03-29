<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad @update:value="onUpdateAmount"/>
    <Types :value.sync ="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/money/NumberPad.vue';
  import Types from '@/components/money/Types.vue';
  import Notes from '@/components/money/Notes.vue';
  import Tags from '@/components/money/Tags.vue';
  import {Component} from 'vue-property-decorator';

  type Record = {
    tags?: string[];
    note: string;
    type: string;
    amount: number;
  }
  @Component({
    components: {Tags, Notes, Types, NumberPad}
  })
  export default class Money extends Vue {
    name = 'Money';
    record: Record = {
      tags: [],
      note: '',
      type: '-',
      amount: 0
    };
    onUpdateTags(value: string[]) {
      this.record.tags = value
    }

    onUpdateNotes(value: string) {
      this.record.note = value
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value)
    }

    data() {
      return {
        tags: ['服装', '饮食', '住宿', '交通', '话费']
      };
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
