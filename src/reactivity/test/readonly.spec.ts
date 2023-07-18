import { readonly } from "../reactive";
describe("readonly", () => {
  // 被 readonly 的数据，不能被set,也就是只能读取，不能修改
  it("happy path", () => {
    const original = { foo: 1, bar: { baz: 2 } };
    const wrapped = readonly(original);
    expect(wrapped).not.toBe(original);
    expect(wrapped.foo).toBe(1);
  });

  it("warn then call set", () => {
    console.warn = jest.fn(); // mock
    const user = readonly({ age: 10 });
    user.age = 11; // 当修改 readonly 的数据时 应该要给出一个警告
    expect(console.warn).toBeCalled();
  });
});
