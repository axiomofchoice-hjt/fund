<template>
  <div>
    <div>
      <el-table :data="table" border>
        <el-table-column prop="customer_number" label="客户编号">
        </el-table-column>
        <el-table-column prop="customer_name" label="客户姓名">
        </el-table-column>
        <el-table-column prop="customer_type" label="客户类型">
        </el-table-column>
        <el-table-column prop="customer_id_type" label="证件类型">
        </el-table-column>
        <el-table-column prop="customer_id" label="证件号码"> </el-table-column>
        <el-table-column prop="customer_risk" label="风险等级">
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
          table: "db_customer",
        })
        .then((response) => {
          this.table = response.data.data;
        });
    },
  },
};
</script>
