import Vue from 'vue'

// vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// axios
import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.baseURL = 'http://192.168.43.104:13333';
Vue.prototype.$http = axios;

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
