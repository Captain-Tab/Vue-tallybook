import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store = {
  // record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.create(record),
  // tag store
  tagList: tagListModel.fetch(),
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'success') {
      window.alert('新增标签成功');
    } else if (message === 'name is duplicated'){
      window.alert('重复的标签名，新增失败');
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  }
};

export default store;