<template>
  <div>
    <el-container>
      <el-main>
        <div class="s-header">
          <el-page-header @back="$router.go(-1)" content="填写开户信息">
          </el-page-header>
        </div>
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
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
          <el-form-item label="证件号码" prop="customer_id">
            <el-input v-model="form.customer_id"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号" prop="bank_card_number">
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
            <el-button
              type="primary"
              @click="createClick"
              :disabled="!creatable"
              >开户</el-button
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
    var checkCustomerId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("证件号码不能为空"));
      } else if (value.search(/^[0-9xX]*$/) === -1) {
        callback(new Error("请输入正确的证件号码"));
      }
      callback();
    };
    var checkBankCardNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("银行卡号不能为空"));
      } else if (value.search(/^[0-9]*$/) === -1) {
        callback(new Error("请输入数字"));
      }
      callback();
    };
    return {
      form: {
        customer_name: "",
        customer_type: "",
        customer_id_type: "",
        customer_id: "",
        bank_card_number: "",
        customer_risk: "",
      },
      rules: {
        customer_id: {
          validator: checkCustomerId,
          trigger: "change",
        },
        bank_card_number: {
          validator: checkBankCardNumber,
          trigger: "change",
        },
      },
    };
  },
  computed: {
    creatable() {
      return (
        this.form.customer_name !== "" &&
        this.form.customer_type !== "" &&
        this.form.customer_id_type !== "" &&
        this.form.customer_id !== "" &&
        this.form.customer_id.search(/^[0-9xX]*$/) !== -1 &&
        this.form.bank_card_number !== "" &&
        this.form.customer_risk !== ""
      );
    },
  },
  mounted() {},
  methods: {
    flush() {},
    createClick(event) {
      if (event !== undefined) event.currentTarget.blur();
      console.log(this.form.customer_name);
      this.$http.post("/client/createCustomer", this.form).then((response) => {
        console.log(response);
        if (response.data.message === "Accept!") {
          this.$message({
            type: "success",
            message: "创建成功！",
          });
          this.$router.go(-1);
        } else if (
          response.data.message === "This customer has been created!"
        ) {
          this.$message({
            type: "error",
            message: "客户已存在！",
          });
        } else if (response.data.message === "This bank card has been used!") {
          this.$message({
            type: "error",
            message: "该银行卡已被绑定！",
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