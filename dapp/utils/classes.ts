export class LocalStorage {
  static get(key: string) {
    let value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }
  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
