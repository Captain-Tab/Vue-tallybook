<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="SaveRecord"/>
    <FormItem field-name="备注"
              placeholder="在这里输入"
              @update:value="onUpdateFormItem"/>
    <Tags/>
    <Types :value.sync="record.type"/>
    {{count}}
    <button @click="add">+1</button>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/money/NumberPad.vue';
  import Types from '@/components/money/Types.vue';
  import FormItem from '@/components/money/FormItem.vue';
  import Tags from '@/components/money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import oldStore from '@/store/index2';
  import store from '@/store/index.ts';


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
    components: {Tags, FormItem, Types, NumberPad},
    computed: {
      count() {
        return store.state.count;
      },
    }
  })
  export default class Money extends Vue {
    record: RecordItem = {
      tags: [],
      note: '',
      type: '-',
      amount: 0
    };

    onUpdateFormItem(value: string) {
      this.record.note = value;
    }

    SaveRecord() {
      oldStore.createRecord(this.record);
    }

    add() {
      store.commit('increment', 1);
    }c

  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
