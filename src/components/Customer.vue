<template>
  <div>
    <div>
      <el-table :data="[{}]" :show-header="false">
        <el-table-column>
          <el-input
            placeholder="请输入筛选内容"
            v-model="filterInput"
            clearable
          >
          </el-input>
        </el-table-column>
        <el-table-column :width="190">
          <el-button type="primary" @click="filterClick">
            <i class="el-icon-search"> </i> 搜索
          </el-button>
          <el-button type="success" @click="createCustomerClick">
            开户
          </el-button>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-table :data="table" border>
        <el-table-column prop="customer_name" label="客户姓名">
        </el-table-column>
        <el-table-column prop="customer_type" label="客户类型">
        </el-table-column>
        <el-table-column prop="customer_id_type" label="证件类型">
        </el-table-column>
        <el-table-column prop="customer_id" label="证件号码"> </el-table-column>
        <el-table-column prop="customer_risk" label="风险等级">
        </el-table-column>
        <el-table-column label="操作" :width="190">
          <template slot-scope="scope">
            <div style="text-align: center">
              <el-button type="primary" style="margin-right: 10px" @click="checkClick(scope)">
                查看
              </el-button>
              <el-popconfirm title="删除客户？" @confirm="deleteClick(scope)">
                <el-button type="danger" slot="reference"> 删除 </el-button>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterInput: "",
      table: [],
    };
  },
  mounted() {
    this.filterClick();
  },
  methods: {
    flush() {
      this.filterClick();
    },
    filterClick(event) {
      if (event != undefined) event.currentTarget.blur();
      this.$http.post("/client/viewAllCustomer", {}).then((response) => {
        console.log(response);
        this.table = response.data.customer_info;
        console.log(this.table);
      });
    },
    createCustomerClick() {
      this.$router.push("/create-customer");
    },
    checkClick(scope) {
      this.$router.push(`/check-customer/${scope.row.customer_number}`)
    },
    deleteClick(scope) {
      console.log(scope.row);
      this.$http
        .post("/client/deleteCustomer", {
          customer_number: scope.row.customer_number,
        })
        .then((response) => {
          console.log("delete result:", response);
          this.filterClick();
        });
    },
  },
};
</script>
