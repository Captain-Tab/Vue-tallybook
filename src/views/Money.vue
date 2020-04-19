<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="SaveRecord"/>
    <FormItem field-name="备注"
              placeholder="在这里输入"
              :input-value.sync="record.note">
    </FormItem>
    <Tags @update:value="record.tags=$event"/>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/money/NumberPad.vue';
  import FormItem from '@/components/money/FormItem.vue';
  import Tags from '@/components/money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import recordTypeList from '@/constants/recordTypeList';
  import Tabs from '@/components/Tabs.vue';


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
    components: {Tabs, Tags, FormItem, NumberPad},
  })
  export default class Money extends Vue {
    get tagList() {
      return this.$store.state.tagList;
    }

    recordTypeList = recordTypeList;
    record: RecordItem = {
      tags: [],
      note: '',
      type: '-',
      amount: 0
    };

    created() {
      this.$store.commit('fetchRecord');
    }


    onUpdateFormItem(value: string) {
      this.record.note = value;
    }

    SaveRecord() {
      if (!this.record.tags || this.record.tags.length === 0) {
        return window.alert('请至少选择一个标签');
      }
      this.$store.commit('createRecord', this.record);
      if (this.$store.state.createRecordError === null) {
        window.alert('数据已保存');
        this.record.note = '';
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
