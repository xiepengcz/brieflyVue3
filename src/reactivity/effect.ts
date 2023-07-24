import { extend } from "../shared";

let activeEffect;
let shouldTract;

class ReactiveEffect {
  private _fn: any;
  deps = [];
  active = true; // 判断是否已经清空过了
  onStop?: () => void; // 当执行 stop 后 ，会执行一次 onStop
  constructor(fn, public scheduler?) {
    this._fn = fn;
  }
  run() {
    // 此时会收集依赖
    if (!this.active) {
      // stop状态下不收集依赖
      return this._fn();
    }
    activeEffect = this;
    shouldTract = true;
    const result = this._fn();
    // reset
    shouldTract = false;
    return result;
  }
  stop() {
    if (this.active) {
      // 防止外部用户多次调用清空，如果多次调用，实际只清空一次
      cleanupEffect(this); // 清除收集的依赖
      if (this.onStop) {
        // 如果传入了 onStop, 就调用 onStop
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
  effect.deps.length = 0;
}

const targetMap = new Map();
export function track(target, key) {
  if (!isTracking()) return;

  // target -> key -> dep
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    // 如果不存在，就初始化一个
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  // 使用Set数据结构来保存依赖 fn不能重复
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  if (dep.has(activeEffect)) return;
  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}

function isTracking() {
  return shouldTract && activeEffect !== undefined;
}

export function trigger(target, key) {
  // 取出dep，遍历 fn
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

export function effect(fn, options: any = {}) {
  // fn依赖收集
  const _effect = new ReactiveEffect(fn, options.scheduler);

  extend(_effect, options);
  _effect.run();
  const runner: any = _effect.run.bind(_effect); // 这里存在this指向 使用bind修改this指向
  runner.effect = _effect;
  return runner;
}

export function stop(runner) {
  runner.effect.stop();
}
