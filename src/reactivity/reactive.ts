import { mutableHandlers, readonlyHandlers } from "./baseHandlers";

export function reactive(raw) {
  // raw:未经加工的对象

  return createActiveObject(raw, mutableHandlers);
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers);
}

function createActiveObject(raw: any, baseHandlers) {
  // 关于 Proxy 的学习文档 https://es6.ruanyifeng.com/?search=reflect&x=0&y=0#docs/proxy,
  return new Proxy(raw, baseHandlers);
}
