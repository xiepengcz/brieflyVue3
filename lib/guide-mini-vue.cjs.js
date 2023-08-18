'use strict';

const isObject = (val) => {
    return val !== null && typeof val === "object";
};

function createComponentInstance(vnode) {
    const component = { vnode, type: vnode.type };
    return component;
}
function setupComponent(instance) {
    // initProps
    // initSlots
    setupStatefulComponent(instance); // 初始化一个有状态的 component
    // 初始化一个函数组件
}
function setupStatefulComponent(instance) {
    const Component = instance.type;
    const { setup } = Component;
    if (setup) {
        // 因为用户不一定会写 setup 所以要判断一下
        // setup 可能是 Object 也可能是 function
        const setupResult = setup();
        handleSetupResult(setupResult, instance);
    }
}
function handleSetupResult(setupResult, instance) {
    // TODO 后续实现 function
    if (typeof setupResult === "object") {
        instance.setupState = setupResult;
    }
    // 保证组件的render一定是有值的
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    instance.render = Component.render;
}

function render(vnode, container) {
    // 调用 patch 方法, 方便后续的递归操作
    patch(vnode, container);
}
function patch(vnode, container) {
    // 处理组件
    // 判断是否为 element
    if (isObject(vnode.type)) {
        processComponent(vnode, container);
    }
    else
        processElement(vnode, container);
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountComponent(vnode, container) {
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance, container);
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    const el = document.createElement(vnode.type);
    // children 可以是string或者 array
    const { children, props } = vnode;
    if (typeof children === "string") {
        el.textContent = children;
    }
    else if (Array.isArray(children)) {
        mountChildren(children, el);
    }
    for (const key in props) {
        const val = props[key];
        el.setAttribute(key, val);
    }
    container.append(el);
}
function mountChildren(children, container) {
    children.forEach((v) => {
        patch(v, container);
    });
}
function setupRenderEffect(instance, container) {
    const subTree = instance.render();
    // vnode -> patch
    // 将vnode 变成 element  然后 mountElement
    patch(subTree, container);
}

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
    };
    return vnode;
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // component -> vnode
            // 先转换成vnode , 在vue中 所有的逻辑操作都会基于 vnode做处理
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        },
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;
