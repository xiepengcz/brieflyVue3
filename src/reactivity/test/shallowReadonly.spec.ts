import { isReadonly, shallowReadonly } from "../reactive";
describe("shallowReadonly", () => {
  // 被 shallowReadonly 的数据，表层不能被set,也就是只能读取，不能修改,子级可修改, 如果业务中的嵌套不用所以的都转成响应式对象，就可以使用这个方法
  it("should not make non-reactive properties reactive", () => {
    const props = shallowReadonly({ n: { foo: 1 } });
    expect(isReadonly(props)).toBe(true);
    expect(isReadonly(props.n)).toBe(false);
  });

  it("warn then call set", () => {
    console.warn = jest.fn(); // mock 改写这个函数 就能用来测试是否调用过
    const user = shallowReadonly({ age: 10, info: { stature: 166 } });
    user.age = 11; // 当修改 readonly 的数据时 应该要给出一个警告
    expect(console.warn).toBeCalled();
    user.info.stature = 170 // 当修改深层数据时，应该不会给出一个警告
    expect(console.warn).toBeCalledTimes(1);
  });
});
