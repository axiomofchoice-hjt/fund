<template>
  <div>
    <el-container>
      <el-main>
        <div class="s-header">
          <el-page-header @back="$router.go(-1)" content="客户详细信息">
          </el-page-header>
        </div>
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
            <el-button
              size="mini"
              style="margin-left: 20px"
              @click="riskEditClick"
            >
              修改
            </el-button>
          </el-descriptions-item>
        </el-descriptions>
        <div class="s-title" style="margin-top: 10px">银行卡</div>
        <el-table :data="bank_card" border>
          <el-table-column prop="bank_card_number" label="银行卡号">
          </el-table-column>
          <el-table-column prop="bank_card_balance_str" label="余额">
          </el-table-column>
          <el-table-column label="操作" :width="300">
            <template slot-scope="scope">
              <div style="text-align: center">
                <el-button type="warning" @click="chargeClick($event, scope)">
                  氪金
                </el-button>
                <el-button type="primary" @click="$router.push(`/check-bank-card-change/${scope.row.bank_card_number}`)"> 流水 </el-button>

                <el-popconfirm
                  title="删除银行卡？"
                  @confirm="deleteBankCardClick(scope)"
                  style="margin-left: 10px"
                >
                  <el-button
                    type="danger"
                    slot="reference"
                    :disabled="disableDeleteBankCard"
                  >
                    删除
                  </el-button>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-table
          :data="[{}]"
          border
          :show-header="false"
          style="border-top: none"
        >
          <el-table-column>
            <div style="text-align: center">
              <el-button type="success" @click="addBankCard"> 添加 </el-button>
            </div>
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
          <el-table-column label="操作" :width="220">
            <template slot-scope="scope">
              <div style="text-align: center">
                <el-button type="primary" @click="$router.push(`/check-product/${scope.row.product_number}`)"> 查看 </el-button>
                <el-button type="primary" @click="$router.push(`/check-product-change/${$route.params.number}/${scope.row.product_number}`)"> 流水 </el-button>
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
        customer_number: "",
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
    this.flush();
  },
  computed: {
    disableDeleteBankCard() {
      return this.bank_card.length == 1;
    },
  },
  methods: {
    flush() {
      this.$http
        .post("/client/viewCustomer", {
          customer_number: this.$route.params.number,
        })
        .then((response) => {
          console.log("check-customer::mounted:", response);
          this.basic = response.data.customer_info;
          this.bank_card = response.data.customer_bank_card;
          this.product = response.data.customer_product;

          for (let i of this.bank_card) {
            // console.log(i.bank_card_balance)
            i.bank_card_balance_str = Math.max(
              0,
              i.bank_card_balance - 0.005 + 1e-6
            ).toFixed(2);
          }

          for (let i of this.product) {
            i.product_number_str = (1000000 + i.product_number + "").substring(1);
            i.hold_amount_str = i.hold_amount.toFixed(2);
            if (Math.abs(i.purchase_amount) > 1e-6)
              i.hold_amount_str += ` (+${i.purchase_amount.toFixed(2)})`;

            i.hold_share_str = i.hold_share.toFixed(2);
            if (Math.abs(i.redeem_share) > 1e-6)
              i.hold_share_str += ` (-${i.redeem_share.toFixed(2)})`;
          }
        });
    },
    chargeClick(event, scope) {
      if (event != undefined) event.currentTarget.blur();
      this.$prompt("请输入金额", "氪金", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[0-9]+\.?[0-9]{0,2}$/,
        inputErrorMessage: "金额不正确",
      })
        .then(({ value }) => {
          this.$http
            .post("/client/rechargeBankCard", {
              bank_card_number: scope.row.bank_card_number,
              recharge_amount: value,
            })
            .then((response) => {
              this.$message({
                type: "success",
                message: "氪金 " + value,
              });
              this.flush();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消氪金",
          });
        });
    },
    riskChangeTo(risk) {
      this.$http
        .post("/client/modifyCustomer", {
          customer_number: this.basic.customer_number,
          customer_risk: risk,
        })
        .then((response) => {
          this.$msgbox.close();
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.flush();
        });
    },
    riskChangeToLowClick(event) {
      if (event != undefined) event.currentTarget.blur();
      this.riskChangeTo("低");
    },
    riskChangeToMidClick(event) {
      if (event != undefined) event.currentTarget.blur();
      this.riskChangeTo("中");
    },
    riskChangeToHighClick(event) {
      if (event != undefined) event.currentTarget.blur();
      this.riskChangeTo("高");
    },
    riskEditClick(event) {
      if (event != undefined) event.currentTarget.blur();
      const h = this.$createElement;
      this.$msgbox({
        title: "修改风险等级",
        center: true,
        message: h(
          "div",
          {
            style: "text-align:center",
          },
          [
            h(
              "el-button",
              {
                attrs: {
                  type: "",
                },
                on: {
                  click: this.riskChangeToLowClick,
                },
              },
              "低"
            ),
            h(
              "el-button",
              {
                attrs: {
                  type: "",
                },
                on: {
                  click: this.riskChangeToMidClick,
                },
              },
              "中"
            ),
            h(
              "el-button",
              {
                attrs: {
                  type: "",
                },
                on: {
                  click: this.riskChangeToHighClick,
                },
              },
              "高"
            ),
          ]
        ),
        showCancelButton: false,
        showConfirmButton: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消",
        });
      });
    },
    addBankCard(event) {
      if (event != undefined) event.currentTarget.blur();

      this.$prompt("请输入银行卡号", "添加银行卡", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[0-9]{1,19}$/,
        inputErrorMessage: "卡号不正确",
      })
        .then(({ value }) => {
          this.$http
            .post("/client/addBankCard", {
              customer_number: this.basic.customer_number,
              bank_card_number: value,
            })
            .then((response) => {
              console.log("addBankCard:", response);
              if (response.data.message === "Accept!") {
                this.$message({
                  type: "success",
                  message: "添加银行卡 " + value,
                });
                this.flush();
              } else {
                this.$message.error("该银行卡已被绑定");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消添加",
          });
        });
    },
    deleteBankCardClick(scope) {
      this.$http
        .post("/client/deleteBankCard", {
          bank_card_number: scope.row.bank_card_number,
        })
        .then((response) => {
          this.flush();
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