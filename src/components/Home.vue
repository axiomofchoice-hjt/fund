<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <el-container>
          <el-header>
            <el-table :data="[{}]" :show-header="false">
              <el-table-column>
                <el-input
                  placeholder="请输入筛选内容"
                  v-model="filterInput"
                  clearable
                >
                </el-input>
              </el-table-column>
              <el-table-column width="100">
                <el-button type="primary" @click="filterClick"> 筛选 </el-button>
                <!-- <el-radio-group v-model="headerRadio" style="float: right">
            <el-radio-button label="用户信息"></el-radio-button>
            <el-radio-button label="产品信息"></el-radio-button>
            <el-radio-button label="交易信息"></el-radio-button>
          </el-radio-group> -->
              </el-table-column>
            </el-table>
          </el-header>
          <el-main>
            <el-table border />
          </el-main>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterInput: "",
      headerRadio: "用户信息",
    };
  },
  methods: {
    filterClick() {
      this.$http.post("/client/viewAllCustomer", {

      }).then((response) => {
        console.log(response);
      })
    }
  }
};
</script>
