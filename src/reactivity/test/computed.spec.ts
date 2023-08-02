import { computed } from "../computed";
import { isReadonly, readonly, isProxy, reactive } from "../reactive";
describe("computed", () => {
  it("happy path", () => {
    // 取值 .value，计算属性值会基于其响应式依赖被缓存。一个计算属性仅会在其响应式依赖更新时才重新计算
    const user = reactive({
      age: 10,
    });
    const age = computed(() => {
      return user.age;
    });
    expect(age.value).toBe(10);
  });
  it("should compute lazily", () => {
    const value = reactive({
      foo: 1,
    });
    const getter = jest.fn(() => {
      console.log('90909090')
      return value.foo;
    });
    const cValue = computed(getter);
    expect(getter).not.toHaveBeenCalled();
    expect(cValue.value).toBe(1);
    expect(getter).toHaveBeenCalledTimes(1);
    // should not compute again
    cValue.value;
    expect(getter).toHaveBeenCalledTimes(1);

    value.foo = 2;
    expect(getter).toHaveBeenCalledTimes(1);

    expect(cValue.value).toBe(2);
    expect(getter).toHaveBeenCalledTimes(2);
  });
});
