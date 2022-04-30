<template>
  <div style="text-align: center">
    <div class="s-border is-always-shadow">
      <el-image style="width: 100%" src="/Logo.png" fit="contain"></el-image>
      <h3
        style="
          margin-top: 5px;
          margin-bottom: 15px;
          color: #888;
          font-size: 24px;
        "
      >
        登录
      </h3>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        style="padding-right: 20px"
      >
        <el-form-item label="用户名" style="margin-bottom: 10px">
          <el-input
            v-model="form.username"
            :maxlength="100"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            :maxlength="100"
            show-password
            size="small"
          ></el-input>
        </el-form-item>
        <el-button
          type="info"
          size="small"
          style="float: right; margin-left: 10px"
          @click="alwaysSignInClick"
        >
          登尼玛，直接进
        </el-button>
        <el-button
          type="success"
          size="small"
          style="float: right; margin-bottom: 28px"
          @click="signInClick"
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    flush() {},
    alwaysSignInClick(event) {
      if (event != undefined) event.currentTarget.blur();
      this.$router.push("/product");
    },
    signInClick(event) {
      if (event != undefined) event.currentTarget.blur();
      if (this.form.username == "admin" && this.form.password == "114514") {
        this.$router.push("/product");
      } else {
        this.$alert("用户名或密码错误", "", {
          confirmButtonText: "确定",
          callback: (action) => {},
        });
      }
    },
  },
};
</script>
<style scoped>
.s-border {
  display: inline-block;
  width: 300px;
  margin-top: 100px;
  background: rgba(0, 0, 0, 0);
  padding: 20px;

  /* border: 1px solid rgb(255, 145, 0); */
  /* background: rgb(246, 255, 0) */
}

.is-always-shadow {
  box-sizing: border-box;
  border: 1px #ced8e4 solid;
  border-right: 0;
  border-radius: 20px;
  box-shadow: 0 0 10px 2px #bdcee0;
}
</style>