export const extend = Object.assign;

export const isObject = (val) => {
  return val !== null && typeof val === "object";
};

export const hasChanged = (val, newVal) => {
  return !Object.is(val, newVal); // Object.is 可以判断-0 和 0，=== 不能判断
};

export const hasOwn = (val, key) =>
  Object.prototype.hasOwnProperty.call(val, key);
