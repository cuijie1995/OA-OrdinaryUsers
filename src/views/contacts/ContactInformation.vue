<template>
  <div class="info">
    <div v-if="oid">
      <van-nav-bar
        title="联系人"
        left-text="返回"
        right-text="新增联系人"
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="$router.push('addinformation')"
      />

      <div class="infor">
        <div class="contents" v-if="info.length > 0" ref="wrap">
          <div class="conts">
            <van-collapse v-model="activeNames" v-for="(item,index) in info" :key="index">
              <van-collapse-item :name="index">
                <div slot="title">
                  <div v-if="index % 2 == 0" class="name">
                    <el-row>
                      <el-col :span="12">
                        <span>联系人：{{item.ccontacts}}</span>
                      </el-col>
                      <el-col :span="12">
                        <span>单号：{{item.cdocno}}</span>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-if="index % 2 !== 0" class="nameli">
                    <el-row>
                      <el-col :span="12">
                        <span>联系人：{{item.ccontacts}}</span>
                      </el-col>
                      <el-col :span="12">
                        <span>单号：{{item.cdocno}}</span>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <ul class="detail">
                  <li>
                    <p>简称：</p>
                    <span>{{item.cshortname}}</span>
                  </li>
                  <li>
                    <p>主要联系方式：</p>
                    <span>{{item.cmaimcw}}</span>
                  </li>
                  <li>
                    <p>部门：</p>
                    <span>{{item.cdapartment}}</span>
                  </li>
                  <li>
                    <p>性别：</p>
                    <span>{{item.csex}}</span>
                  </li>
                  <li>
                    <p>固定电话：</p>
                    <span>{{item.ctel}}</span>
                  </li>
                  <li>
                    <p>移动电话1：</p>
                    <span>{{item.cmobilephone1}}</span>
                  </li>
                  <li>
                    <p>移动电话2：</p>
                    <span>{{item.cmobilephone2}}</span>
                  </li>
                  <li>
                    <p>电子邮箱：</p>
                    <span>{{item.cemail}}</span>
                  </li>
                  <li>
                    <p>QQ：</p>
                    <span>{{item.cqq}}</span>
                  </li>
                  <li>
                    <p>微信：</p>
                    <span>{{item.cwechat}}</span>
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
        <div class="tishi" v-else>
          <h5>暂无相关联系人信息</h5>
        </div>
      </div>
    </div>
    <div v-else class="else">
      <van-nav-bar title="联系人" left-text="返回" left-arrow @click-left="$router.go(-1)">
        <van-icon name="search" slot="right" @click="handleSearch()" />
      </van-nav-bar>

      <div class="search_header" v-if="display">
        <div class="search_wrap" v-for="(item,index) in filters " :key="index">
          <input type="text" v-model="item.value" :placeholder="item.name" />
        </div>
        <button @click.prevent="search">搜索</button>
      </div>

      <div class="infor">
        <div class="content" ref="wrap">
          <div class="cont">
            <van-collapse v-model="activeNames" v-for="(item,index) in datas" :key="index">
              <van-collapse-item :name="index">
                <div slot="title">
                  <div v-if="index % 2 == 0" class="name">
                    <el-row>
                      <el-col :span="10">
                        <span>联系人：{{item.ccontacts}}</span>
                      </el-col>
                      <el-col :span="14">
                        <span>联系人编号：{{item.cdocno}}</span>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-if="index % 2 !== 0" class="nameli">
                    <el-row>
                      <el-col :span="10">
                        <span>联系人：{{item.ccontacts}}</span>
                      </el-col>
                      <el-col :span="14">
                        <span>联系人编号：{{item.cdocno}}</span>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <ul class="detail">
                  <li>
                    <p>简称：</p>
                    <span>{{item.cshortname}}</span>
                  </li>
                  <li>
                    <p>主要联系方式：</p>
                    <span>
                      <a :href="'tel:'+item.cmaimcw">{{item.cmaimcw}}</a>
                    </span>
                  </li>
                  <li>
                    <p>部门：</p>
                    <span>{{item.cdapartment}}</span>
                  </li>
                  <li>
                    <p>性别：</p>
                    <span>{{item.csex}}</span>
                  </li>
                  <li>
                    <p>固定电话：</p>
                    <span>
                      <a :href="'tel:'+item.ctel">{{item.ctel}}</a>
                    </span>
                  </li>
                  <li>
                    <p>移动电话1：</p>
                    <span>
                      <a :href="'tel:'+item.cmobilephone1">{{item.cmobilephone1}}</a>
                    </span>
                  </li>
                  <li>
                    <p>移动电话2：</p>
                    <span>
                      <a :href="'tel:'+item.cmobilephone2">{{item.cmobilephone2}}</a>
                    </span>
                  </li>
                  <li>
                    <p>电子邮箱：</p>
                    <span>{{item.cemail}}</span>
                  </li>
                  <li>
                    <p>QQ：</p>
                    <span>{{item.cqq}}</span>
                  </li>
                  <li>
                    <p>微信：</p>
                    <span>{{item.cwechat}}</span>
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
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
  name: "ContactInformation",
  data() {
    return {
      activeNames: [],
      datas: [],
      oid: "",
      info: [],
      resultCount: 30,
      pageIndex: 1,
      filters: [
        {
          key: "Ccontacts",
          value: "",
          contract: "like",
          name: "联系人"
        },
        {
          key: "Cdocno",
          value: "",
          contract: "=",
          name: "联系人编号"
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
        self.getData();
      } else if (pos.y < this.bsScroll.maxScrollY - 40) {
        self.pageIndex++;
        if (self.pageIndex <= self.lastPage) {
          let token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          self.$axios
            .post(self.url + "/api/Payment/ContactPessonPage", {
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
          .post(self.url + "/api/Payment/ContactPessonPage", {
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
            self.info = res.data.items;
            self.lastPage = Math.ceil(res.data.totalCount / 30);
            localStorage.removeItem("vid");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        self.$axios
          .post(self.url + "/api/Payment/ContactPessonPage", {
            resultCount: self.resultCount,
            pageIndex: self.pageIndex
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
        .post(self.url + "/api/Payment/ContactPessonPage", {
          resultCount: self.resultCount,
          pageIndex: self.pageIndex,
          filters: self.filters
        })
        .then(res => {
          self.datas = res.data.items;

          (self.filters = [
            {
              key: "Ccontacts",
              value: "",
              contract: "like",
              name: "联系人"
            },
            {
              key: "Cdocno",
              value: "",
              contract: "=",
              name: "联系人编号"
            }
          ]),
            (self.display = false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lang="scss">
.info {
  height: 100%;
}

.tishi {
  padding-top: 20vw;
  text-align: center;
}

.else,
.infor {
  width: 100%;
  height: 100%;
}

.infor {
  padding-top: 15%;
}

.bottom_tip {
  position: absolute;
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
  padding: 3% 3% 3% 5%;
}

.content .nameli {
  background: #f3eded !important;
  height: 100%;
  padding: 3% 3% 3% 5%;
}

.content {
  .name p,
  .nameli p {
    /* float: left; */
    font-size: 3.7vw;
    width: 45%;
    padding: 3vw 0 3vw 2vw;
    text-align: left;
  }

  .name p:first-child,
  .nameli p:first-child {
    width: 30%;
    padding-left: 10vw;
  }

  .name p:nth-child(2),
  .nameli p:nth-child(2) {
    width: 50%;
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
  padding: 3% 3% 3% 5%;
}

.contents .nameli {
  background: #f3eded !important;
  height: 100%;
  padding: 3% 3% 3% 5%;
}

.contents .van .name,
.contents .van .nameli {
  p {
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
  p {
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
  font-size: 4vw;
  padding: 1.5% 0;
  width: 20%;
}
</style>
<style lang="scss">
.info {
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
}
</style>