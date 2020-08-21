<template>
  <div class="inquiry">
    <van-nav-bar title="订单查询" left-text="返回" @click-left="$router.push('workbench')" left-arrow>
      <!-- <van-icon name="search" slot="right" @click="$router.push('searchorder')" /> -->
      <van-icon name="search" slot="right" @click="handelSearch()" />
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
                  <p>{{item.ccontactname}}</p>
                  <span>{{item.cordno}}</span>
                  <span style="padding-left: 10%;">{{item.dorderdate}}</span>
                </div>
                <div v-if="index % 2 !== 0" class="nameli">
                  <p>{{item.ccontactname}}</p>
                  <span>{{item.cordno}}</span>
                  <span style="padding-left: 10%;">{{item.dorderdate}}</span>
                </div>
              </div>
              <ul class="detail" @click="detail(item.zR_ORD_MASTEROID)">
                <li>
                  <p>业务类型：</p>
                  <span>{{item.codeName}}</span>
                </li>
                <li>
                  <p>业务模式：</p>
                  <span>{{item.cbusimode}}</span>
                </li>
                <li>
                  <p>订单币别：</p>
                  <span>{{item.cordercurrency}}</span>
                </li>
                <li>
                  <p>订单金额：</p>
                  <span>{{item.ccustomsamount}}</span>
                </li>
                <li>
                  <p>状态：</p>
                  <span>{{item.orderCode}}</span>
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
  name: "OrderInquiry",
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
          name: "客户名称",
        },
        {
          key: "CORDNO",
          value: "",
          contract: "=",
          name: "单号",
        },

        {
          key: "DORDERDATE",
          value: "",
          contract: "like",
          name: "时间",
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
    self.getPage();
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
        self.getPage();
      } else if (pos.y < this.bsScroll.maxScrollY - 30) {
        self.pageIndex++;
        if (self.pageIndex <= self.lastPage) {
          self.$axios
            .post(this.url + "/api/Payment/GetOrderPage", {
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
    getPage() {
      self.$axios
        .post(this.url + "/api/Payment/GetOrderPage", {
          resultCount: self.resultCount,
          pageIndex: self.pageIndex,
        })
        .then((res) => {
          self.datas = res.data.items;
          self.lastPage = Math.ceil(res.data.totalCount / 30);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onChange(index) {
      self.show = !self.show;
      self.keyIndex = index;
    },
    detail(oid) {
      localStorage.setItem("id", oid);
      self.$router.push("/orderdetail");
    },
    handelSearch() {
      self.display = true;
    },
    search() {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      self.$axios
        .post(self.url + "/api/Payment/GetOrderPage", {
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
              name: "客户名称",
            },
            {
              key: "CORDNO",
              value: "",
              contract: "=",
              name: "单号",
            },

            {
              key: "DORDERDATE",
              value: "",
              contract: "like",
              name: "时间",
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
.inquiry {
  height: 100%;
  padding-bottom: 20px;
}

.subject {
  width: 100%;
  height: 100%;
  padding-top: 11%;
}

.bottom_tip {
  position: absolute;
  bottom: 45px;
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
    padding: 0.5vw 0 0 0;
    font-size: 4vw;
    font-weight: 700;
    line-height: 100%;
  }

  span {
    font-size: 3.5vw;
  }
}

.content .ul .name,
.content .ul .nameli {
  p {
    width: 100%;
    white-space: pre-wrap !important;
    padding: 0.5vw 0 0 0;
    font-size: 4vw;
    font-weight: 700;
  }

  span {
    font-size: 3.5vw;
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

.search_header {
  background: #fff;
  position: fixed;
  top: 12vw;
  border-top: 1vw solid #ffffff;
  z-index: 100;
  width: 100%;
  text-align: center;
}

.search_header .search_wrap {
  padding: 6vw 0 2.933333vw 0;
  display: inline;
  align-items: center;
  position: relative;
  /* margin-top: 4vw; */
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
.inquiry {
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

  .van-cell__title > div {
    height: 100%;
  }
}
</style>