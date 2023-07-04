export const setLocalStorageItem = (key: string, value: any): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error setting localStorage item:", error);
  }
};

export const getLocalStorageItem = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue) {
      return JSON.parse(serializedValue) as T;
    }
    return null;
  } catch (error) {
    console.error("Error getting localStorage item:", error);
    return null;
  }
};
