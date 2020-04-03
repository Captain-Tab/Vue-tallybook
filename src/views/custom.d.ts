type RecordItem = {
  tags?: string[];
  note: string;
  type: string;
  amount: number;
  time?: Date;
}

type Tag = {
  id: string;
  name: string;
}

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'name is duplicated'; // success 表示成功， duplicated 表示name重复
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  remove: (id: string) => boolean;
  save: () => void;
}

interface Window {
  tagList: Tag[];
  findTag: (id: string) => Tag | undefined;
  createTag: (name: string) => void;
  removeTag: (id: string) => boolean;
  updateTag: TagListModel['update'];
}