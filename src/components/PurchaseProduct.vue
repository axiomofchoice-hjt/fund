<template>
  <div>
    <el-container>
      <el-main>
        <h3 style="text-align: center">填写申购信息</h3>
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
          <el-form-item label="银行卡余额" v-if="form.bank_card_number !== ''">
            {{ this.bank_card_balance().toFixed(2) }}
          </el-form-item>
          <el-form-item
            label="申购金额"
            v-if="form.bank_card_number !== ''"
            prop="trade_amount"
          >
            <el-input v-model="form.trade_amount"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createClick">创建</el-button>
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
    var checkTradeAmount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("金额不能为空"));
      } else if (value.search(/^[0-9]+\.?[0-9]*$/) == -1) {
        callback(new Error("请输入数字"));
      } else if (value.search(/^[0-9]+\.?[0-9]{0,2}$/) == -1) {
        callback(new Error("小数点后最多两位"));
      } else if (+value - 1e-3 > this.bank_card_balance()) {
        callback(new Error("余额不足"));
      }
      callback();
    };
    return {
      form: {
        customer_number: "",
        bank_card_number: "",
        trade_amount: "",
        date: "",
        time: "",
      },
      customerOptions: [],
      bankCardOptions: [],
      rules: {
        trade_amount: {
          validator: checkTradeAmount,
          trigger: "change",
        },
      },
    };
  },
  mounted() {
    this.flush();
  },
  methods: {
    bank_card_balance() {
      for (let i of this.bankCardOptions) {
        if (i.bank_card_number == this.form.bank_card_number)
          return i.bank_card_balance;
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
    createClick() {
      this.$http
        .post("/client/purchaseProduct", {
          product_number: this.$route.params.number,
          bank_card_number: this.form.bank_card_number,
          trade_amount: this.form.trade_amount,
          trade_submit_time:
            this.$dayjs(this.form.date).format("YYYY-MM-DD") +
            " " +
            this.$dayjs(this.form.time).format("HH:mm:ss"),
        })
        .then((response) => {
          console.log(response);
          this.$router.go(-1);
        });
    },
    customerSelect(number) {
      this.bankCardOptions = [];
      this.form.bank_card_number = "";
      this.form.trade_amount = "";
      this.$http
        .post("/client/viewCustomer", {
          customer_number: this.form.customer_number,
        })
        .then((response) => {
          this.bankCardOptions = response.data.customer_bank_card;
        });
    },
    bankCardSelect(number) {
      this.form.trade_amount = "";
    },
  },
};
</script>
