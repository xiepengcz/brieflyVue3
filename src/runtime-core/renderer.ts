import { ShapeFlags } from "../shared/ShapeFlags";
import { isObject } from "../shared/index";
import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  // 调用 patch 方法, 方便后续的递归操作

  patch(vnode, container);
}
function patch(vnode, container: any) {
  const { shapeFlag } = vnode;
  // 处理组件
  // if (isObject(vnode.type)) {
  if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    processComponent(vnode, container);
    // 判断vnode是否为 element
    // } else if (typeof vnode.type === "string") {
  } else if (shapeFlag & ShapeFlags.ELEMENT) {
    processElement(vnode, container);
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
  const el = (vnode.el = document.createElement(vnode.type));
  // children 可以是string或者 array
  const { children, props, shapeFlag } = vnode;
  // if (typeof children === "string") {
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children;
    // } else if (Array.isArray(children)) {
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
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

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(initialVNode: any, container: any) {
  const instance = createComponentInstance(initialVNode);
  setupComponent(instance);
  setupRenderEffect(instance, initialVNode, container);
}

function setupRenderEffect(instance, initialVNode, container) {
  const { proxy } = instance;

  const subTree = instance.render.call(proxy);
  // vnode -> patch
  // 将vnode 变成 element  然后 mountElement
  patch(subTree, container);

  // 所有的 element 都 mount 之后，再处理 $el
  initialVNode.el = subTree.el;
}
