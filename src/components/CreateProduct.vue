<template>
  <div>
    <el-container>
      <el-main>
        <div class="s-header">
          <el-page-header @back="$router.go(-1)" content="填写产品信息">
          </el-page-header>
        </div>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="产品名称">
            <el-input v-model="form.product_name"></el-input>
          </el-form-item>
          <el-form-item label="产品风险">
            <el-radio-group v-model="form.product_risk">
              <el-radio label="低"></el-radio>
              <el-radio label="中"></el-radio>
              <el-radio label="高"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="产品类型">
            <el-radio-group v-model="form.product_type">
              <el-radio label="货币基金"></el-radio>
              <el-radio label="债券基金"></el-radio>
              <el-radio label="股票基金"></el-radio>
              <el-radio label="混合基金"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="产品状态">
            <el-radio-group v-model="form.product_state">
              <el-radio label="不可销售"></el-radio>
              <el-radio label="上架中"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="产品单价">
            <el-input-number
              v-model="form.product_unit_price"
              :precision="2"
              :min="0.01"
              :step="0.1"
            ></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="createClick"
              :disabled="!creatable"
              >创建</el-button
            >
            <el-button @click="$router.go(-1)">返回</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        product_name: "",
        product_risk: "",
        product_type: "",
        product_state: "",
        product_unit_price: 1,
      },
    };
  },
  computed: {
    creatable() {
      return (
        this.form.product_name !== "" &&
        this.form.product_risk !== "" &&
        this.form.product_type !== "" &&
        this.form.product_state !== ""
      );
    },
  },
  mounted() {},
  methods: {
    flush() {},
    createClick(event) {
      if (event !== undefined) event.currentTarget.blur();
      this.$http.post("/client/createProduct", this.form).then((response) => {
        console.log(response);
        if (response.data.message === "Accept!") {
          this.$message({
            type: "success",
            message: "创建成功！",
          });
          this.$router.go(-1);
        } else {
          
          this.$message({
            type: "error",
            message: "产品名称已存在！",
          });
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
</style>