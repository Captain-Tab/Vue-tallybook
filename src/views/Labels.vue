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
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/money/Button.vue';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';

  @Component({
    components: {Button},
  })
  export default class Labels extends mixins(TagHelper) {
    get tags(){
      return this.$store.state.tagList;
    }
    beforeCreate() {
      this.$store.commit('fetchTags');
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