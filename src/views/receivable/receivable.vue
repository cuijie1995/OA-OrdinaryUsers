<template>
  <div class="receivable">
    <van-nav-bar title="客户应收统计" left-text="返回" left-arrow @click-left="$router.push('home')">
      <van-icon name="search" slot="right" @click="handleSearch()" />
    </van-nav-bar>

    <div class="search_header" v-if="display">
      <div class="search_wrap" v-for="(item,index) in filters " :key="index">
        <input type="text" v-model="item.value" :placeholder="item.name" />
      </div>
      <button @click.prevent="search">搜索</button>
    </div>

    <div class="subject">
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
                <div v-if="index % 2 == 0" class="name">
                  <el-row>
                    <el-col :span="20">
                      <p>{{item.ccontactname}}</p>
                    </el-col>
                    <el-col :span="4">
                      <span>{{item.cbusitype}}</span>
                    </el-col>
                  </el-row>
                  <div class="zong">应收总额：{{item.ysamt}}</div>

                  <!-- <span style="padding-left: 10%;">{{item.ysamt}}</span> -->
                </div>
                <div v-if="index % 2 !== 0" class="nameli">
                  <el-row>
                    <el-col :span="20">
                      <p>{{item.ccontactname}}</p>
                    </el-col>
                    <el-col :span="4">
                      <span>{{item.cbusitype}}</span>
                    </el-col>
                  </el-row>
                  <div class="zong">应收总额：{{item.ysamt}}</div>
                  <!-- <span style="padding-left: 10%;">{{item.ysamt}}</span> -->
                </div>
              </div>
              <!-- <ul class="detail" @click="detail(item.zR_ORD_MASTEROID)"> -->
              <ul class="detail">
                <!-- <li>
                                    <p>应收总额：</p>
                                    <span>{{item.ysamt}}</span>
                </li>-->
                <li>
                  <p>应收货款：</p>
                  <span>{{item.hkamt}}</span>
                </li>
                <li>
                  <p>应收税款：</p>
                  <span>{{item.skamt}}</span>
                </li>
                <li>
                  <p>应收代理费：</p>
                  <span>{{item.dlfamt}}</span>
                </li>
                <li>
                  <p>应收杂费：</p>
                  <span>{{item.zfamt}}</span>
                </li>
                <li>
                  <p>其他应收：</p>
                  <span>{{item.qtamt}}</span>
                </li>
                <li>
                  <p>收款未核销：</p>
                  <span>{{item.nforeignamt}}</span>
                </li>
              </ul>
            </van-collapse-item>
          </van-collapse>
          <div class="bottom_tip" v-if="down">下拉刷新，发现更多</div>
          <div class="bottom_tip" v-else>没有更多数据</div>
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
  name: "Receivable",
  data() {
    return {
      activeNames: [],
      datas: [],
      show: false,
      keyIndex: "",
      resultCount: 30,
      pageIndex: 1,
      filters: [
        {
          key: "CCONTACTNAME",
          value: "",
          contract: "like",
          name: "客户",
        },
        {
          key: "CBUSITYPE",
          value: "",
          contract: "=",
          name: "业务类型",
        },
        {
          key: "YSAMT",
          value: "",
          contract: "=",
          name: "应收总额",
        },
      ],
      lastPage: "",
      scroll: 0,
      pullDownMsg: "下拉刷新，发现更多",
      pullUpMsg: "加载中，请稍后...",
      bsScroll: "",
      down: true,
      display: false,
    };
  },
  mounted() {
    self = this;
    self.getData();

    // 初始化
    self.bsScroll = new BScroll(self.$refs.wrap, {
      probeType: 1,
      click: true,
    });
    // 监听滚动事件
    self.bsScroll.on("scroll", (pos) => {
      // console.log(pos.y)
      if (pos.y > 0 && pos.y <= 40) {
        self.pullDownMsg = "下拉刷新，发现更多";
      } else if (pos.y > 40) {
        self.pullDownMsg = "释放更新，发现更多";
      }
    });

    // 监听滚动结束
    self.bsScroll.on("touchEnd", (pos) => {
      if (pos.y > 40) {
        self.getData();
      } else if (pos.y < this.bsScroll.maxScrollY - 30) {
        self.pageIndex++;
        if (self.pageIndex <= self.lastPage) {
          let token = localStorage.getItem("token");
          self.$axios.defaults.headers.common["Authorization"] =
            "Bearer " + token;
          self.$axios
            .post(this.url + "/api/Payment/GetApAmtTolet", {
              resultCount: self.resultCount,
              pageIndex: self.pageIndex,
            })
            .then((res) => {
              self.datas = self.datas.concat(res.data.items);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          self.down = false;
        }
      } else {
        self.down = false;
      }
    });
  },
  methods: {
    getData() {
      let token = localStorage.getItem("token");
      this.$axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      self.$axios
        .post(self.url + "/api/Payment/GetApAmtTolet", {
          resultCount: self.resultCount,
          pageIndex: self.pageIndex,
        })
        .then((res) => {
          console.log(res);
          self.datas = res.data.items;
          self.lastPage = Math.ceil(res.data.totalCount / 30);
        })
        .catch((err) => {});
    },
    onChange(index) {
      self.show = !self.show;
      self.keyIndex = index;
    },
    handleSearch() {
      self.display = true;
    },
    search() {
      let token = localStorage.getItem("token");
      this.$axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      self.$axios
        .post(self.url + "/api/Payment/GetApAmtTolet", {
          resultCount: self.resultCount,
          pageIndex: self.pageIndex,
          filters: self.filters,
        })
        .then((res) => {
          self.datas = res.data.items;

          (self.filters = [
            {
              key: "CCONTACTNAME",
              value: "",
              contract: "like",
              name: "客户",
            },
            {
              key: "CBUSITYPE",
              value: "",
              contract: "=",
              name: "业务类型",
            },
            {
              key: "YSAMT",
              value: "",
              contract: "=",
              name: "应收总额",
            },
          ]),
            (self.display = false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped lang="scss">
.receivable {
  height: 100%;
}

.subject {
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
  overflow-y: scroll;
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
    font-weight: 600;
  }

  span {
    font-size: 3vw;
  }
}

.content .ul .name,
.content .ul .nameli {
  p {
    width: 100%;
    white-space: pre-wrap !important;
    margin: 2vw 0;
    font-size: 4vw;
    font-weight: 600;
  }

  span {
    font-size: 3vw;
  }
}

.content .detail {
  background: #ebebeb;
}

.content .detail li {
  font-size: 0.8rem;
  border-bottom: 1px solid #cccacb;
  padding: 5px 0;

  p {
    display: inline-block;
    width: 30%;
    padding-left: 8%;
    margin: 0;
  }

  p:first-child {
    text-align: left;
  }
}

.el-col.el-col-4 {
  text-align: right;
  padding-top: 3%;
}

.zong {
  font-size: 3vw;
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
</style>
<style lang="scss">
.receivable {
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
    /* top: 0; */
  }

  .van-cell__title {
    width: 100%;
  }

  .van-cell__title > div {
    height: 100%;
  }
}
</style>