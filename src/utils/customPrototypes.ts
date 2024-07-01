/* eslint-disable no-extend-native */

Array.prototype.get = function get(id: string) {
  return this.find(x => x['id'] === id);
};

Array.prototype.has = function has(id: string) {
  return (this.findIndex(x => x['id'] === id) > -1);
};

export {};
