import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';


const recordStore = {
  // record store
  recordList: [] as RecordItem[],
  fetchRecord() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList;
  },
  saveRecord() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.time = new Date().toISOString();
    this.recordList?.push(record2);
    recordStore.saveRecord();
  }
};

recordStore.fetchRecord();

export default recordStore;