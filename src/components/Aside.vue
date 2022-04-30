<template>
  <div>
    <div>
      <el-image style="width: 100%" src="/Logo.jpg" fit="contain"></el-image>
      <div style="text-align: center; margin-bottom: 20px">
        <el-button
          style="font-size: 20px; line-height: 130%"
          @click="timeClick"
        >
          {{ this.date }} <br />
          {{ this.time }} <br />
          {{ this.week }}
        </el-button>
      </div>
    </div>
    <el-menu
      :default-active="active()"
      class="el-menu-vertical-demo"
      :router="true"
    >
      <el-menu-item index="/product">
        <!-- <i class="el-icon-location"></i> -->
        <span slot="title">产品列表</span>
      </el-menu-item>
      <el-menu-item index="/customer">
        <!-- <i class="el-icon-menu"></i> -->
        <span slot="title">客户列表</span>
      </el-menu-item>
      <el-menu-item index="/trade">
        <!-- <i class="el-icon-document"></i> -->
        <span slot="title">交易记录</span>
      </el-menu-item>
      <el-submenu index="/D">
        <!-- <i class="el-icon-setting"></i> -->
        <span slot="title">后台管理</span>
        <!-- <el-menu-item index="/time-setter">时间管理带师</el-menu-item> -->
        <el-submenu index="/database">
          <span slot="title">数据库</span>
          <el-menu-item index="/database/db_customer">客户信息表</el-menu-item>
          <el-menu-item index="/database/db_bank_card">银行卡表</el-menu-item>
          <el-menu-item index="/database/db_product">产品信息表</el-menu-item>
          <el-menu-item index="/database/db_price">产品历史单价表</el-menu-item>
          <el-menu-item index="/database/db_trade">交易申请表</el-menu-item>
          <el-menu-item index="/database/db_hold">产品持有表</el-menu-item>
          <el-menu-item index="/database/db_money">资金流水表</el-menu-item>
          <el-menu-item index="/database/db_variable">变量表</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      time: "",
      week: "",
    };
  },
  mounted() {
    this.timeInit();
  },
  methods: {
    active() {
      if (this.$route.path.indexOf("/create-customer") == 0) {
        return "/customer";
      }
      if (this.$route.path.indexOf("/check-customer") == 0) {
        return "/customer";
      }
      if (this.$route.path.indexOf("/create-product") == 0) {
        return "/product";
      }
      if (this.$route.path.indexOf("/check-product") == 0) {
        return "/product";
      }
      if (this.$route.path.indexOf("/purchase-product") == 0) {
        return "/product";
      }
      if (this.$route.path.indexOf("/redeem-product") == 0) {
        return "/product";
      }
      if (this.$route.path.indexOf("/check-bank-card-change") == 0) {
        return "/customer";
      }
      if (this.$route.path.indexOf("/check-product-change") == 0) {
        return "/customer";
      }
      return this.$route.path;
    },
    timeInit() {
      this.$http.post("/client/viewSystemTime", {}).then((response) => {
        // console.log(response.data.system_time, response.data.system_time.split(" "));
        [this.date, this.time, this.week] =
          response.data.system_time.split(" ");
      });
    },
    timeAdd(millisecond) {
      this.$http
        .post("/client/timeForward", {
          millisecond,
        })
        .then((response) => {
          this.timeInit();
          this.$emit("needFlush");
        });
    },
    timeAddMinute(event) {
      event.currentTarget.blur();
      this.timeAdd(1000 * 60);
    },
    timeAddHour(event) {
      event.currentTarget.blur();
      this.timeAdd(1000 * 60 * 60);
    },
    timeAddDay(event) {
      event.currentTarget.blur();
      this.timeAdd(1000 * 60 * 60 * 24);
    },
    timeClick(event) {
      event.currentTarget.blur();

      const h = this.$createElement;
      this.$msgbox({
        title: "时间管理带师",
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
                  click: this.timeAddMinute,
                },
              },
              "加一分钟"
            ),
            h(
              "el-button",
              {
                attrs: {
                  type: "",
                },
                on: {
                  click: this.timeAddHour,
                },
              },
              "加一小时"
            ),
            h(
              "el-button",
              {
                attrs: {
                  type: "",
                },
                on: {
                  click: this.timeAddDay,
                },
              },
              "加一天"
            ),
          ]
        ),
        showCancelButton: true,
        showConfirmButton: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).catch(() => {});
    },
  },
};
</script>
