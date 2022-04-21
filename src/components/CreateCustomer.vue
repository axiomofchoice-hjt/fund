<template>
  <div>
    <el-container>
      <el-main>
        <h3 style="text-align: center">填写开户信息</h3>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="客户姓名">
            <el-input v-model="form.customer_name"></el-input>
          </el-form-item>
          <el-form-item label="客户类型">
            <el-radio-group v-model="form.customer_type">
              <el-radio label="个人投资者"></el-radio>
              <el-radio label="机构投资者"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-radio-group v-model="form.customer_id_type">
              <el-radio label="身份证"></el-radio>
              <el-radio label="港澳同胞通行证"></el-radio>
              <el-radio label="台湾同胞通行证"></el-radio>
              <el-radio label="护照"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="form.customer_id"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号">
            <el-input v-model="form.bank_card_number"></el-input>
          </el-form-item>
          <el-form-item label="风险等级">
            <el-radio-group v-model="form.customer_risk">
              <el-radio label="低"></el-radio>
              <el-radio label="中"></el-radio>
              <el-radio label="高"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createClick">开户</el-button>
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
        customer_name: "",
        customer_type: "",
        customer_id_type: "",
        customer_id: "",
        bank_card_number: "",
        customer_risk: "",
      },
    };
  },
  mounted() {},
  methods: {
    createClick() {
      console.log(this.form.customer_name);
      this.$http.post("/client/createCustomer", this.form).then((response) => {
        console.log(response);
        this.$router.go(-1);
      });
    },
  },
};
</script>
