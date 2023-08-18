import { render } from "./renderer";
import { createVNode } from "./vnode";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // component -> vnode
      // 先转换成vnode , 在vue中 所有的逻辑操作都会基于 vnode做处理
      const vnode = createVNode(rootComponent);

      render(vnode, rootContainer);
    },
  };
}

