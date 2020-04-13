import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class TagHelper extends Vue {
  createTag() {
    const inputValue = window.prompt('请输入要新增的标签名');
    if (!inputValue) {return window.alert('标签名不能为空');}
    this.$store.commit('createTag', inputValue);
  }
}

export default TagHelper;