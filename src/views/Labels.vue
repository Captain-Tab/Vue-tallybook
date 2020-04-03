<template>
  <div>
    <Layout>
      <div class="tags">
        <router-link class="tag"
                     v-for="tag in tags" :key="tag.id"
                     :to="`/labels/edit/${tag.id}`">
          <span>{{tag.name}}</span>
          <Icon name="right"/>
        </router-link>
      </div>
      <div class="button-wrapper">
        <Button @click="createTag">新建标签</Button>
      </div>
    </Layout>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import Button from '@/components/money/Button.vue';

  @Component({
    components: {Button}
  })
  export default class Labels extends Vue {
    tags = window.tagList;

    createTag() {
      const name = window.prompt('请输入标签名');
      if (name) {
        const message = tagListModel.create(name);
        if (message === 'success') {
          window.alert('新增标签成功');
        } else if (message === 'name is duplicated') {
          window.alert('重复的标签名，新增失败');
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
    background: white;

    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;

      svg {
        width: 18px;
        height: 18px;
        color: #666;
        margin-right: 16px;
      }
    }
  }

  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>