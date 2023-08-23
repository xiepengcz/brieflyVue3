import { h } from "../../lib/guide-mini-vue.esm.js";

export const Foo = {
  setup(props) {
    // props.count
    console.log(props);
    // props 不能被修改 readonly
    props.count++
  },
  render() {
    return h("div", {}, "foo: " + this.count);
  },
};
