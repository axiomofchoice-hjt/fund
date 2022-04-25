<template>
  <div>
    <div>
      <el-table :data="table" border>
        <el-table-column prop="bank_card_key" label="主键"> </el-table-column>
        <el-table-column prop="bank_card_number" label="银行卡号">
        </el-table-column>
        <el-table-column prop="customer_number" label="客户编号">
        </el-table-column>
        <el-table-column prop="bank_card_balance" label="银行卡余额">
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
          table: "db_bank_card",
        })
        .then((response) => {
          this.table = response.data.data;
        });
    },
  },
};
</script>
