<template>
  <div>
    <Layout>
      <ol class="tags">
        <li v-for="tag in tags" :key="tag">
          <span>{{tag}}</span>
        </li>
      </ol>
      <div class="moreTag-wrapper">
        <button class="moreTag" @click="createTag">新增标签</button>
      </div>
    </Layout>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';

  tagListModel.fetch();
  @Component
  export default class Labels extends Vue {
    tags = tagListModel.data;

    createTag() {
      const name = window.prompt('请输入标签名');
      if (name) {
        const message = tagListModel.create(name);
        if(message === 'success'){
          window.alert('新增标签成功')
        }else if (message === 'name is duplicated'){
          window.alert('重复的标签名，新增失败')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/style/helper.scss";

  .tags {
    font-size: 16px;
    padding-left: 16px;


    > li {
      min-height: 44px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
    }
  }

  .moreTag-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;

    > .moreTag {
      background: #767676;
      color: white;
      border-radius: 2px;
      border: none;
      height: 40px;
      padding: 0 16px;
    }

    .moreTag.active {
      color: red;
    }

  }


</style>