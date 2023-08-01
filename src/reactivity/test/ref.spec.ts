import { effect } from "../effect";
import { ref } from "../ref";
describe("ref", () => {
  it("happy path", () => {
    const a = ref(1);
    expect(a.value).toBe(1);
  });
  it("should be reactive", () => {
    const a = ref(1);
    let dummy;
    let calls = 0;
    effect(() => {
      calls++;
      dummy = a.value;
    });
    expect(calls).toBe(1);
    expect(dummy).toBe(1);
    a.value = 2;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
    // same value should not trigger
    a.value = 2;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
  });
  it("should make nested properties reactive", () => {
    const a = ref({
      count: 1,
      user: {
        age: 12,
      },
    });
    let dummy;
    let userAge;
    effect(() => {
      dummy = a.value.count;
      userAge = a.value.user.age;
    });
    expect(dummy).toBe(1);
    expect(userAge).toBe(12);
    a.value.count = 2;
    expect(dummy).toBe(2);
    a.value.user.age = 13;
    expect(userAge).toBe(13);
  });
});
