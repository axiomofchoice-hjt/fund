<template>
  <div>
    <el-container>
      <el-main>
        <div class="s-header">
          <el-page-header @back="$router.go(-1)" content="产品详细信息">
          </el-page-header>
        </div>
        <div class="s-title">基本信息</div>
        <el-descriptions :column="3" direction="vertical" border>
          <el-descriptions-item label="产品编号">
            {{ this.basic.product_number_str }}
          </el-descriptions-item>
          <el-descriptions-item label="产品名称">
            {{ this.basic.product_name }}
            <el-button
              size="mini"
              style="margin-left: 20px"
              @click="nameEditClick"
            >
              修改
            </el-button>
          </el-descriptions-item>
          <el-descriptions-item label="产品风险">
            {{ this.basic.product_risk }}
            <el-button
              size="mini"
              style="margin-left: 20px"
              @click="riskEditClick"
            >
              修改
            </el-button>
          </el-descriptions-item>
          <el-descriptions-item label="产品类型">
            {{ this.basic.product_type }}
          </el-descriptions-item>
          <el-descriptions-item label="产品状态">
            {{ this.basic.product_state }}

            <el-popconfirm
              title="上架产品？"
              @confirm="openClick"
              style="margin-left: 20px"
            >
              <el-button size="mini" slot="reference" :disabled="!ableOpen">
                上架
              </el-button>
            </el-popconfirm>
            <el-popconfirm
              title="下架产品？"
              @confirm="closeClick"
              style="margin-left: 10px"
            >
              <el-button size="mini" slot="reference" :disabled="!ableClose">
                下架
              </el-button>
            </el-popconfirm>
          </el-descriptions-item>
          <el-descriptions-item label="净值">
            {{ this.basic.price1.toFixed(2) }}
            <span :style="{ color: this.pricePercentColor }">
              <i :class="pricePercentArrow"></i>
              {{ this.pricePercent.toFixed(2) }}%
            </span>
          </el-descriptions-item>
          <!-- <el-descriptions-item label="风险等级">
            {{ this.basic.customer_risk }}
            <el-button
              size="mini"
              style="margin-left: 20px"
              @click="riskEditClick"
            >
              修改
            </el-button>
          </el-descriptions-item> -->
        </el-descriptions>
        <div style="text-align: center; margin-top: 30px">净值走势</div>
        <div style="width: 100%; height: 350px" ref="chart"></div>
        <div style="text-align: center">
          <el-button
            type="warning"
            style="margin: 0 30px"
            @click="$router.push(`/purchase-product/${basic.product_number}`)"
            :disabled="!ableClose"
            >申购</el-button
          >
          <el-button
            type="warning"
            style="margin: 0 30px"
            @click="$router.push(`/redeem-product/${basic.product_number}`)"
            :disabled="!ableClose"
            >赎回</el-button
          >
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basic: {
        product_number: "",
        product_number_str: "",
        product_name: "",
        product_type: "",
        product_risk: "",
        product_state: "",
        price: null,
        price1: 0,
        price2: 0,
      },
      chart: null,
    };
  },
  mounted() {
    this.flush();
  },
  computed: {
    disableDeleteBankCard() {
      return this.bank_card.length == 1;
    },
    pricePercent() {
      // return 0.004
      return (
        ((this.basic.price1 - this.basic.price2) / this.basic.price2) * 100
      );
    },
    pricePercentColor() {
      return Math.abs(this.pricePercent) < 0.005
        ? "grey"
        : this.pricePercent > 0
        ? "red"
        : "green";
    },
    pricePercentArrow() {
      return Math.abs(this.pricePercent) < 0.005
        ? "el-icon-caret-right"
        : this.pricePercent > 0
        ? "el-icon-caret-top"
        : "el-icon-caret-bottom";
    },
    ableOpen() {
      return this.basic.product_state === "不可销售";
    },
    ableClose() {
      return this.basic.product_state === "可销售";
    },
  },
  methods: {
    flush() {
      this.$http
        .post("/client/viewProduct", {
          product_number: this.$route.params.number,
        })
        .then((response) => {
          console.log("check-product::mounted:", response);
          this.basic = response.data.product_info;
          this.basic.product_number_str = (
            this.basic.product_number +
            1000000 +
            ""
          ).substring(1);

          this.chart = this.$echarts.init(this.$refs.chart);
          let xArr = [],
            dataArr = [],
            mx = 0,
            mn = 1e9;
          for (let i of this.basic.price) {
            xArr.push(i.historical_date.split(" ")[0].substring(5));
            dataArr.push(i.historical_unit_price);
            mx = Math.max(mx, i.historical_unit_price);
            mn = Math.min(mn, i.historical_unit_price);
          }
          let option = {
            xAxis: {
              data: xArr,
            },
            yAxis: {
              type: "value",
              scale: true,
              max: Math.ceil((mx + (mx - mn) * 0.2) * 10) / 10,
              min: Math.floor((mn - (mx - mn) * 0.2) * 10) / 10,
            },
            series: [
              {
                data: dataArr,
                type: "line",
              },
            ],
          };
          this.chart.setOption(option);
        });
    },
    riskChangeTo(risk) {
      this.$http
        .post("/client/modifyProduct", {
          product_number: this.basic.product_number,
          product_name: this.basic.product_name,
          product_risk: risk,
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
    nameEditClick(event) {
      event.currentTarget.blur();

      this.$prompt("请输入产品名称", "修改产品名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[^\s]+$/,
        inputErrorMessage: "名称不正确",
      })
        .then(({ value }) => {
          this.$http
            .post("/client/modifyProduct", {
              product_number: this.basic.product_number,
              product_name: value,
              product_risk: this.basic.product_risk,
            })
            .then((response) => {
              console.log(response);
              if (response.data.message === "Accept!") {
                this.$message({
                  type: "success",
                  message: "修改成功 ",
                });
                this.flush();
              } else {
                this.$message.error("该产品名称已存在");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
        });
    },
    openClick() {
      this.$http
        .post("/client/openProduct", {
          product_number: this.basic.product_number,
        })
        .then((response) => {
          console.log(response);
          this.flush();
        });
    },
    closeClick() {
      this.$http
        .post("/client/closeProduct", {
          product_number: this.basic.product_number,
        })
        .then((response) => {
          console.log(response);
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