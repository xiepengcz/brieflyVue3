export function transform(root, options) {
  const context = createTransformContext(root, options);
  // 1.遍历 深度优先搜索
  // 2.修改 text content
  traverseNode(root, context);
}

function createTransformContext(root, options) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || [],
  };
  return context;
}

function traverseNode(node, context) {
  console.log(node);
  // 1. 遍历子节点 2. 修改
  const nodeTransforms = context.nodeTransforms;
  for (let i = 0; i < nodeTransforms.length; i++) {
    const transform = nodeTransforms[i];
    transform(node);
  }
  traverseChildren(node, context);
}
function traverseChildren(node: any, context: any) {
  const children = node.children;
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      traverseNode(node, context);
    }
  }
}
