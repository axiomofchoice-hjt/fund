<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
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
                <el-button @click="$router.push('/')">返回</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
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
      this.$http
        .post("/client/createCustomer", this.form)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
