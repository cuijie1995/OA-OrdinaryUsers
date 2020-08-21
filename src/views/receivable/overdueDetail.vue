<template>
  <div class="overdue_detail">
    <van-nav-bar :title="name" left-text="返回" left-arrow @click-left="$router.go(-1)">
      <!-- <van-icon name="search" slot="right" @click="handleSearch()" /> -->
    </van-nav-bar>

    <div class="do">
      <div class="content" ref="wrap">
        <div class="cont">
          <div v-for="(item,index) in datas" class="van">
            <div v-if="index % 2 == 0" class="name">
              <p>{{item.ccontactname}}</p>
              <span>逾期总额：{{item.naccamt}}</span>
              <el-row>
                <el-col :span="12">
                  <span>逾期天数：{{item.lostdays}}</span>
                </el-col>
                <el-col :span="12">
                  <span>业务类型：{{item.cacaptype}}</span>
                </el-col>
              </el-row>
            </div>
            <div v-if="index % 2 !== 0" class="nameli">
              <p>{{item.ccontactname}}</p>
              <span>逾期总额：{{item.naccamt}}</span>
              <el-row>
                <el-col :span="12">
                  <span>逾期天数：{{item.lostdays}}</span>
                </el-col>
                <el-col :span="12">
                  <span>业务类型：{{item.cacaptype}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- <div class="bottom_tip" v-if="down">下拉刷新，发现更多</div>
          <div class="bottom_tip" v-else>没有更多数据</div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let self;
import BScroll from "better-scroll";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      datas: [],
      name: "",
      resultCount: 30,
      pageIndex: 1,
      filters: [
        {
          key: "CCONTACTNAME",
          value: "",
          contract: "like",
          name: "客户"
        },
        {
          key: "NACCAMT",
          value: "",
          contract: "=",
          name: "逾期总额"
        },
        {
          key: "LOSTDAYS",
          value: "",
          contract: "=",
          name: "逾期天数"
        },
        {
          key: "CACAPTYPE",
          value: "",
          contract: "like",
          name: "业务类型"
        }
      ],
      lastPage: "",
      lists: [],
      kid: "",
      pullDownMsg: "下拉刷新，发现更多",
      pullUpMsg: "加载中，请稍后...",
      bsScroll: "",
      down: true,
      display: false
    };
  },
  mounted() {
    self = this;

    self.getOverdue();

    // 初始化
    self.bsScroll = new BScroll(self.$refs.wrap, {
      probeType: 1,
      click: true
    });
    // 监听滚动事件
    self.bsScroll.on("scroll", pos => {
      if (pos.y > 0 && pos.y <= 40) {
        self.pullDownMsg = "下拉刷新，发现更多";
      } else if (pos.y > 40) {
        self.pullDownMsg = "释放更新，发现更多";
      }
    });

    // 监听滚动结束
    self.bsScroll.on("touchEnd", pos => {
      if (pos.y > 40) {
        self.getOverdue();
      } else if (pos.y < self.bsScroll.maxScrollY - 30) {
        self.pageIndex++;
        if (self.pageIndex <= self.lastPage) {
          self.keyId = localStorage.getItem("id");
          self.name = localStorage.getItem("cname");
          let token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;

          self.$axios
            .post(self.url + "/api/Payment/GetBeOverdCeD1", {
              keyId: self.keyId,
              resultCount: self.resultCount,
              pageIndex: self.pageIndex
            })
            .then(res => {
              self.datas = self.datas.concat(res.data.items);

              localStorage.removeItem("id");
              localStorage.removeItem("name");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          self.down = false;
        }
      } else {
        self.down = false;
      }
    });

    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false); //false阻止默认事件    this.fun是指返回按建实际要执行的方法
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false); //false阻止默认事件
  },
  methods: {
    goBack() {
      this.$router.push({ path: "overdue" });
    },
    getOverdue() {
      self.keyId = localStorage.getItem("id");
      self.name = localStorage.getItem("cname");
let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      self.$axios
        .post(self.url + "/api/Payment/GetBeOverdCeD1", {
          keyId: self.keyId,
          resultCount: self.resultCount,
          pageIndex: self.pageIndex
        })
        .then(res => {
          self.datas = res.data.items;

          localStorage.removeItem("id");
          localStorage.removeItem("name");
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang="scss">
.overdue_detail {
  height: 100%;
}

.do {
  width: 100%;
  height: 100%;
  padding-top: 11%;
}

.bottom_tip {
  position: absolute;
  bottom: -45px;
  width: 100%;
  text-align: center;
}

.content {
  height: 100%;
  overflow: hidden;
  /* padding-top: 40px; */
  /* overflow-y: scroll; */
  padding-bottom: 14vw;
}

.cont {
  min-height: 100%;
  /* padding-top: 40px; */
  position: relative;
  overflow-y: scroll;
  padding-bottom: 100px;
}
.van {
}
.content .name {
  overflow: hidden;
  padding: 3% 10%;
}

.content .nameli {
  background: #f3eded !important;
  height: 100%;
  padding: 3% 10%;
}

.content .van .name,
.content .van .nameli {
  p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 2vw 0;
    font-size: 4vw;
    font-weight: 700;
  }

  span {
    font-size: 3.5vw;
  }
}

.search_header {
  background: #fff;
  position: fixed;
  top: 12vw;
  border-top: 1vw solid #ffffff;
  z-index: 100;
  width: 100%;
}

.search_header .search_wrap {
  padding: 6vw 0 2.933333vw 0;
  display: inline;
  align-items: center;
  position: relative;
}

.search_wrap input {
  flex-grow: 1;
  border-radius: 0.266667vw;
  background-color: #f8f8f8;
  padding: 1.733333vw 0 1.733333vw 0;
  color: rgb(124, 122, 122);
  outline: none;
  border: none;
  width: 18%;
  font-size: 3.5vw;
  margin-left: 2%;
  text-align: center;
}

.search_header button {
  outline: none;
  border: none;
  color: rgb(73, 73, 73);
  background: #f8f8f8;
  font-weight: 700;
  width: 15%;
  font-size: 4vw;
  padding: 1.5% 0;
}
</style>
<style lang="scss">
.overdue_detail {
  .van-cell {
    padding: 0;
    line-height: 18px;
  }

  .van-cell__right-icon {
    display: none;
  }

  .van-nav-bar {
    position: fixed;
    width: 100%;
    background: #f7f7f7;
  }

  .van-cell__title {
    width: 100%;
  }

  .van-cell__title > div {
    height: 100%;
  }

  .van-button--normal {
    font-size: 2vw;
  }

  .van-collapse-item__content {
    font-size: 2vw;
  }

  .van-nav-bar__title {
    font-size: 12px;
  }
}
</style>