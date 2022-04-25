<template>
  <div>
    <div>
      <el-table :data="table" border>
        <el-table-column prop="hold_key" label="主键"> </el-table-column>
        <el-table-column prop="bank_card_number" label="银行卡编号">
        </el-table-column>
        <el-table-column prop="product_number" label="产品编号">
        </el-table-column>
        <el-table-column prop="hold_share" label="持有份额"> </el-table-column>
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
          table: "db_hold",
        })
        .then((response) => {
          this.table = response.data.data;
        });
    },
  },
};
</script>
