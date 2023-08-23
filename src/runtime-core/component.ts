import { initProps } from "./componentProps";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";
import { shallowReadonly } from "../reactivity/reactive";
import { emit } from "./componentEmit";

export function createComponentInstance(vnode: any) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    emit: () => {},
  };
  component.emit = emit.bind(null, component) as any;
  return component;
}

export function setupComponent(instance) {
  initProps(instance, instance.vnode.props);
  // initSlots
  setupStatefulComponent(instance); // 初始化一个有状态的 component
  // 初始化一个函数组件
}
function setupStatefulComponent(instance: any) {
  const Component = instance.type;

  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);

  const { setup } = Component;
  if (setup) {
    // 因为用户不一定会写 setup 所以要判断一下
    // setup 可能是 Object 也可能是 function
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    }); // props表层是不可变的,但深层次是可变的，所以用shallowReadonly处理,

    handleSetupResult(setupResult, instance);
  }
}

function handleSetupResult(setupResult: any, instance: any) {
  // TODO 后续实现 function
  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }
  // 保证组件的render一定是有值的
  finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
  const Component = instance.type;

  instance.render = Component.render;
}
