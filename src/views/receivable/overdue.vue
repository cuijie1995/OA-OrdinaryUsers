<template>
  <div class="overdue">
    <van-nav-bar title="客户逾期统计" left-text="返回" left-arrow @click-left="$router.push('home')">
      <van-icon name="search" slot="right" @click="handleSearch()" />
    </van-nav-bar>

    <div class="search_header" v-if="display">
      <div class="search_wrap" v-for="(item,index) in filters " :key="index">
        <input type="text" v-model="item.value" :placeholder="item.name" />
      </div>
      <button @click.prevent="search">搜索</button>
    </div>

    <div class="do">
      <div class="content" ref="wrap">
        <div class="cont">
          <div v-for="(item,index) in overdue" class="van">
            <div
              v-if="index % 2 == 0"
              class="name"
              @click="detail(item.vieW_WF_BEOVERDUEOID,item.ccontactname)"
            >
              <p>{{item.ccontactname}}</p>
              <span>逾期总额：{{item.naccamt}}</span>
              <el-row>
                <el-col :span="12">
                  <span>逾期<=10天：{{item.lostdays}}</span>
                </el-col>
                <el-col :span="12">
                  <span>逾期>=10天：{{item.lostdayS1}}</span>
                </el-col>
              </el-row>
            </div>
            <div
              v-if="index % 2 !== 0"
              class="nameli"
              @click="detail(item.vieW_WF_BEOVERDUEOID,item.ccontactname)"
            >
              <p>{{item.ccontactname}}</p>
              <span>逾期总额：{{item.naccamt}}</span>
              <el-row>
                <el-col :span="12">
                  <span>逾期<=10天：{{item.lostdays}}</span>
                </el-col>
                <el-col :span="12">
                  <span>逾期>=10天：{{item.lostdayS1}}</span>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="bottom_tip" v-if="down">下拉刷新，发现更多</div>
          <div class="bottom_tip" v-else>没有更多数据</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let self;
import axios from "axios";
import BScroll from "better-scroll";
import { setTimeout } from "timers";

export default {
  name: "Overdue",
  data() {
    return {
      overdue: [],
      keyId: "",
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
          name: "逾期<=10天"
        },
        {
          key: "lostdayS1 ",
          value: "",
          contract: "=",
          name: "逾期>=10天"
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
    self.getData();

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
        self.getData();
      } else if (pos.y < self.bsScroll.maxScrollY - 30) {
        self.pageIndex++;
        if (self.pageIndex <= self.lastPage) {
          let token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          self.$axios
            .post(self.url + "/api/Payment/GetBeOverdCe", {
              resultCount: self.resultCount,
              pageIndex: self.pageIndex
            })
            .then(res => {
              self.overdue = self.overdue.concat(res.data.items);
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
      this.$router.push({ path: "home" });
    },
    getData() {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      self.$axios
        .post(self.url + "/api/Payment/GetBeOverdCe", {
          resultCount: self.resultCount,
          pageIndex: self.pageIndex
        })
        .then(res => {
          self.overdue = res.data.items;
          self.lastPage = Math.ceil(res.data.totalCount / 30);
        })
        .catch(err => {});
    },
    detail(oid, name) {
      localStorage.setItem("id", oid);
      localStorage.setItem("cname", name);
      self.$router.push("overdueDetail");
    },

    handleSearch() {
      self.display = true;
    },
    search() {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      self.$axios
        .post(self.url + "/api/Payment/GetBeOverdCe", {
          resultCount: self.resultCount,
          pageIndex: self.pageIndex,
          filters: self.filters
        })
        .then(res => {
          if (res.data.items.length == 0) {
            (self.filters = [
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
                name: "逾期<=10天"
              },
              {
                key: "lostdayS1 ",
                value: "",
                contract: "=",
                name: "逾期>=10天"
              }
            ]),
              (self.overdue = res.data.items);
            self.display = false;
          } else {
            (self.filters = [
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
                name: "逾期<=10天"
              },
              {
                key: "lostdayS1 ",
                value: "",
                contract: "=",
                name: "逾期>=10天"
              }
            ]),
              (self.overdue = res.data.items);
            self.display = false;
          }
        })
        .catch(() => {
          alert("您输入的条件有误，请重新输入");
        });
    }
  }
};
</script>
<style scoped lang="scss">
.overdue {
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
  padding-top: 40px;
  /* overflow-y: scroll; */
}

.cont {
  min-height: 100%;
  padding-top: 40px;
  position: relative;
  overflow-y: scroll;
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
  color: #000000;
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
.overdue {
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
}
</style>