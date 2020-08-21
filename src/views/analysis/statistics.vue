<template>
  <div class="statists">
    <van-nav-bar title="客户订单统计" left-text="返回" left-arrow @click-left="$router.push('home')" />

    <div class="statistics">
      <div class="top">
        <el-input type="number" v-model="value" />天
        <el-button type="success" @click="search()">查询</el-button>
      </div>
      <!-- <div > -->
      <ul class="name">
        <el-row>
          <el-col :span="13" style="text-align: center;">
            <li>客户</li>
          </el-col>
          <el-col :span="4">
            <li>业务类型</li>
          </el-col>
          <el-col :span="7">
            <li style="border: none;">业务量</li>
          </el-col>
        </el-row>
      </ul>
      <div>
        <ul class="name_content" v-for="(statist,i) in statistics" :key="i">
          <el-row>
            <el-col :span="13" style="padding-left:2%">
              <li>{{statist.ccontactname}}</li>
            </el-col>
            <el-col :span="4" style="text-align: center;">
              <li>{{statist.cbusitype}}</li>
            </el-col>
            <el-col :span="7" style="padding-left:1%">
              <li>{{statist.ccustomsamount}}</li>
            </el-col>
          </el-row>
        </ul>
      </div>

      <!-- </div> -->

      <div v-if="show" class="tishi">此查询范围内无订单信息</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      statistics: [],
      value: "",
      number: "",
      show: false,
    };
  },
  methods: {
    search() {
      this.number = this.value;
      this.GelClientOrder();
    },
    GelClientOrder() {
      if (this.number) {
        let token = localStorage.getItem("token");
        this.$axios.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        this.$axios
          .post(this.url + "/api/Payment/GelClientOrder?input=" + this.number)
          .then((res) => {
            this.statistics = res.data.items;
            if (this.statistics == 0) {
              this.show = true;
            } else {
              this.show = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        let token = localStorage.getItem("token");
        this.$axios.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        this.$axios
          .post(this.url + "/api/Payment/GelClientOrder")
          .then((res) => {
            this.statistics = res.data.items;
            if (this.statistics == 0) {
              this.show = true;
            } else {
              this.show = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
<style scoped>
.statistics ul {
  font-size: 3vw;
  text-align: left;
}

.statistics .top {
  text-align: center;
  margin-bottom: 5vw;
}

.statistics .name {
  color: #ffffff;
  text-align: center;
  background-color: #6ccacd;
}

.statistics .name li {
  border-right: 1px #ffffff solid;
}

.statistics .el-col {
  padding: 1% 0;
}

.statistics {
  padding-top: 18vw;
  margin: 0 5%;
  margin-bottom: 20%;
}

.statistics h4 {
  margin: 0;
}

.statistics .el-input {
  width: 20%;
  margin: 0 5%;
  color: #009eef;
  text-align: center;
}

.statistics .el-col.el-col-9 {
  font-size: 3.5vw;
}

.statistics > .el-row {
  margin-bottom: 6vw;
}

.el-button {
  padding: 2vw 6vw;
  margin-left: 3vw;
}

.name_content {
  background: #f5f7fa;
}
.tishi {
  text-align: center;
  margin-top: 25vw;
  font-size: 4.5vw;
}
</style>
<style lang="scss">
.statistics .el-input__inner {
  line-height: 25px;
  height: 25px;
}

.statists .van-nav-bar {
  position: fixed;
  width: 100%;
  background: #f7f7f7;
  /* top: 0; */
}
</style>