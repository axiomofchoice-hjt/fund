<template>
  <div>
    <div>
      <el-table :data="table" border>
        <el-table-column prop="price_key" label="主键">
        </el-table-column>
        <el-table-column prop="product_number" label="产品编号">
        </el-table-column>
        <el-table-column prop="historical_date" label="日期">
        </el-table-column>
        <el-table-column prop="historical_unit_price" label="单价">
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
        table: "db_price",
    })
    .then((response) => {
        this.table = response.data.data;
    });
  },
  methods: {
  },
};
</script>
