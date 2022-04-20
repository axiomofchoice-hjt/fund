<template>
  <div>
    <el-input placeholder="请输入内容" v-model="input" clearable> </el-input>
    <el-radio-group v-model="radio1" style="float: right">
      <el-radio-button label="A"></el-radio-button>
      <el-radio-button label="B"></el-radio-button>
      <el-radio-button label="C"></el-radio-button>
    </el-radio-group>
    <el-button type="primary" style="float: right">筛选</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
