<template>
  <div class="dopay">
    <van-nav-bar title="已办任务" left-text="返回" left-arrow @click-left="$router.push('workbench')">
      <van-icon name="search" slot="right" @click="handelSearch()" />
    </van-nav-bar>
    <div class="search_header" v-if="display">
      <div class="search_wrap">
        <input type="text" v-model="filters.flowTitle" placeholder="流程标题" />
        <input type="text" v-model="filters.flowStarter" placeholder="流程启动人" />

        <input
          type="text"
          placeholder="任务开始时间"
          v-model="filters.syS_Created"
          @click="showDate = true"
        />
        <van-calendar v-model="showDate" @confirm="onConfirm" />
      </div>
      <button @click.prevent="search">搜索</button>
    </div>

    <div class="do">
      <div class="content" ref="wrap">
        <div class="cont">
          <van-collapse
            v-model="activeNames"
            v-for="(item,index) in dotask"
            :key="index"
            @change="onChange(item.instanceID,item.flowkeyid,index)"
            class="van"
            :class="{ul:keyIndex=== index && show}"
          >
            <van-collapse-item :name="index">
              <div slot="title">
                <div class="name">
                  <van-row>
                    <van-col span="4" v-if="item.businessFlowID == 'FLow_11026'">
                      <i class="iconfont iconchukou" style="color: #4183d7;font-size:8vw"></i>
                    </van-col>
                    <van-col span="4" v-if="item.businessFlowID == 'FLow_11126'">
                      <i class="iconfont iconfukuan" style="color: #00cd68;font-size:8vw"></i>
                    </van-col>
                    <van-col span="4" v-if="item.businessFlowID == 'FLow_11226'">
                      <i class="iconfont iconyingfuhuizong" style="color: #7452bf;font-size:8vw"></i>
                    </van-col>
                    <van-col span="4" v-if="item.businessFlowID == 'FLow_11327'">
                      <i class="iconfont icontuikuan" style="color: #ff7d13;font-size:8vw"></i>
                    </van-col>
                    <van-col span="4" v-if="item.businessFlowID == 'FLow_11426'">
                      <i class="iconfont icondahefankuan" style="font-size:8vw"></i>
                    </van-col>
                    <van-col span="4" v-if="item.businessFlowID == 'FLow_11828'">
                      <i class="iconfont iconqitafeiyong" style="color: #b851ce;font-size:8vw"></i>
                    </van-col>
                    <van-col span="4" v-if="item.businessFlowID == 'FLow_11728'">
                      <i class="iconfont iconqitafeiyong1" style="color: #2196f3;font-size:8vw"></i>
                    </van-col>
                    <van-col span="4" v-if="item.businessFlowID == 'FLow_12128'">
                      <i
                        class="iconfont iconxiangmuzhuanxiangfeiyongfukuan"
                        style="color: #0066ff;font-size:8vw"
                      ></i>
                    </van-col>
                    <van-col span="4" v-if="item.businessFlowID == 'FLow_12529'">
                      <i class="iconfont iconchukoutuishui" style="color: #6738ff;font-size:8vw"></i>
                    </van-col>
                    <van-col span="4" v-if="item.businessFlowID == 'FLow_14037'">
                      <i class="iconfont iconchukou" style="color: #4183d7;font-size:8vw"></i>
                    </van-col>
                    <van-col span="4" v-if="item.businessFlowID == 'FLow_14038'">
                      <i class="iconfont iconchukoutuishui" style="color: #6738ff;font-size:8vw"></i>
                    </van-col>
                    <van-col span="20">
                      <van-row>
                        <van-col span="16">
                          <span>{{item.flowStarter}}</span>
                        </van-col>
                        <van-col span="8">
                          <span>{{item.syS_Created}}</span>
                        </van-col>
                      </van-row>
                      <div class="title">{{item.flowTitle}}</div>
                    </van-col>
                  </van-row>
                </div>
              </div>
              <ul class="detail" v-for="(data,index) in datas" :key="index">
                <li v-if="data.datatype == 1" style="color: #1989fa;" @click="detail(data.keyoid)">
                  <p>{{data.name}}：</p>
                  <span>{{data.data}}</span>
                </li>
                <li v-else>
                  <p>{{data.name}}：</p>
                  <span>{{data.data}}</span>
                </li>
              </ul>

              <div class="list">
                <span>附件列表：</span>
                <p v-for="(list,i) in lists" :key="'span' + i">
                  <a :href="'https://gy.szcasic.com/hterptest/' + list.fileUrl">{{list.fileName}}</a>
                </p>
              </div>
              <div class="footer">
                <van-button type="warning" @click="goProcess(item.instanceID,item.flowTitle)">流程跟踪</van-button>
              </div>
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
import axios from "axios";
import BScroll from "better-scroll";
import { setTimeout } from "timers";

export default {
  name: "DoPayment",
  data() {
    return {
      showDate: false,
      activeNames: ["1"],
      show: false,
      dotask: [],
      Oid: "",
      datas: [],
      keyIndex: "",
      filters: {
        resultCount: 30,
        pageIndex: 1,
        FlowStarter: "",
        flowTitle: "",
        syS_Created: ""
      },
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
        self.filters.pageIndex++;
        if (self.filters.pageIndex <= self.lastPage) {
          self.$axios
            .post(this.url + "/api/Payment/GetCompletedTask", {
              resultCount: this.filters.resultCount,
              pageIndex: this.filters.pageIndex
            })
            .then(res => {
              self.dotask = self.dotask.concat(res.data.items);
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
  },
  methods: {
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      self.showDate = false;
      self.filters.syS_Created = this.formatDate(date);
    },
    getPage() {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      self.$axios
        .post(self.url + "/api/Payment/GetCompletedTask", this.filters)
        .then(res => {
          self.dotask = res.data.items;
          self.lastPage = Math.ceil(res.data.totalCount / 30);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onChange(oid, kid, index) {
      localStorage.setItem("id", oid);
      self.Oid = oid;
      self.kid = kid;

      self.show = !self.show;
      self.keyIndex = index;
      self.activeNames = index;
      self.getData();
      self.getList();
    },
    getData() {
      // let token = localStorage.getItem("token");
      // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      self.$axios
        .post(self.url + "/api/Payment/ReceivablesByID?InstanceID=" + self.Oid)
        .then(res => {
          self.datas = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getList() {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      self.$axios
        .post(self.url + "/api/Payment/GetDocdatas?input=" + self.kid)
        .then(res => {
          self.lists = res.data.items;
        });
    },
    handelSearch() {
      self.display = true;
    },
    search() {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      self.$axios
        .post(self.url + "/api/Payment/GetCompletedTask", this.filters)
        .then(res => {
          self.dotask = res.data.items;

          self.display = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 通过超链接，根据id跳转到详情页面
    detail(oid) {
      localStorage.setItem("id", oid);
      self.$router.push("/dopay");
    },
    // @click="$router.push('doprocess')"
    // 通过id跳转到流程页面
    goProcess(oid, name) {
      localStorage.setItem("id", oid);
      localStorage.setItem("title", name);
      self.$router.push("doprocess");
    }
  }
};
</script>
<style scoped lang="scss">
.dopay {
  height: 100%;
}

.do {
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
  padding: 3% 5%;
}

.content .van .name .title {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 3vw;
  width: 80%;
}

.content .ul .name .title {
  width: 100%;
  white-space: pre-wrap !important;
  font-size: 3vw;
  width: 80%;
}

.content .detail {
  background: #ebebeb;
}

.content .detail li {
  font-size: 0.8rem;
  border-bottom: 0.1vw solid #cccacb;
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

.footer {
  text-align: center;
  padding-top: 3vw;
}

.footer .van-button {
  height: 6.3vw;
  line-height: 6.3vw;
  font-size: 4vw;
}

.list {
  padding: 2vw 0;
  background: rgb(204, 232, 207);
  margin-bottom: 2vw;
}

.list p {
  margin: 0;
  margin-left: 28%;
  font-size: 2vw;
}

.list span {
  font-size: 0.8rem;
  padding: 10px 0;
  margin-right: 2%;
  margin-left: 8%;
}

.van-col.van-col--16 span {
  font-size: 4vw;
  font-weight: 700;
}

.van-col.van-col--8 {
  text-align: right;
  padding-right: 1%;
}

.van-col.van-col--8 span {
  font-size: 1vw;
}

.van-col.van-col--4 {
  margin-top: 3%;
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
.dopay {
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