<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="SaveRecord"/>
    <Notes field-name="备注"
           placeholder="在这里输入"
           @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <Types :value.sync="record.type"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/money/NumberPad.vue';
  import Types from '@/components/money/Types.vue';
  import Notes from '@/components/money/Notes.vue';
  import Tags from '@/components/money/Tags.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';

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

  const recordList = recordListModel.fetch();
  const tagList = tagListModel.fetch();

  @Component({
    components: {Tags, Notes, Types, NumberPad}
  })
  export default class Money extends Vue {
    tags = tagList;
    recordList: RecordItem[] = recordList;
    record: RecordItem = {
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
      const record2 = recordListModel.clone(this.record);
      record2.time = new Date();
      this.recordList.push(record2);
    }

    @Watch('recordList')
    onRecordListChanged() {
      recordListModel.save(this.recordList);
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
