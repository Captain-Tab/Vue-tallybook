import tagListModel from '@/models/tagListModel';

export default {
  // tag store
  tagList: tagListModel.fetch(),
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'success') {
      window.alert('新增标签成功');
    } else if (message === 'name is duplicated') {
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