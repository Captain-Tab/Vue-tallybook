import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

// record store
window.recordList = recordListModel.fetch();
window.createRecord = (record: RecordItem)=> recordListModel.create(record);

// tag store
window.tagList = tagListModel.fetch();
window.findTag = (id: string) => {
  return window.tagList.filter(t => t.id === id)[0];
};
window.createTag = (name: string) => {
  const message = tagListModel.create(name);
  if (message === 'success') {
    window.alert('新增标签成功');
  } else if (message === 'name is duplicated') {
    window.alert('重复的标签名，新增失败');
  }
};
window.removeTag = (id: string) => {
  return tagListModel.remove(id);
};
window.updateTag = (id: string, name: string) => {
  return tagListModel.update(id, name);
};


new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app');
