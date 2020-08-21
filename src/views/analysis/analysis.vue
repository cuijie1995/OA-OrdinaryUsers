<template>
  <div class="analysiss">
    <van-nav-bar title="客户订单同比分析USD" left-text="返回" left-arrow @click-left="$router.push('home')" />

    <div class="analysis">
      <ul class="title">
        <el-row>
          <el-col :span="7">
            <li>客户</li>
          </el-col>
          <el-col :span="5">
            <li>业务类型</li>
          </el-col>
          <el-col :span="6">
            <li>年度累计差异</li>
          </el-col>
          <el-col :span="6">
            <li style="border: none;">本期累计差异</li>
          </el-col>
        </el-row>
      </ul>
      <ul v-for="(analysi,index) in analysis" :key="index" class="title_content">
        <el-row>
          <el-col :span="7" style="padding:1%">
            <li>{{analysi.ccontactname}}</li>
          </el-col>
          <el-col :span="5" style="text-align: center;">
            <li>{{analysi.cbusitype}}</li>
          </el-col>
          <el-col :span="6">
            <li>{{analysi.yearonyear}}</li>
          </el-col>
          <el-col :span="6" style="text-align: center;">
            <li>{{analysi.monthonmonth}}</li>
          </el-col>
        </el-row>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Analysis",
  data() {
    return {
      analysis: [],
    };
  },
  mounted() {
    this.GetClientAnalysis();
  },
  methods: {
    GetClientAnalysis() {
      let token = localStorage.getItem("token");
      this.$axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      this.$axios
        .post(this.url + "/api/Payment/GetClientAnalysis", {})
        .then((res) => {
          this.analysis = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.analysis {
  padding-top: 18vw;
  margin: 0 5%;
  margin-bottom: 20%;
}

.analysis ul {
  font-size: 3vw;
  text-align: left;
}

.analysis .title {
  color: #ffffff;
  text-align: center;
  background-color: #6ccacd;
}
.analysis .title li {
  border-right: 1px #ffffff solid;
}
.analysis .el-col {
  padding: 1% 0;
}
.title_content {
  background: #f5f7fa;
}
</style>
<style lang="scss">
.analysiss .van-nav-bar {
  position: fixed;
  width: 100%;
  background: #f7f7f7;
  /* top: 0; */
}
</style>