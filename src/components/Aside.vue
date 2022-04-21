<template>
  <div>
    <div>
      <h3 style="text-align: center">LOGO</h3>
      <div style="text-align: center">{{ this.date }}</div>
      <div style="text-align: center">{{ this.time }}</div>
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
      <el-menu-item index="/C">
        <!-- <i class="el-icon-document"></i> -->
        <span slot="title">交易记录</span>
      </el-menu-item>
      <el-submenu index="/D">
        <!-- <i class="el-icon-setting"></i> -->
        <span slot="title">后台管理</span>
        <el-menu-item index="/D">数据库</el-menu-item>
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
      return this.$route.path;
    },
    timeInit() {
      this.date = this.$dayjs().format("YYYY 年 MM 月 DD 日");
      this.time = this.$dayjs().format("HH:mm:ss");
    },
  },
};
</script>
