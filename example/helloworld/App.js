import { h } from '../../lib/guide-mini-vue.esm.js'

window.self = null
export const App = {
  render() {
    window.self = this
    return h('div', { id: 'root', class: ['red', 'hard'] },
      // string
      'hi,' + this.msg
      // array
      // [h('p', { class: 'red' }, 'hi '), h('p', { class: 'blue' }, this.msg)]
    )
  },
  setup() {
    return {
      msg: 'mini vue'
    }
  }
}