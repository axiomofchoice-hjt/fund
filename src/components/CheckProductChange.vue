<template>
  <div>
    <el-container>
      <el-main>
        <div class="s-header">
          <el-page-header @back="$router.go(-1)" content="产品份额流水">
          </el-page-header>
        </div>

        <div class="s-title">客户信息</div>
        <el-descriptions :column="3" direction="vertical" border>
          <el-descriptions-item label="客户姓名">
            {{ this.basic.customer_name }}
          </el-descriptions-item>
          <el-descriptions-item label="客户类型">
            {{ this.basic.customer_type }}
          </el-descriptions-item>
          <el-descriptions-item label="证件类型">
            {{ this.basic.customer_id_type }}
          </el-descriptions-item>
          <el-descriptions-item label="证件号码">
            {{ this.basic.customer_id }}
          </el-descriptions-item>
          <el-descriptions-item label="风险等级">
            {{ this.basic.customer_risk }}
          </el-descriptions-item>
        </el-descriptions>

        <div class="s-title" style="margin-top: 10px">份额流水</div>
        <el-table :data="table" border>
          <el-table-column prop="product_number_str" label="产品编号">
          </el-table-column>
          <el-table-column prop="bank_card_number" label="银行卡号">
          </el-table-column>
          <el-table-column prop="trade_type" label="交易类型">
          </el-table-column>
          <el-table-column prop="trade_amount" label="金额变化">
          </el-table-column>
          <el-table-column prop="trade_share_str" label="份额变化">
          </el-table-column>
          <el-table-column prop="trade_submit_time" label="交易时间">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basic: {
        customer_name: "",
        customer_type: "",
        customer_id_type: "",
        customer_id: "",
        customer_risk: "",
      },
      table: [],
    };
  },
  mounted() {
    this.flush();
  },
  methods: {
    flush() {
      this.$http
        .post("/client/viewCustomer", {
          customer_number: this.$route.params.customer,
        })
        .then((response) => {
          this.basic = response.data.customer_info;
        });
      this.$http
        .post("/client/viewShareChange", {
          customer_number: this.$route.params.customer,
          product_number: this.$route.params.product,
        })
        .then((response) => {
          console.log(response);
          this.table = response.data.share_change;
          for (let i of this.table) {
            i.trade_share_str = i.trade_share.toFixed(2);
            i.product_number_str = (i.product_number + 1000000 + "").substring(
              1
            );
          }
        });
    },
  },
};
</script>

<style scoped>
.s-header {
  border: 1px solid rgb(235, 238, 245);
  padding: 15px;
  margin-bottom: 15px;
}
.s-title {
  display: inline-block;
  background: rgb(240, 245, 255);
  padding: 11px 22px 10px;
  border-top: 1px solid rgb(235, 238, 245);
  border-left: 1px solid rgb(235, 238, 245);
  border-right: 1px solid rgb(235, 238, 245);
  border-radius: 15px 15px 0 0;
  color: #606266;
  font-size: 16px;
}
</style>