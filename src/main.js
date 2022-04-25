import Vue from 'vue'

// vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// dayjs
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc);
Vue.prototype.$dayjs = dayjs;

// axios
import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:13333';
axios.defaults.baseURL = 'http://192.168.43.104:13333';
Vue.prototype.$http = axios;

// echarts
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

import App from './App.vue'
import router from './router';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
