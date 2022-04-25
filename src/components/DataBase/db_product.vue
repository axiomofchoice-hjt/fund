<template>
  <div>
    <div>
      <el-table :data="table" border>
        <el-table-column prop="product_number" label="产品编号">
        </el-table-column>
        <el-table-column prop="product_name" label="产品名称">
        </el-table-column>
        <el-table-column prop="product_risk" label="产品风险">
        </el-table-column>
        <el-table-column prop="product_type" label="产品类型">
        </el-table-column>
        <el-table-column prop="product_state" label="产品状态">
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
          table: "db_product",
        })
        .then((response) => {
          this.table = response.data.data;
        });
    },
  },
};
</script>
