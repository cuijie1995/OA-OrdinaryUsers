<template>
  <div class="visit">
    <div v-if="oid">
      <van-nav-bar
        title="走访记录"
        left-text="返回"
        right-text="新增走访记录"
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="$router.push('addvisit')"
      />

      <div class="vis">
        <div class="contents" v-if="visit.length > 0" ref="wrap">
          <div class="conts">
            <van-collapse
              v-model="activeNames"
              v-for="(item,index) in visit"
              :key="index"
              @change="onChange(index)"
              class="van"
              :class="{ul:keyIndex=== index && show}"
            >
              <van-collapse-item :name="index">
                <div slot="title">
                  <div v-if="index % 2 == 0" class="name">
                    <el-row>
                      <el-col :span="16">
                        <span>{{item.cinterviewpeo}}</span>
                      </el-col>
                      <el-col :span="8">
                        <span>{{item.dinterviewdate}}</span>
                      </el-col>
                    </el-row>
                    <p>{{item.cobjective}}</p>
                  </div>
                  <div v-if="index % 2 !== 0" class="nameli">
                    <el-row>
                      <el-col :span="16">
                        <span>{{item.cinterviewpeo}}</span>
                      </el-col>
                      <el-col :span="8">
                        <span>{{item.dinterviewdate}}</span>
                      </el-col>
                    </el-row>
                    <p>{{item.cobjective}}</p>
                  </div>
                </div>
                <ul class="detail">
                  <li>
                    <p>走访地址：</p>
                    <span>{{item.cinterviewaddress}}</span>
                  </li>
                  <li>
                    <p>接待人姓名：</p>
                    <span>{{item.creceive}}</span>
                  </li>
                  <li>
                    <p>接待人职位：</p>
                    <span>{{item.creceivedept}}</span>
                  </li>

                  <li>
                    <p>口述员工人数：</p>
                    <span>{{item.nsongpeocount}}</span>
                  </li>
                  <li>
                    <p>现场员工人数：</p>
                    <span>{{item.npeocount}}</span>
                  </li>
                  <li>
                    <p>走访情况说明：</p>
                    <span>{{item.cremark}}</span>
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
        <div v-else class="tishi">
          <h5>暂无相关走访记录</h5>
        </div>
      </div>
    </div>

    <div v-else class="else">
      <van-nav-bar title="走访记录" left-text="返回" left-arrow @click-left="$router.go(-1)">
        <!-- <van-icon name="search" slot="right" @click="$router.push('searchvisit')" /> -->
        <van-icon name="search" slot="right" @click="handleSearch()" />
      </van-nav-bar>

      <div class="search_header" v-if="display">
        <div class="search_wrap" v-for="(item,index) in filters " :key="index">
          <input type="text" v-model="item.value" :placeholder="item.name" />
        </div>
        <button @click.prevent="search">搜索</button>
      </div>

      <div class="vis">
        <div class="content" ref="wrap">
          <div class="cont">
            <van-collapse
              v-model="activeNames"
              v-for="(item,index) in datas"
              :key="index"
              @change="onChange(index)"
              class="van"
              :class="{ul:keyIndex=== index && show}"
            >
              <van-collapse-item :name="index">
                <div slot="title">
                  <div slot="title">
                    <div v-if="index % 2 == 0" class="name">
                      <el-row>
                        <el-col :span="16">
                          <span>{{item.cinterviewpeo}}</span>
                        </el-col>
                        <el-col :span="8">
                          <span>{{item.dinterviewdate}}</span>
                        </el-col>
                      </el-row>
                      <p>{{item.cobjective}}</p>
                    </div>
                    <div v-if="index % 2 !== 0" class="nameli">
                      <el-row>
                        <el-col :span="16">
                          <span>{{item.cinterviewpeo}}</span>
                        </el-col>
                        <el-col :span="8">
                          <span>{{item.dinterviewdate}}</span>
                        </el-col>
                      </el-row>
                      <p>{{item.cobjective}}</p>
                    </div>
                  </div>
                </div>
                <ul class="detail">
                  <li>
                    <p>走访地址：</p>
                    <span>{{item.cinterviewaddress}}</span>
                  </li>
                  <li>
                    <p>接待人姓名：</p>
                    <span>{{item.creceive}}</span>
                  </li>
                  <li>
                    <p>接待人职位：</p>
                    <span>{{item.creceivedept}}</span>
                  </li>

                  <li>
                    <p>口述员工人数：</p>
                    <span>{{item.nsongpeocount}}</span>
                  </li>
                  <li>
                    <p>现场员工人数：</p>
                    <span>{{item.npeocount}}</span>
                  </li>
                  <li>
                    <p>走访情况说明：</p>
                    <span>{{item.cremark}}</span>
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
  name: "Visit",
  data() {
    return {
      activeNames: [],
      show: false,
      keyIndex: "",
      datas: [],
      oid: "",
      visit: [],
      resultCount: 30,
      pageIndex: 1,
      filters: [
        {
          key: "Cinterviewpeo",
          value: "",
          contract: "like",
          name: "走访人员"
        },
        {
          key: "Dinterviewdate",
          value: "",
          contract: "like",
          name: "走访时间"
        },
        {
          key: "Cobjective",
          value: "",
          contract: "like",
          name: "走访目的"
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
            .post(self.url + "/api/Payment/InterViewLIst", {
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
    onChange(index) {
      self.show = !self.show;
      self.keyIndex = index;
    },
    getData() {
      self.oid = localStorage.getItem("vid");
      if (self.oid) {
        self.$axios
          .post(this.url + "/api/Payment/InterViewLIst", {
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
            self.visit = res.data.items;
            self.lastPage = Math.ceil(res.data.totalCount / 30);
            localStorage.removeItem("vid");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        self.$axios
          .post(this.url + "/api/Payment/InterViewLIst", {
            pageIndex: self.pageIndex,
            resultCount: self.resultCount
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
        .post(self.url + "/api/Payment/InterViewLIst", {
          resultCount: self.resultCount,
          pageIndex: self.pageIndex,
          filters: self.filters
        })
        .then(res => {
          self.datas = res.data.items;

          (self.filters = [
            {
              key: "Cinterviewpeo",
              value: "",
              contract: "like",
              name: "走访人员"
            },
            {
              key: "Dinterviewdate",
              value: "",
              contract: "like",
              name: "走访时间"
            },
            {
              key: "Cobjective",
              value: "",
              contract: "like",
              name: "走访目的"
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
.visit {
  height: 100%;
}

.tishi {
  padding-top: 20vw;
  text-align: center;
}

.else,
.vis {
  width: 100%;
  height: 100%;
}

.vis {
  padding-top: 16%;
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
    margin: 0;
    padding: 2vw 1vw 1vw 0;
    font-size: 3.5vw;
  }
}

.content .ul .name,
.content .ul .nameli {
  p {
    width: 100%;
    white-space: pre-wrap !important;
    margin: 0;
    padding: 2vw 1vw 1vw 0;
    font-size: 3.5vw;
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
  width: 25%;
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

.el-col.el-col-16 {
  line-height: 4.5vw;

  span {
    font-weight: 700;
    font-size: 4vw;
  }
}

.el-col.el-col-8 {
  text-align: right;
  /* margin-top: 1%; */

  span {
    font-size: 3.1vw;
  }
}
</style>
<style lang="scss">
.visit {
  .van-cell {
    padding: 0;
    line-height: 3vw;
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

  .van-cell__title > div,
  .van-cell__title > div > div {
    height: 100%;
  }
}
</style>