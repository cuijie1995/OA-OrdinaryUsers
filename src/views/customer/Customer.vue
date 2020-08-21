<template>
  <div class="customer">
    <van-nav-bar title="客户信息" left-text="返回" left-arrow @click-left="$router.push('workbench')">
      <!-- <van-icon name="search" slot="right" @click="$router.push('searchcustomer')" /> -->
      <van-icon name="search" slot="right" @click="handleSearch()" />
    </van-nav-bar>

    <div class="search_header" v-if="display">
      <div class="search_wrap" v-for="(item,index) in filters " :key="index">
        <input type="text" v-model="item.value" :placeholder="item.name" />
      </div>
      <button @click.prevent="search">搜索</button>
    </div>

    <div class="cus">
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
                <ul v-if="index % 2 == 0" class="name">
                  <li style="width: 40%;text-align: left;padding-left: 10%;">{{item.cid}}</li>
                  <li style="width: 40%;text-align: left;">{{item.ccontactshortname}}</li>
                </ul>
                <ul v-if="index % 2 !== 0" class="nameli">
                  <li style="width: 40%;text-align: left;padding-left: 10%;">{{item.cid}}</li>
                  <li style="width: 40%;text-align: left;">{{item.ccontactshortname}}</li>
                </ul>
              </div>
              <ul class="detail">
                <li>
                  <p>客户名称：</p>
                  <span>{{item.ccontactname}}</span>
                </li>
                <li>
                  <p>客户地址：</p>
                  <span>{{item.caddress}}</span>
                </li>
                <!-- <li @click="information(item.zR_BAS_CONTACTOID)" style="color: #1989fa;">
                                    <p>联系人信息：</p>
                                    <span>{{item.lxp}}</span>
                                </li>
                                <li @click="record(item.zR_BAS_CONTACTOID)" style="color: #1989fa;">
                                    <p>联系记录：</p>
                                    <span>{{item.lxjl}}</span>
                                </li>
                                <li @click="visit(item.zR_BAS_CONTACTOID)" style="color: #1989fa;">
                                    <p>走访记录：</p>
                                    <span>{{item.zfjl}}</span>
                </li>-->
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
</template>
<script>
let self;
import BScroll from "better-scroll";
import { setTimeout } from "timers";

export default {
  name: "Customer",
  data() {
    return {
      activeNames: [],
      datas: [],
      searchData: [],
      show: false,
      keyIndex: "",
      resultCount: 30,
      pageIndex: 1,
      lastPage: "",
      pullDownMsg: "下拉刷新，发现更多",
      pullUpMsg: "加载中，请稍后...",
      bsScroll: "",
      down: true,
      display: false,
      filters: [
        {
          key: "CID",
          value: "",
          contract: "=",
          name: "cid"
        },
        {
          key: "CCONTACTSHORTNAME",
          value: "",
          contract: "like",
          name: "客户名称"
        }
      ]
    };
  },
  mounted() {
    self = this;
    self.getPage();

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
      } else if (pos.y < this.bsScroll.maxScrollY - 30) {
        self.pageIndex++;
        if (self.pageIndex <= self.lastPage) {
          let token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          self.$axios
            .post(self.url + "/api/Payment/Customerlist", {
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
          this.down = false;
        }
      } else {
        this.down = false;
      }
    });

    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false); //false阻止默认事件    this.fun是指返回按建实际要执行的方法
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false); //false阻止默认事件
    // sessionStorage.setItem('isSign', '1')
  },
  methods: {
    goBack() {
      this.$router.push({ path: "workbench" });
    },
    getPage() {
      self.$axios
        .post(this.url + "/api/Payment/Customerlist", {
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
    },

    onChange(index) {
      self.show = !self.show;
      self.keyIndex = index;
    },
    information(oid) {
      localStorage.setItem("vid", oid);
      localStorage.setItem("id", oid);
      this.$router.push("contactinformation");
    },
    record(oid) {
      localStorage.setItem("vid", oid);
      localStorage.setItem("id", oid);
      this.$router.push("contactrecord");
    },
    visit(oid) {
      localStorage.setItem("vid", oid);
      localStorage.setItem("id", oid);
      this.$router.push("visit");
    },
    handleSearch() {
      self.display = true;
    },
    search() {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      self.$axios
        .post(self.url + "/api/Payment/Customerlist", {
          resultCount: self.resultCount,
          pageIndex: self.pageIndex,
          filters: self.filters
        })
        .then(res => {
          self.datas = res.data.items;

          (self.filters = [
            {
              key: "CID",
              value: "",
              contract: "=",
              name: "cid"
            },
            {
              key: "CCONTACTSHORTNAME",
              value: "",
              contract: "like",
              name: "客户名称"
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
.customer {
  height: 100%;
}

.cus {
  width: 100%;
  height: 100%;
  padding-top: 10%;
}

.bottom_tip {
  position: absolute;
  bottom: -45px;
  width: 100%;
  text-align: center;
}

.search .content {
  padding-top: 80px;
}

.content {
  height: 100%;
  overflow: hidden;
  /* padding-top: 40px; */
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
}

.content .nameli {
  background: #f3eded !important;
  height: 100%;
}

.content .ul {
  .name li,
  .nameli li,
  .name .lis,
  .nameli .lis {
    float: left;
    font-size: 4vw;
    padding: 8px 0;
    text-align: center;
    line-height: 7vw;
    white-space: pre-wrap !important;
  }
}

.content .van {
  .name li,
  .nameli li,
  .name .lis,
  .nameli .lis {
    float: left;
    font-size: 4vw;
    padding: 8px 0;
    text-align: center;
    line-height: 7vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
<style lang="scss">
.customer {
  .van-cell {
    padding: 0;
  }

  .van-cell__right-icon {
    display: none;
  }

  .van-cell__title > div {
    height: 100%;
  }

  .van-nav-bar {
    position: fixed;
    width: 100%;
    background: #f7f7f7;
  }
}
</style>