<template>
  <el-row :gutter="10">
    <el-col :span="4">
      <xaside />
    </el-col>
    <el-col :span="20">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>
<script>
import xaside from "@/components/Aside";
export default {
  components: {
    xaside,
  },
};
</script>
