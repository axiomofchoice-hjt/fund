<template>
  <div>
    <el-container>
      <el-main>
        <div class="s-header">
          <el-page-header @back="$router.go(-1)" content="填写赎回信息">
          </el-page-header>
        </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="客户委托时间">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            <el-time-picker
              v-model="form.time"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59',
              }"
              placeholder="选择时间"
              style="margin-left: 10px"
            >
            </el-time-picker>
          </el-form-item>
          <el-form-item label="选择客户">
            <el-select
              v-model="form.customer_number"
              filterable
              placeholder="请选择"
              @change="customerSelect"
            >
              <el-option
                v-for="item in customerOptions"
                :key="item.customer_number"
                :label="
                  item.customer_name +
                  ' ' +
                  item.customer_id_type +
                  ' ' +
                  item.customer_id
                "
                :value="item.customer_number"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择银行卡">
            <el-select
              v-model="form.bank_card_number"
              filterable
              placeholder="请选择"
              :disabled="bankCardOptions.length === 0"
              @change="bankCardSelect"
            >
              <el-option
                v-for="item in bankCardOptions"
                :key="item.bank_card_number"
                :label="item.bank_card_number"
                :value="item.bank_card_number"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="持有份额" v-if="form.bank_card_number !== ''">
            {{ this.hold_share !== "" ? this.hold_share.toFixed(2) : "" }}
          </el-form-item>
          <el-form-item
            label="赎回份额"
            v-if="form.bank_card_number !== ''"
            prop="redeem_share"
          >
            <el-input v-model="form.redeem_share"></el-input>
            <el-button
              size="mini"
              round
              @click="form.redeem_share = (hold_share / 4).toFixed(2)"
            >
              1/4
            </el-button>
            <el-button
              size="mini"
              round
              @click="form.redeem_share = (hold_share / 3).toFixed(2)"
            >
              1/3
            </el-button>
            <el-button
              size="mini"
              round
              @click="form.redeem_share = (hold_share / 2).toFixed(2)"
            >
              1/2
            </el-button>
            <el-button
              size="mini"
              round
              @click="form.redeem_share = hold_share.toFixed(2)"
            >
              全部
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="createClick"
              :disabled="!check_redeem_share()"
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
    var checkRedeemShare = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("份额不能为空"));
      } else if (value.search(/^[0-9]+\.?[0-9]*$/) == -1) {
        callback(new Error("请输入数字"));
      } else if (value.search(/^[0-9]+\.?[0-9]{0,2}$/) == -1) {
        callback(new Error("小数点后最多两位"));
      } else if (+value - 1e-3 > this.hold_share) {
        callback(new Error("份额不足"));
      }
      callback();
    };
    return {
      form: {
        customer_number: "",
        bank_card_number: "",
        redeem_share: "",
        date: "",
        time: "",
      },
      customerOptions: [],
      bankCardOptions: [],
      rules: {
        redeem_share: {
          validator: checkRedeemShare,
          trigger: "change",
        },
      },
      hold_share: "",
    };
  },
  mounted() {
    this.flush();
  },
  methods: {
    getRiskLevel(s) {
      return ["低", "中", "高"].indexOf(s);
    },
    check_redeem_share() {
      if (this.form.redeem_share === "") {
        return false;
      } else if (this.form.redeem_share.search(/^[0-9]+\.?[0-9]{0,2}$/) == -1) {
        return false;
      } else if (+this.form.redeem_share - 1e-3 > this.hold_share) {
        return false;
      }
      return true;
    },
    bank_card_balance() {
      for (let i of this.bankCardOptions) {
        if (i.bank_card_number == this.form.bank_card_number)
          return i.bank_card_balance;
      }
      return 0;
    },
    get_customer_risk() {
      for (let i of this.customerOptions) {
        if (i.customer_number == this.form.customer_number)
          return i.customer_risk;
      }
      return 0;
    },
    flush() {
      this.$http.post("/client/viewSystemTime", {}).then((response) => {
        let [date, time, _] = response.data.system_time.split(" ");
        let t = this.$dayjs(date + " " + time, "YYYY-MM-DD HH:mm:ss");
        console.log(t.format("YYYY-MM-DD HH:mm:ss"));
        this.form.date = this.form.time = t.toDate();
      });
      this.$http.post("/client/viewAllCustomer", {}).then((response) => {
        console.log(response);
        this.customerOptions = response.data.customer_info;
      });
    },
    redeem() {
      this.$http
        .post("/client/redeemProduct", {
          product_number: this.$route.params.number,
          bank_card_number: this.form.bank_card_number,
          trade_share: this.form.redeem_share,
          trade_submit_time:
            this.$dayjs(this.form.date).format("YYYY-MM-DD") +
            " " +
            this.$dayjs(this.form.time).format("HH:mm:ss"),
        })
        .then((response) => {
          console.log(response);
          var h = this.$createElement;
          this.$msgbox({
            title: "赎回成功",
            message: h("div", null, [
              h("div", null, `赎回日期 ${response.data.date1}`),
              h("div", null, `预计 ${response.data.date2.split(" ")[0]} 15:00 前确认金额`),
            ]),
            showCancelButton: false,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          })
            .then(() => {
              this.$router.go(-1);
            })
            .catch(() => {
              this.$router.go(-1);
            });
        });
    },
    createClick() {
      this.redeem();
    },
    customerSelect(number) {
      this.bankCardOptions = [];
      this.form.bank_card_number = "";
      this.form.redeem_share = "";
      this.hold_share = "";
      this.$http
        .post("/client/viewCustomer", {
          customer_number: this.form.customer_number,
        })
        .then((response) => {
          this.bankCardOptions = response.data.customer_bank_card;
        });
    },
    bankCardSelect(number) {
      this.form.redeem_share = "";
      this.hold_share = "";
      this.$http
        .post("/client/getHoldShare", {
          bank_card_number: this.form.bank_card_number,
          product_number: this.$route.params.number,
        })
        .then((response) => {
          console.log(response);
          this.hold_share = response.data.hold_share;
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