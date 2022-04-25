<template>
  <div>
    <div>
      <el-table :data="table" border>
        <el-table-column prop="variable_key" label="主键"> </el-table-column>
        <el-table-column prop="customer_number_counter" label="客户编号计数器">
        </el-table-column>
        <el-table-column prop="product_number_counter" label="产品编号计数器">
        </el-table-column>
        <el-table-column prop="trade_number_counter" label="交易编号计数器">
        </el-table-column>
        <el-table-column prop="system_time" label="系统时间"> </el-table-column>
        <el-table-column prop="clear_trade_time" label="清算订单时间">
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
    this.flush();
  },
  methods: {
    flush() {
      this.table = [];
      this.$http
        .post("/client/viewTable", {
          table: "db_variable",
        })
        .then((response) => {
          this.table = response.data.data;
        });
    },
  },
};
</script>
