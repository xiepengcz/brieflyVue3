import { track, trigger } from "./effect";

export function reactive(raw) {
  // raw:未经加工的对象
  // 关于 Proxy 的学习文档 https://es6.ruanyifeng.com/?search=reflect&x=0&y=0#docs/proxy
  return new Proxy(raw, {
    get(target, key) {
      const res = Reflect.get(target, key);
      track(target, key);
      return res;
    },
    set(target, key, value) {
      const res = Reflect.set(target, key, value);
      trigger(target, key);

      return res;
    },
  });
}
