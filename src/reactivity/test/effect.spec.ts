import { effect } from "../effect";
import { reactive } from "../reactive";
describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      age: 10,
    });

    // 当触发get时 会收集依赖，当触发set时 会执行依赖
    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });

    expect(nextAge).toBe(11);

    // update;
    user.age++;
    expect(nextAge).toBe(12);
  });
});
