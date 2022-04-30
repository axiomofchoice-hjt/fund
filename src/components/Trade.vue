<template>
  <div>
    <div>
      <el-table :data="[{}]" :show-header="false">
        <el-table-column>
          <el-input
            placeholder="请输入筛选内容"
            v-model="filterInput"
            clearable
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
        <el-table-column prop="trade_number" label="订单号"> </el-table-column>
        <el-table-column prop="product_number_str" label="产品编号">
        </el-table-column>
        <el-table-column prop="customer_name" label="客户姓名">
        </el-table-column>
        <el-table-column prop="bank_card_number" label="银行卡号">
        </el-table-column>
        <el-table-column prop="trade_type" label="交易类型"> </el-table-column>
        <el-table-column prop="trade_amount" label="交易金额">
        </el-table-column>
        <el-table-column prop="trade_share_str" label="交易份额">
        </el-table-column>
        <el-table-column prop="trade_submit_time" label="提交时间">
        </el-table-column>
        <el-table-column prop="trade_state" label="交易状态"> </el-table-column>
        <!-- <el-table-column label="操作" :width="120">
          <template slot-scope="scope">
            <div style="text-align: center">
              <el-button type="primary" @click="checkProductClick(scope)">
                查看
              </el-button>
            </div>
          </template>
        </el-table-column> -->
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
        trade_keyword: "",
        trade_type1: true,
        trade_type2: true,
        trade_type5: true,
        begin_submit_day: "",
        end_submit_day: "",
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
        .post("/client/searchTradeRecord", {
          trade_keyword: "",
          trade_type1: true,
          trade_type2: true,
          trade_type5: true,
          begin_submit_day: "",
          end_submit_day: "",
        })
        .then((response) => {
          console.log("filter res:", response);
          this.table = response.data.trade_info;
          for (let i of this.table) {
            i.product_number_str = (i.product_number + 1000000 + "").substring(1)
            i.trade_share_str = i.trade_share.toFixed(2)
          }
          // console.log(this.table);
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