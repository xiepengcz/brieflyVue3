import { isObject } from "../shared/index";
import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from "./baseHandlers";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}

export function reactive(raw) {
  // raw:未经加工的对象

  return createReactiveObject(raw, mutableHandlers);
}

export function readonly(raw) {
  return createReactiveObject(raw, readonlyHandlers);
}

export function shallowReadonly(raw) {
  return createReactiveObject(raw, shallowReadonlyHandlers);
}

export function isReactive(value) {
  // 通过触发 get 操作来判断是否为 isReactive
  return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(value) {
  // 通过触发 get 操作来判断是否为 isReadonly
  return !!value[ReactiveFlags.IS_READONLY];
}

export function isProxy(value) {
  // 通过触发 get 操作来判断是否为 isReadonly
  return isReactive(value) || isReadonly(value);
}

function createReactiveObject(target, baseHandlers) {
  if (!isObject(target)) {
    console.warn(`target ${target} 必须是一个对象`);
    return target;
  }
  // 关于 Proxy 的学习文档 https://es6.ruanyifeng.com/?search=reflect&x=0&y=0#docs/proxy,
  return new Proxy(target, baseHandlers);
}
