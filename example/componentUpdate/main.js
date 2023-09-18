import { createApp } from '../../lib/guide-mini-vue.esm.js'
import { App } from './App.js'

const app = createApp(App)
app.mount(document.querySelector('#app'))