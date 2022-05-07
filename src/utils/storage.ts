const SessionStorage = {
  set: <T>(key: string, value: T): void => {
    sessionStorage.setItem(key, JSON.stringify(value as T));
  },

  get: <T>(key: string): T | null => {
    const value = sessionStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  },

  remove: (key: string): void => {
    sessionStorage.removeItem(key);
  },

  clear: (): void => {
    sessionStorage.clear();
  },
};

const LocalStorage = {
  set: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value as T));
  },

  get: <T>(key: string): T | null => {
    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },
};

export {
  SessionStorage,
  LocalStorage,
};
