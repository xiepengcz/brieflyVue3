import { isObject } from "../shared/index";
import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  // 调用 patch 方法, 方便后续的递归操作

  patch(vnode, container);
}
function patch(vnode: any, container: any) {
  // 处理组件
  // 判断是否为 element
  if (isObject(vnode.type)) {
    processComponent(vnode, container);
  } else processElement(vnode, container);
}
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container: any) {
  const instance = createComponentInstance(vnode);
  setupComponent(instance);
  setupRenderEffect(instance, container);
}
function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
  const el = document.createElement(vnode.type);
  // children 可以是string或者 array
  const { children, props } = vnode;
  if (typeof children === "string") {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    mountChildren(children, el);
  }
  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
  }
  container.append(el);
}
function mountChildren(children: any[], container: any) {
  children.forEach((v) => {
    patch(v, container);
  });
}

function setupRenderEffect(instance, container) {
  const { proxy } = instance;

  const subTree = instance.render.call(proxy);
  // vnode -> patch
  // 将vnode 变成 element  然后 mountElement
  patch(subTree, container);
}
