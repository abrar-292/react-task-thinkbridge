import { Inventory } from '../types/data';

type Key = 'inventoryData';

type Values = {
  data: Inventory[];
};

function removeItem(key: Key) {
  window.localStorage.removeItem(key);
}

// @ts-ignore
function setItem<K extends Key>(key: K, value: Values[K]) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

// @ts-ignore
function getItem<K extends Key>(key: K): Values[K] | null {
  const rawValue = window.localStorage.getItem(key);

  if (rawValue === null) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch (err) {
    // Probably JSON.parse error.
    // Remove this item from local storage since it's useless.
    if (rawValue !== null) {
      removeItem(key);
    }
  }

  return null;
}

const localStorage = {
  getItem,
  removeItem,
  setItem,
};

export default localStorage;
