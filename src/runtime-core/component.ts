export function createComponentInstance(vnode: any) {
  const component = { vnode, type: vnode.type };
  return component;
}

export function setupComponent(instance) {
  // initProps
  // initSlots
  setupStatefulComponent(instance); // 初始化一个有状态的 component
  // 初始化一个函数组件
}
function setupStatefulComponent(instance: any) {
  const Component = instance.type;
  const { setup } = Component;
  if (setup) {
    // 因为用户不一定会写 setup 所以要判断一下
    // setup 可能是 Object 也可能是 function
    const setupResult = setup();

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
