<template>
  <div>
    <div>
      <el-table :data="[{}]" :show-header="false">
        <el-table-column>
          <el-input
            placeholder="请输入筛选内容"
            v-model="form.trade_keyword"
            clearable
            @keyup.enter.native="filterClick"
          >
          </el-input>
        </el-table-column>
        <el-table-column :width="208">
          <el-button @click="foldClick">
            <i :class="fold ? 'el-icon-caret-right' : 'el-icon-caret-bottom'">
            </i>
            筛选
          </el-button>
          <el-button type="primary" @click="filterClick">
            <i class="el-icon-search"> </i> 搜索
          </el-button>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="!fold">
      <el-table :data="[{}]" :show-header="false">
        <el-table-column width="100"> 交易类型 </el-table-column>
        <el-table-column>
          <el-checkbox v-model="form.trade_type1"> 申购 </el-checkbox>
          <el-checkbox v-model="form.trade_type2"> 赎回 </el-checkbox>
          <el-checkbox v-model="form.trade_type5"> 退款 </el-checkbox>
        </el-table-column>
      </el-table>
      <el-table :data="[{}]" :show-header="false">
        <el-table-column width="100"> 交易日期 </el-table-column>
        <el-table-column>
          <el-date-picker
            v-model="daterange"
            type="daterange"
            :default-value="today"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="dateOptions"
          >
          </el-date-picker>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-table :data="table" border>
        <el-table-column prop="trade_number" label="订单号"> </el-table-column>
        <el-table-column prop="product_number_str" label="产品编号">
        </el-table-column>
        <el-table-column prop="customer_name" label="客户姓名">
        </el-table-column>
        <el-table-column prop="bank_card_number" label="银行卡号">
        </el-table-column>
        <el-table-column prop="trade_type" label="交易类型"> </el-table-column>
        <el-table-column prop="trade_amount" label="交易金额">
        </el-table-column>
        <el-table-column prop="trade_share_str" label="交易份额">
        </el-table-column>
        <el-table-column prop="trade_submit_time" label="提交时间">
        </el-table-column>
        <el-table-column prop="trade_state" label="交易状态"> </el-table-column>
        <!-- <el-table-column label="操作" :width="120">
          <template slot-scope="scope">
            <div style="text-align: center">
              <el-button type="primary" @click="checkProductClick(scope)">
                查看
              </el-button>
            </div>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table: [],
      fold: true,
      form: {
        trade_keyword: "",
        trade_type1: true,
        trade_type2: true,
        trade_type5: true,
        begin_submit_day: "",
        end_submit_day: "",
      },
      today: "",
      daterange: null,
      dateOptions: {
        shortcuts: [
          {
            text: "清除筛选",
            onClick(picker) {
              picker.$emit("pick", null);
            },
          },
          {
            text: "最近三天",
            onClick: (picker) => {
              var end = new Date(this.today);
              var start = new Date(this.today);
              console.log(this.today);
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一周",
            onClick: (picker) => {
              var end = new Date(this.today);
              var start = new Date(this.today);
              console.log(this.today);
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick: (picker) => {
              var end = new Date(this.today);
              var start = new Date(this.today);
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick: (picker) => {
              var end = new Date(this.today);
              var start = new Date(this.today);
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.flush();
  },
  computed: {},
  methods: {
    flush() {
      this.filterClick();
      this.$http.post("/client/viewSystemTime", {}).then((response) => {
        let [date, _1, _2] = response.data.system_time.split(" ");
        let t = this.$dayjs(date + " 00:00:00", "YYYY-MM-DD HH:mm:ss");
        console.log(t.format("YYYY-MM-DD HH:mm:ss"));
        this.today = t.toDate();
        console.log(this.today);
      });
    },
    filterClick(event) {
      if (event != undefined) event.currentTarget.blur();
      console.log(this.daterange);
      this.table = [];
      if (this.daterange === null) {
        this.form.begin_submit_day = this.form.end_submit_day = "";
      } else {
        this.form.begin_submit_day = this.$dayjs(this.daterange[0]).format(
          "YYYY-MM-DD 00:00:00"
        );
        this.form.end_submit_day = this.$dayjs(this.daterange[1]).format(
          "YYYY-MM-DD 00:00:00"
        );
      }
      this.$http
        .post("/client/searchTradeRecord", this.form)
        .then((response) => {
          console.log("filter res:", response);
          this.table = response.data.trade_info;
          for (let i of this.table) {
            i.product_number_str = (i.product_number + 1000000 + "").substring(
              1
            );
            i.trade_share_str = i.trade_share.toFixed(2);
          }
          // console.log(this.table);
        });
    },
    foldClick(event) {
      if (event != undefined) event.currentTarget.blur();
      this.fold ^= true;
    },
    createProductClick() {
      this.$router.push("/create-product");
    },
    checkProductClick(scope) {
      this.$router.push(`/check-product/${scope.row.product_number}`);
    },
    deleteClick(scope) {
      // console.log(scope.row);
      // this.$http
      //   .post("/client/deleteCustomer", {
      //     customer_number: scope.row.customer_number,
      //   })
      //   .then((response) => {
      //     console.log("delete result:", response);
      //     this.filterClick();
      //   });
    },
    pricePercent(scope) {
      // return 0.004
      return ((scope.row.price1 - scope.row.price2) / scope.row.price2) * 100;
    },
    pricePercentColor(scope) {
      return Math.abs(this.pricePercent(scope)) < 0.005
        ? "grey"
        : this.pricePercent(scope) > 0
        ? "red"
        : "green";
    },
    pricePercentArrow(scope) {
      return Math.abs(this.pricePercent(scope)) < 0.005
        ? "el-icon-caret-right"
        : this.pricePercent(scope) > 0
        ? "el-icon-caret-top"
        : "el-icon-caret-bottom";
    },
  },
};
</script>