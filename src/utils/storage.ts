export const localGetItem = (item: string) => {
  if (item) {
    return sessionStorage.getItem(item);
  }
};

export const localSetItem = (item: string, value: any) => {
  sessionStorage.setItem(item, value);
};

export const localDeleteItem = (item: string) => {
  sessionStorage.removeItem(item);
};

export const localClearStorage = () => {
  sessionStorage.clear();
};
