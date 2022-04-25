<template>
  <div>
    <div>
      <el-table :data="table" border>
        <el-table-column prop="money_key" label="主键">
        </el-table-column>
        <el-table-column prop="bank_card_number" label="银行卡号">
        </el-table-column>
        <el-table-column prop="amount_difference" label="金额变化">
        </el-table-column>
        <el-table-column prop="trade_type" label="交易类型">
        </el-table-column>
        <el-table-column prop="trade_time" label="交易时间">
        </el-table-column>
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
    this.table = [];
    this.$http
    .post("/client/viewTable", {
        table: "db_trade",
    })
    .then((response) => {
        this.table = response.data.data;
    });
  },
  methods: {
  },
};
</script>
