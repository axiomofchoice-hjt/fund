import VueRouter from 'vue-router';

import Main from '@/views/View'
import Customer from "@/components/Customer"
import CreateCustomer from '@/components/CreateCustomer'
import CheckCustomer from "@/components/CheckCustomer"
import Product from "@/components/Product"
import CreateProduct from "@/components/CreateProduct"

import db_customer from "@/components/DataBase/db_customer"
import db_bank_card from "@/components/DataBase/db_bank_card"
import db_product from "@/components/DataBase/db_product"
import db_price from "@/components/DataBase/db_price"
import db_trade from "@/components/DataBase/db_trade"
import db_hold from "@/components/DataBase/db_hold"
import db_money from "@/components/DataBase/db_money"
import db_variable from "@/components/DataBase/db_variable"

export default new VueRouter({
  routes: [
    {
      path: "/", component: Main,
      children: [
        { path: "/customer", component: Customer },
        { path: "/create-customer", component: CreateCustomer },
        {path:"/check-customer/:number",component: CheckCustomer},
        { path: "/product", component: Product },
        { path: "/create-product", component: CreateProduct },
        
        { path: "/database/db_customer", component: db_customer },
        { path: "/database/db_bank_card", component: db_bank_card },
        { path: "/database/db_product", component: db_product },
        { path: "/database/db_price", component: db_price },
        { path: "/database/db_trade", component: db_trade },
        { path: "/database/db_hold", component: db_hold },
        { path: "/database/db_money", component: db_money },
        { path: "/database/db_variable", component: db_variable },
      ]
    },
  ],
});