<template>
  <div>
    <el-container>
      <el-main>
        <!-- <h3 style="text-align: center">查看客户信息</h3> -->

        <div class="s-title">基本信息</div>
        <el-descriptions :column="3" direction="vertical" border>
          <el-descriptions-item label="客户姓名">
            {{ this.basic.customer_name }}
          </el-descriptions-item>
          <el-descriptions-item label="客户类型">
            {{ this.basic.customer_type }}
          </el-descriptions-item>
          <el-descriptions-item label="证件类型">
            {{ this.basic.customer_id_type }}
          </el-descriptions-item>
          <el-descriptions-item label="证件号码">
            {{ this.basic.customer_id }}
          </el-descriptions-item>
          <el-descriptions-item label="风险等级">
            {{ this.basic.customer_risk }}
          </el-descriptions-item>
          <el-descriptions-item label="操作">
            <el-button type="primary" size="mini">编辑</el-button>
          </el-descriptions-item>
        </el-descriptions>
        <div class="s-title" style="margin-top: 10px">银行卡</div>
        <el-table :data="bank_card" border>
          <el-table-column prop="bank_card_number" label="银行卡号">
          </el-table-column>
          <el-table-column prop="bank_card_balance" label="余额">
          </el-table-column>
          <el-table-column label="操作" :width="300">
            <template slot-scope="scope">
              <div style="text-align: center">
                <el-button type="warning" @click="chargeClick($event, scope)">
                  氪金
                </el-button>
                <el-button type="primary"> 流水 </el-button>
                <el-button type="danger"> 删除 </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="s-title" style="margin-top: 10px">产品</div>
        <el-table :data="product" border>
          <el-table-column prop="product_number_str" label="产品编号">
          </el-table-column>
          <el-table-column prop="product_name" label="产品名称">
          </el-table-column>
          <el-table-column prop="hold_amount_str" label="持有金额">
          </el-table-column>
          <el-table-column prop="hold_share_str" label="持有份额">
          </el-table-column>
          <el-table-column label="操作" :width="300">
            <template -slot-scope="scope">
              <div style="text-align: center">
                <el-button type="warning"> 氪金 </el-button>
                <el-button type="primary"> 流水 </el-button>
                <el-button type="danger"> 删除 </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basic: {
        customer_name: "",
        customer_type: "",
        customer_id_type: "",
        customer_id: "",
        customer_risk: "",
      },
      bank_card: [],
      product: [],
    };
  },
  mounted() {
    this.$http
      .post("/client/viewCustomer", {
        customer_number: this.$route.params.number,
      })
      .then((response) => {
        console.log("check-customer::mounted:", response);
        this.basic = response.data.customer_info;
        this.bank_card = response.data.customer_bank_card;
        this.product = response.data.customer_product;
        for (let i of this.product) {
          i.product_number_str = (1000000 + i.product_number + "").slice(1, 7);
          i.hold_amount_str = "" + i.hold_amount;
          if (Math.abs(i.purchase_amount) > 1e-6)
            i.hold_amount_str += ` (+${i.purchase_amount})`;
          i.hold_share_str = "" + i.hold_share;
          if (Math.abs(i.redeem_share) > 1e-6)
            i.hold_share_str += ` (-${i.redeem_share})`;
        }
      });
  },
  methods: {
    chargeClick(event, scope) {
      if (event != undefined) event.currentTarget.blur();
      this.$prompt("", "氪金", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[0-9]+\.?[0-9]*/,
        inputErrorMessage: "金额不正确",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "氪金 " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消氪金",
          });
        });
    },
  },
};
</script>
<style scoped>
.s-title {
  display: inline-block;
  background: rgb(240, 245, 255);
  padding: 11px 22px 10px;
  border-top: 1px solid rgb(235, 238, 245);
  border-left: 1px solid rgb(235, 238, 245);
  border-right: 1px solid rgb(235, 238, 245);
  border-radius: 15px 15px 0 0;
  color: #606266;
  font-size: 16px;
}
</style>