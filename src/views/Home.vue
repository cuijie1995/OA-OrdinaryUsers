<template>
  <div class="home">
    <div class="top">
      <Header title="统计分析"></Header>
    </div>
    <div class="content">
      <div>
        <h4>订单统计分析</h4>
        <ul>
          <a @click="$router.push('analysis')">
            <li>
              <i class="iconfont iconziyuan" style="color: #1ececd;font-size:42px"></i>
              <br />
              <span>客户订单同比分析</span>
            </li>
          </a>
          <a @click="$router.push('statistics')">
            <li>
              <i class="iconfont icondingdantongji" style="color: #fe8a57;font-size:42px"></i>
              <br />
              <span>客户订单统计</span>
            </li>
          </a>
        </ul>
      </div>
      <div>
        <h4>应收分析</h4>
        <ul>
          <a @click="$router.push('receivable')">
            <li>
              <i class="iconfont iconyingshoutongji" style="color: #7452bf;font-size:45px"></i>
              <br />
              <span>客户应收统计</span>
            </li>
          </a>
          <a @click="$router.push('overdue')">
            <li>
              <i class="iconfont iconyuqi1" style="color: #ff6565;font-size:45px"></i>
              <br />
              <span>客户逾期统计</span>
            </li>
          </a>
        </ul>
      </div>
      <!-- <div>
                <h4>
                    收付款查询
                </h4>
                <ul>
                    <a @click="$router.push('receivables')">
                        <li>
                            <i class="iconfont iconshoufukuanchaxun" style="color: #1d8fe1;font-size:42px"></i>
                            <br>
                            <span>
                                客户收款查询
                            </span>

                        </li>
                    </a>
                    <a @click="$router.push('payment')">
                        <li>
                            <i class="iconfont iconfukuan" style="color: #00cd68;font-size:42px"></i>
                            <br>
                            <span>
                                客户付款查询
                            </span>

                        </li>
                    </a>
                </ul>
      </div>-->
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";

export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    Header,
  },
  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/login");
    }
  },
  methods: {},
};
</script>
<style scoped>
.top {
  width: 100%;
  height: 50px;
}

.content {
  padding-bottom: 30px;
}

.content > div {
  margin-bottom: 30px;
}

.content h4 {
  text-align: left;
  margin-left: 5%;
  margin-bottom: 15px;
  font-size: 16px;
  margin-top: 20px;
}

.content ul {
  overflow: hidden;
  margin-bottom: 15px;
  padding-left: 20px;
}

.content ul li {
  float: left;
  width: 33%;
  font-size: 14px;
  text-align: center;
}

span {
  display: block;
  padding-top: 10px;
}

.home {
  height: calc(100% - 55px) !important;
}
</style>