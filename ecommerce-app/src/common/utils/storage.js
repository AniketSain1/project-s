export const getFromStorage = key => JSON.parse(localStorage.getItem(key));
export const setToStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const removeFromStorage = key => localStorage.removeItem(key);
