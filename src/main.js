import Vue from 'vue'

// vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

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
