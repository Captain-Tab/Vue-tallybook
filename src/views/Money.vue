<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="SaveRecord"/>
    <FormItem field-name="备注"
              placeholder="在这里输入"
              @update:value="onUpdateFormItem"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <Types :value.sync="record.type"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/money/NumberPad.vue';
  import Types from '@/components/money/Types.vue';
  import FormItem from '@/components/money/FormItem.vue';
  import Tags from '@/components/money/Tags.vue';
  import {Component} from 'vue-property-decorator';

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


  @Component({
    components: {Tags, FormItem, Types, NumberPad}
  })
  export default class Money extends Vue {
    tags = window.tagList;
    recordList = window.recordList;
    record: RecordItem = {
      tags: [],
      note: '',
      type: '-',
      amount: 0
    };

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateFormItem(value: string) {
      this.record.note = value;
    }

    SaveRecord() {
      window.createRecord(this.record);
    }

  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
