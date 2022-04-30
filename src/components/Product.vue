<template>
  <div>
    <div>
      <el-table :data="[{}]" :show-header="false">
        <el-table-column>
          <el-input
            placeholder="请输入筛选内容"
            v-model="filterInput"
            clearable
            @keyup.enter.native="filterClick"
          >
          </el-input>
        </el-table-column>
        <el-table-column :width="330">
          <el-button @click="foldClick">
            <i :class="fold ? 'el-icon-caret-right' : 'el-icon-caret-bottom'">
            </i>
            筛选
          </el-button>
          <el-button type="primary" @click="filterClick">
            <i class="el-icon-search"> </i> 搜索
          </el-button>
          <el-button type="success" @click="createProductClick">
            创建新产品
          </el-button>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="!fold">
      <el-table :data="[{}]" :show-header="false">
        <el-table-column width="100"> 产品类型 </el-table-column>
        <el-table-column>
          <el-checkbox v-model="form.product_type1">货币基金</el-checkbox>
          <el-checkbox v-model="form.product_type2">债券基金</el-checkbox>
          <el-checkbox v-model="form.product_type3">股票基金</el-checkbox>
          <el-checkbox v-model="form.product_type4">混合基金</el-checkbox>
        </el-table-column>
      </el-table>
      <el-table :data="[{}]" :show-header="false">
        <el-table-column width="100"> 产品风险 </el-table-column>
        <el-table-column>
          <el-checkbox v-model="form.product_risk1">低</el-checkbox>
          <el-checkbox v-model="form.product_risk2">中</el-checkbox>
          <el-checkbox v-model="form.product_risk3">高</el-checkbox>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-table :data="table" border>
        <el-table-column prop="product_number_str" label="产品编号">
        </el-table-column>
        <el-table-column prop="product_name" label="产品名称">
        </el-table-column>
        <el-table-column prop="product_risk" label="产品风险">
        </el-table-column>
        <el-table-column prop="product_type" label="产品类型">
        </el-table-column>
        <el-table-column prop="product_state" label="产品状态">
        </el-table-column>
        <el-table-column label="净值" :width="250">
          <template slot-scope="scope">
            {{ scope.row.price1.toFixed(2) }}
            <span :style="{ color: pricePercentColor(scope) }">
              <i :class="pricePercentArrow(scope)"></i>
              {{ pricePercent(scope).toFixed(2) }}%
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :width="120">
          <template slot-scope="scope">
            <div style="text-align: center">
              <el-button type="primary" @click="checkProductClick(scope)">
                查看
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterInput: "",
      table: [],
      fold: true,
      form: {
        product_type1: true,
        product_type2: true,
        product_type3: true,
        product_type4: true,
        product_risk1: true,
        product_risk2: true,
        product_risk3: true,
      },
    };
  },
  mounted() {
    this.filterClick();
  },
  computed: {},
  methods: {
    flush() {
      this.filterClick();
    },
    filterClick(event) {
      if (event != undefined) event.currentTarget.blur();
      this.table = [];
      this.$http
        .post("/client/searchProduct", {
          product_keyword: this.filterInput,
          product_type1: this.form.product_type1,
          product_type2: this.form.product_type2,
          product_type3: this.form.product_type3,
          product_type4: this.form.product_type4,
          product_risk1: this.form.product_risk1,
          product_risk2: this.form.product_risk2,
          product_risk3: this.form.product_risk3,
        })
        .then((response) => {
          console.log("filter res:", response);
          let table = response.data.product_info;
          for (let i of table) {
            i.product_number_str = (1000000 + i.product_number + "").slice(
              1,
              7
            );
          }
          this.table = response.data.product_info;
          console.log(this.table);
        });
    },
    foldClick(event) {
      if (event != undefined) event.currentTarget.blur();
      this.fold ^= true;
    },
    createProductClick() {
      this.$router.push("/create-product");
    },
    checkProductClick(scope) {
      this.$router.push(`/check-product/${scope.row.product_number}`);
    },
    deleteClick(scope) {
      // console.log(scope.row);
      // this.$http
      //   .post("/client/deleteCustomer", {
      //     customer_number: scope.row.customer_number,
      //   })
      //   .then((response) => {
      //     console.log("delete result:", response);
      //     this.filterClick();
      //   });
    },
    pricePercent(scope) {
      // return 0.004
      return ((scope.row.price1 - scope.row.price2) / scope.row.price2) * 100;
    },
    pricePercentColor(scope) {
      return Math.abs(this.pricePercent(scope)) < 0.005
        ? "grey"
        : this.pricePercent(scope) > 0
        ? "red"
        : "green";
    },
    pricePercentArrow(scope) {
      return Math.abs(this.pricePercent(scope)) < 0.005
        ? "el-icon-caret-right"
        : this.pricePercent(scope) > 0
        ? "el-icon-caret-top"
        : "el-icon-caret-bottom";
    },
  },
};
</script>