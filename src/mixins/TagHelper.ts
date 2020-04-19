import Vue from 'vue';
import Component from 'vue-class-component';

const map: {[key: string]: string}= {
  'tag name is duplicated': '标签名重复了'
}

@Component
export class TagHelper extends Vue {
  createTag() {
    const inputValue = window.prompt('请输入要新增的标签名');
    if (!inputValue) {return window.alert('标签名不能为空');}
    this.$store.commit('createTag', inputValue);
    if(this.$store.state.createTagError){
      window.alert(map[this.$store.state.createTagError.message] || '未知错误')
    }
  }
}

export default TagHelper;