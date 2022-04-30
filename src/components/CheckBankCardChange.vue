<template>
  <div>
    <el-container>
      <el-main>
        <div class="s-header">
          <el-page-header @back="$router.go(-1)" content="银行卡流水">
          </el-page-header>
        </div>

        <div class="s-title">银行卡信息</div>
        <el-descriptions :column="3" direction="vertical" border>
          <el-descriptions-item label="银行卡号">
            {{ this.$route.params.number }}
          </el-descriptions-item>
          <el-descriptions-item label="余额">
            {{ this.bank_card_balance }}
          </el-descriptions-item>
        </el-descriptions>

        <div class="s-title" style="margin-top: 10px">银行卡流水</div>
        <el-table :data="table" border>
          <el-table-column prop="bank_card_number" label="银行卡号">
          </el-table-column>
          <el-table-column prop="trade_type" label="交易类型">
          </el-table-column>
          <el-table-column prop="amount_difference" label="金额变化">
          </el-table-column>
          <el-table-column prop="trade_time" label="交易时间">
          </el-table-column>
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bank_card_balance: "",
      table: [],
    };
  },
  mounted() {
    this.flush();
  },
  methods: {
    flush() {
      this.$http
        .post("/client/viewBankCardChange", {
          bank_card_number: this.$route.params.number,
        })
        .then((response) => {
          console.log(response);
          this.bank_card_balance = response.data.bank_card_balance;
          this.table = response.data.bank_card_change;
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