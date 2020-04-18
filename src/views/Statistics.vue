<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div>
      <ol>
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">{{beautify(group.title)}}
            <span>￥{{group.total}}</span>
          </h3>
          <ol>
            <li class="record" v-for="item in group.items" :key="item.id">
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.note}}</span>
              <span>￥{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </Layout>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import Vue from 'vue';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';


  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('MM月DD日');
      } else {
        return day.format('YYYY年MM月DD日');
      }
    }


    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.join(',');
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      type Result = { title: string; total?: number; items: RecordItem[] }[]

      const {recordList} = this;
      if (recordList.length === 0) {return [];}


      const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.time).valueOf() - dayjs(a.time).valueOf());
      const result: Result = [{title: dayjs(newList[0].time).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.time), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.time).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum,item)=>sum + item.amount,0);
      });
      return result;
    }

    beforeCreate() {
      this.$store.commit('fetchRecord');
    }


    type = '-';
    recordTypeList = recordTypeList;
  }
</script>

<style lang="scss" scoped>
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    @extend %item;
  }

  .record {
    background: white;
    @extend %item;
  }

  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }

  ::v-deep {
    .type-tabs-item {
      background: #c4c4c4;

      &.selected {
        background: white;

        &::after {
          display: none;
        }
      }
    }

    .interval-tabs-item {
      height: 48px;
    }

  }

</style>