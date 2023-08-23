import { camelize, toHandlerKey } from "../shared/index";

export function emit(instance, event, ...args) {
  console.log("event", event);
  const { props } = instance;

  // TPP 开发技巧 ： 先去写一个特定的行为，然后再重构成通用的行为

  const handlerName = toHandlerKey(camelize(event));
  const handler = props[handlerName];
  handler && handler(...args);
}
