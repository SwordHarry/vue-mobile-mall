const storage = window.localStorage;

function serialize(val) {
  return JSON.stringify(val);
}

function deserialize(val) {
  if (typeof val !== 'string') {
    return undefined;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return val || undefined;
  }
}

export default {
  set(key, value) {
    if (value === undefined) {
      return;
    }
    storage.setItem(key, serialize(value));
  },
  get(key, def) {
    const val = deserialize(storage.getItem(key));
    return val === undefined ? def : val;
  },
  remove(key) {
    storage.removeItem(key);
  },
  clear() {
    storage.clear();
  }
};
