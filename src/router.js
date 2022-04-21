import VueRouter from 'vue-router';

import Home from '@/components/Home'
import CreateCustomer from '@/components/CreateCustomer'

export default new VueRouter({
  routes: [
    { path: "/", component: Home, },
    { path: "/create-customer", component: CreateCustomer }
  ],
});