<template>
  <div v-if="$route.path != '/'">
    <el-row :gutter="10">
      <el-col :span="4">
        <xaside />
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
  <div v-else>
    <sign-in />
  </div>
</template>
<script>
import xaside from "@/components/Aside";
import SignIn from '../components/SignIn.vue';
export default {
  components: {
    xaside,
    SignIn,
  },
};
</script>
