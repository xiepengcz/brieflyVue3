import { hasChanged, isObject } from "../shared";
import { isTracking, trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
  private _value: any;
  private _rawValue: any;
  private __v_isRef = true;
  public dep;
  constructor(value) {
    // 如果value 是一个对象，则转成 reactive
    this._rawValue = value;
    this._value = convert(value);
    this.dep = new Set();
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newValue) {
    // 只有新值和旧值不一样时，才会触发响应
    if (hasChanged(this._rawValue, newValue)) {
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffects(this.dep);
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}

export function ref(value) {
  return new RefImpl(value);
}

export function isRef(ref) {
  return !!ref.__v_isRef;
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref;
}

export function proxyRefs(objectWithRef) {
  return new Proxy(objectWithRef, {
    get(target, key) {
      // get 的是ref就返回 .value 否则就返回原本的值
      return unRef(Reflect.get(target, key));
    },
    set(target, key, value) {
      // set 的是ref就set .value
      // 如果 set的值变成了 ref，就直接替换成 ref
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value);
      } else {
        return Reflect.set(target, key, value);
      }
    },
  });
}
