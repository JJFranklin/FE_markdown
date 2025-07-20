import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
// import HvueUi from './packages/index.js'
import HvueUi from 'hemmvueui'

const app = createApp(App);
app.use(HvueUi);
app.use(ElementPlus)
app.mount('#app')
