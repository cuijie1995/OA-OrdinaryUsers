<template>
  <div class="me">
    <div class="top">
      <Header title="我的"></Header>
    </div>
    <div class="content" @click="$router.push('/login')">
      <div class="mine" @click="$router.push('modify')">
        <van-row>
          <van-col span="22">
            <van-row>
              <van-col span="5">
                <img src="../assets/images/qq.jpg" />
              </van-col>
              <van-col span="8">
                <span style="color: #ffffff;">昵称</span>
              </van-col>
            </van-row>
          </van-col>
          <van-col span="2">
            <i class="fa fa-angle-right" style=" color: #ffffff;"></i>
          </van-col>
        </van-row>
      </div>
      <div class="other" @click="$router.push('fit')">
        <van-row>
          <van-col span="22" style="padding-top: 2%;">
            <i class="iconfont icon_shezhi-xian" style="color:#1296db"></i>
            <span>设置</span>
          </van-col>
          <van-col span="2">
            <i class="fa fa-angle-right"></i>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="button">
      <van-button @click="login" type="primary">退出登录</van-button>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";
export default {
  name: "Me",
  data: function () {
    return {};
  },
  components: {
    Header,
  },
  mounted() {},
  methods: {
    login() {
      localStorage.removeItem("token");
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.me {
  height: calc(100% - 55px) !important;
  width: 100%;
  background-color: #f8f9fb;
}

.top {
  width: 100%;
  height: 50px;
}

.content {
  width: 100%;
}

.mine {
  background: #009eef;
  padding: 0 0 0 8%;
  margin-bottom: 20px;
}

.mine img {
  width: 40px;
  height: 40px;
  border-radius: 20%;
}

.van-col--8,
.van-col--2 {
  padding-top: 4%;
}

.fa {
  font-size: 25px;
}

.iconfont {
  font-size: 20px;
}

.other {
  background: #ffffff;
  padding: 0 0 0 10%;
  margin-bottom: 20px;
}
.button {
  text-align: center;
  margin-top: 100px;
}
</style>