<template>
  <div class="record">
    <div v-if="oid">
      <van-nav-bar
        title="联系记录"
        left-text="返回"
        right-text="新增联系记录"
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="$router.push('addContact')"
      />
      <div class="rec">
        <div class="contents" v-if="record.length > 0" ref="wrap">
          <div class="conts">
            <van-collapse v-model="activeNames" v-for="(item,index) in record" :key="index">
              <van-collapse-item :name="index">
                <div slot="title">
                  <ul v-if="index % 2 == 0" class="name">
                    <li>订单号：{{item.contactNo}}</li>
                    <li>主题：{{item.title}}</li>
                  </ul>
                  <ul v-if="index % 2 !== 0" class="nameli">
                    <li>订单号：{{item.contactNo}}</li>
                    <li>主题：{{item.title}}</li>
                  </ul>
                </div>
                <ul class="detail">
                  <li>
                    <p>外出地址：</p>
                    <span>{{item.unitAddress}}</span>
                  </li>
                  <li>
                    <p>联系人职务：</p>
                    <span>{{item.unitPost}}</span>
                  </li>
                  <li>
                    <p>开始时间：</p>
                    <span>{{item.beginDate}}</span>
                  </li>
                  <li>
                    <p>计划结束时间：</p>
                    <span>{{item.planEndDate}}</span>
                  </li>
                  <li>
                    <p>实际结束时间：</p>
                    <span>{{item.factEndDate}}</span>
                  </li>
                  <li>
                    <p>联系耗时：</p>
                    <span>{{item.timeConsuming}}</span>
                  </li>
                  <li>
                    <p>联系目的：</p>
                    <span>{{item.purpose}}</span>
                  </li>
                  <li>
                    <p>联系进展：</p>
                    <span>{{item.progress}}</span>
                  </li>
                  <li>
                    <p>下次联系时间：</p>
                    <span>{{item.nextTime}}</span>
                  </li>
                  <li>
                    <p>是否遵守贸易安全：</p>
                    <span>{{item.isSafe}}</span>
                  </li>
                  <li>
                    <p>备注：</p>
                    <span>{{item.remark}}</span>
                  </li>
                  <li>
                    <p>联系状态：</p>
                    <span>{{item.state}}</span>
                  </li>
                  <li>
                    <p>单据状态：</p>
                    <span>{{item.pageState}}</span>
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
        <div v-else class="tishi">
          <h5>暂无相关联系记录</h5>
        </div>
      </div>
    </div>
    <div v-else class="else">
      <van-nav-bar title="联系记录" left-text="返回" left-arrow @click-left="$router.go(-1)">
        <van-icon name="search" slot="right" @click="handleSearch()" />
        <!-- <van-icon name="search" slot="right" @click="$router.push('SearchRecord')" /> -->
      </van-nav-bar>

      <div class="search_header" v-if="display">
        <div class="search_wrap" v-for="(item,index) in filters " :key="index">
          <input type="text" v-model="item.value" :placeholder="item.name" />
        </div>
        <button @click.prevent="search">搜索</button>
      </div>

      <div class="rec">
        <div class="content" ref="wrap">
          <div class="cont">
            <van-collapse v-model="activeNames" v-for="(item,index) in datas" :key="index">
              <van-collapse-item :name="index">
                <div slot="title">
                  <ul v-if="index % 2 == 0" class="name">
                    <li>订单号：{{item.contactNo}}</li>
                    <li>主题：{{item.title}}</li>
                  </ul>
                  <ul v-if="index % 2 !== 0" class="nameli">
                    <li>订单号：{{item.contactNo}}</li>
                    <li>主题：{{item.title}}</li>
                  </ul>
                </div>
                <ul class="detail">
                  <li>
                    <p>外出地址：</p>
                    <span>{{item.unitAddress}}</span>
                  </li>
                  <li>
                    <p>联系人职务：</p>
                    <span>{{item.unitPost}}</span>
                  </li>
                  <li>
                    <p>开始时间：</p>
                    <span>{{item.beginDate}}</span>
                  </li>
                  <li>
                    <p>计划结束时间：</p>
                    <span>{{item.planEndDate}}</span>
                  </li>
                  <li>
                    <p>实际结束时间：</p>
                    <span>{{item.factEndDate}}</span>
                  </li>
                  <li>
                    <p>联系耗时：</p>
                    <span>{{item.timeConsuming}}</span>
                  </li>
                  <li>
                    <p>联系目的：</p>
                    <span>{{item.purpose}}</span>
                  </li>
                  <li>
                    <p>联系进展：</p>
                    <span>{{item.progress}}</span>
                  </li>
                  <li>
                    <p>下次联系时间：</p>
                    <span>{{item.nextTime}}</span>
                  </li>
                  <li>
                    <p>是否遵守贸易安全：</p>
                    <span>{{item.isSafe}}</span>
                  </li>
                  <li>
                    <p>备注：</p>
                    <span>{{item.remark}}</span>
                  </li>
                  <li>
                    <p>联系状态：</p>
                    <span>{{item.state}}</span>
                  </li>
                  <li>
                    <p>单据状态：</p>
                    <span>{{item.pageState}}</span>
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
            <!-- {{lastPage}} -->
            <div v-if="lastPage == 1">
              <div class="bottom_tip">没有更多数据</div>
            </div>
            <div v-else>
              <div class="bottom_tip" v-if="down">上拉加载，发现更多</div>
              <div class="bottom_tip" v-else>没有更多数据</div>
            </div>
          </div>
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
  name: "ContactRecord",
  components: {},
  data() {
    return {
      activeNames: [],
      datas: [],
      record: [],
      oid: "",
      resultCount: 30,
      pageIndex: 1,
      filters: [
        {
          key: "ContactNo",
          value: "",
          contract: "=",
          name: "单号"
        },
        {
          key: "Title",
          value: "",
          contract: "like",
          name: "主题"
        }
      ],
      lastPage: "",
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
        self.getPage();
      } else if (pos.y < this.bsScroll.maxScrollY - 40) {
        self.pageIndex++;
        if (self.pageIndex <= self.lastPage) {
          let token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          self.$axios
            .post(self.url + "/api/Payment/ContactRecordByID", {
              resultCount: self.resultCount,
              pageIndex: self.pageIndex
            })
            .then(res => {
              self.datas = self.datas.concat(res.data.items);
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
      this.$router.push({ path: "workbench" });
    },
    getData() {
      self.oid = localStorage.getItem("vid");
      if (self.oid) {
        let token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        self.$axios
          .post(self.url + "/api/Payment/ContactRecordByID", {
            pageIndex: self.pageIndex,
            resultCount: self.resultCount,
            filters: [
              {
                key: "ZrBasContactFk",
                value: self.oid,
                contract: "="
              }
            ]
          })
          .then(res => {
            self.record = res.data.items;
            localStorage.removeItem("vid");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        self.$axios
          .post(self.url + "/api/Payment/ContactRecordByID", {
            resultCount: this.resultCount,
            pageIndex: this.pageIndex
          })
          .then(res => {
            self.datas = res.data.items;
            self.lastPage = Math.ceil(res.data.totalCount / 30);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    handleSearch() {
      self.display = true;
    },
    search() {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      self.$axios
        .post(self.url + "/api/Payment/ContactRecordByID", {
          resultCount: self.resultCount,
          pageIndex: self.pageIndex,
          filters: self.filters
        })
        .then(res => {
          self.datas = res.data.items;

          self.filters = [
            {
              key: "ContactNo",
              value: "",
              contract: "=",
              name: "单号"
            },
            {
              key: "Title",
              value: "",
              contract: "like",
              name: "主题"
            }
          ];

          self.display = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lang="scss">
.record {
  height: 100%;
}

.tishi {
  padding-top: 20vw;
  text-align: center;
}

.else,
.rec {
  width: 100%;
  height: 100%;
}

.rec {
  padding-top: 15%;
}

.bottom_tip {
  position: absolute;
  /* bottom: 5px; */
  padding-top: 15px;
  width: 100%;
  text-align: center;
}

.content {
  height: 100%;
  overflow: hidden;
  padding-top: 40px;
}

.cont {
  min-height: 100%;
  padding-top: 40px;
  position: relative;
  overflow-y: scroll;
  padding-bottom: 100px;
}

.content .name {
  padding: 3% 10%;
}

.content .nameli {
  background: #f3eded !important;
  height: 100%;
  padding: 3% 10%;
}

.contents .van .name,
.contents .van .nameli {
  li {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
    font-size: 1.5vw;
  }
}

.contents .ul .name,
.contents .ul .nameli {
  li {
    width: 100%;
    white-space: pre-wrap !important;
    margin: 0;
    font-size: 1.5vw;
  }
}

.content .detail {
  background: #ebebeb;
}

.content .detail li {
  font-size: 3.7vw;
  border-bottom: 0.1vw solid #cccacb;
  padding: 0.7vw 0;
}

.content .detail li p {
  display: inline-block;
  width: 30%;
  margin: 0 !important;
  text-align: left;
}

.content .detail li p:first-child {
  text-align: right;
}

.desc {
  padding-left: 2.7vw;
}

.contents {
  height: 100%;
  overflow: hidden;
}

.conts {
  min-height: 100%;
  position: relative;
  overflow-y: scroll;
  padding-bottom: 100px;
}

.contents .name {
  /* overflow: hidden; */
  padding: 3% 10%;
}

.contents .nameli {
  background: #f3eded !important;
  height: 100%;
  padding: 3% 10%;
}

.contents .van .name,
.contents .van .nameli {
  li {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
    font-size: 1.5vw;
  }
}

.contents .ul .name,
.contents .ul .nameli {
  li {
    width: 100%;
    white-space: pre-wrap !important;
    margin: 0;
    font-size: 1.5vw;
  }
}

.contents .detail {
  background: #ebebeb;
}

.contents .detail li {
  font-size: 3.7vw;
  border-bottom: 0.1vw solid #cccacb;
  padding: 0.7vw 0;
}

.contents .detail li p {
  display: inline-block;
  width: 30%;
  margin: 0 !important;
  text-align: left;
}

.contents .detail li p:first-child {
  text-align: right;
}

.search_header {
  background: #fff;
  position: fixed;
  top: 12vw;
  width: 100%;
  text-align: center;
  border-top: 1vw solid #ffffff;
  border-bottom: 1vw solid #ffffff;
  z-index: 100;
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
  width: 33%;
  font-size: 3.5vw;
  margin-left: 5%;
  text-align: center;
}

.search_header button {
  outline: none;
  border: none;
  color: rgb(73, 73, 73);
  background: #f8f8f8;
  font-weight: 700;
  /* margin-left: 2.933333vw; */
  font-size: 4vw;
  padding: 1.5% 0;
  width: 20%;
}
</style>
<style>
.van-cell {
  padding: 0;
}

.van-cell__right-icon {
  display: none;
}

.van-nav-bar {
  position: fixed;
  width: 100%;
  background: #f7f7f7;
}
</style>