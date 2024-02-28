class SessionStorageHandler {
  storage: Storage | undefined;

  constructor() {
    if (typeof window !== 'undefined') {
      this.storage = window.sessionStorage;
    }
  }

  get(key: string): string | null {
    return this.storage ? this.storage.getItem(key) : null;
  }

  set(key: string, value: any) {
    if (this.storage) {
      this.storage.setItem(key, value.toString());
    }
  }

  remove(key: string) {
    if (this.storage) {
      this.storage.removeItem(key);
    }
  }
}

export const sessionStorageHandler = new SessionStorageHandler();
