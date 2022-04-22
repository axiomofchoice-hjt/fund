<template>
  <div>
    <div>
      <el-table :data="table" border>
        <el-table-column prop="bank_card_key" label="客户编号">
        </el-table-column>
        <el-table-column prop="bank_card_number" label="客户姓名">
        </el-table-column>
        <el-table-column prop="customer_number" label="客户类型">
        </el-table-column>
        <el-table-column prop="bank_card_balance" label="证件类型">
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
        table: "db_bank_card",
    })
    .then((response) => {
        this.table = response.data.data;
    });
  },
  methods: {
  },
};
</script>
