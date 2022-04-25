<template>
  <div>
    <div>
      <el-table :data="table" border>
        <el-table-column prop="trade_key" label="主键"> </el-table-column>
        <el-table-column prop="trade_number" label="订单号"> </el-table-column>
        <el-table-column prop="product_number" label="产品编号">
        </el-table-column>
        <el-table-column prop="bank_card_number" label="银行卡号">
        </el-table-column>
        <el-table-column prop="trade_type" label="交易类型"> </el-table-column>
        <el-table-column prop="trade_amount" label="交易金额">
        </el-table-column>
        <el-table-column prop="trade_share" label="交易份额"> </el-table-column>
        <el-table-column prop="trade_submit_time" label="提交时间">
        </el-table-column>
        <el-table-column prop="trade_accept_time" label="受理时间">
        </el-table-column>
        <el-table-column prop="trade_revoke" label="是否撤单">
        </el-table-column>
        <el-table-column prop="trade_clear" label="是否清算"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table: [],
    };
  },
  mounted() {
    this.flush();
  },
  methods: {
    flush() {
      this.table = [];
      this.$http
        .post("/client/viewTable", {
          table: "db_trade",
        })
        .then((response) => {
          this.table = response.data.data;
        });
    },
  },
};
</script>
