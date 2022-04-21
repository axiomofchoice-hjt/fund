import VueRouter from 'vue-router';

import Main from '@/views/View'
import Customer from "@/components/Customer"
import CreateCustomer from '@/components/CreateCustomer'
import Product from "@/components/Product"
import CreateProduct from "@/components/CreateProduct"

export default new VueRouter({
  routes: [
    {
      path: "/", component: Main,
      children: [
        { path: "/customer", component: Customer },
        { path: "/create-customer", component: CreateCustomer },
        { path: "/product", component: Product },
        { path: "/create-product", component: CreateProduct },
      ]
    },
  ],
});