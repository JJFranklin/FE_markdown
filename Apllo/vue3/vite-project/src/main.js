import { createApp } from "vue";

import "./style.css";
import "tailwindcss/tailwind.css";

import App from "./App.vue";
import PageLayout from "./components/page-layout.vue";
import CommonLayout from "./components/common-layout.vue";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
app.component("PageLayout", PageLayout);
app.component("CommonLayout", CommonLayout);
app.use(ElementPlus);
app.mount("#app");

