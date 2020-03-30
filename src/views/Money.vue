<template>
  <Layout class-prefix="layout">
    {{recordList}}
    <NumberPad :value.sync="record.amount" @submit="SaveRecord"/>
    <Types :value.sync="record.type"/>
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
  import {Component, Watch} from 'vue-property-decorator';




  /*if (version < '0.0.2') {
    const version = window.localStorage.getItem('version') || '0';
    // 数据库版本升级，数据迁移
    recordList.forEach(record => {
      record.time = new Date(2020, 0, 1);
    });
    // 保存数据
    window.localStorage.setItem('recordList', JSON.stringify(recordList));
  } else if (version === '0.0.2') {

  }
  window.localStorage.setItem('version', '0.0.2');
*/

  type Record = {
    tags?: string[];
    note: string;
    type: string;
    amount: number;
    time?: Date;
  }
  @Component({
    components: {Tags, Notes, Types, NumberPad}
  })
  export default class Money extends Vue {
    tags = ['服装', '饮食', '住宿', '交通', '话费'];
    recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    record: Record = {
      tags: [],
      note: '',
      type: '-',
      amount: 0
    };

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      this.record.note = value;
    }

    SaveRecord() {
      const record2 = JSON.parse(JSON.stringify(this.record));
      record2.time = new Date();
      this.recordList.push(record2);
    }

    @Watch('recordList')
    onRecordListChanged() {
      window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
